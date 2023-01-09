const { query } = require('express');
const { body } = require('express-validator');
const db = require('../models'); //prueba exitosa pero con difine
const regiones_sares = require('../models/regiones_sares');
module.exports = {

async createSare(req, res) {

    const {idSare, nameSare, nameJefeSare, telefono, email, longitud, latitud, localidadId, region} = req.body;
 
    try {

        const sare = await db.sare.create({
        idSare,
        nameSare,
        nameJefeSare,
        telefono,
        email,
        longitud,
        latitud,
        localidadId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
        );
    //{include: ['regions']});
    //funciona
    //console.log()
    const reg = await JSON.parse(region);
    console.log("=========================="+typeof(reg)+" "+reg );
    const ot = await sare.addRegion(reg, { through: { selfGranted: false }});
    //succesfull 
    //const result = await sare.addRegiones(region, { through: { selfGranted: false }});
    //const ot = await sare.addRegion(region, { through: { selfGranted: false }});
    //const resul = await sare.addRegions([region]);
    //const s = await sare.getRegions({ joinTableAttributes: [] });

    
    return res.status(200).json({sare: sare});
    } catch (error) {
        console.log(error);
        return res.status(500).json("error del servidor"+error); 
    }
   
},

async allSare (req,res) {
    try {
       
         const sares = await db.sare.findAll({
            
            //include: [{all:true}]
            include: ['regions','localidad',{
                association: db.sare.associations.localidad,
                include: [ 'municipio',
            {
                association: db.localidad.associations.municipio,
                include: ['region'] 
            } ]}]
         }
         );
         //const await getRegion({ joinTableAttributes: ['selfGranted'] });


         return res.status(200).json({sares :sares});
        //return res.status(202).json(sares); 
      } catch (error) {
          console.log(error);
           return res.status(500).json({error: "error del servidor"});
      }
   
},

async allSareId (req, res){
    const {id} = req.params;
    try {
      const sare = await db.sare.findByPk(id); 
      
      if(!sare){
        return res.status(404).json( "La Region No Existe");
      } else return res.status(200).json({sare: sare});
    } catch (error) {
         console.log(error);
        return res.status(500).json( "error del servidor"); 
    }
},
async getRegionSareId(req, res){
    const {id} = req.params;
    
    try {
        const sares = await db.sare.findOne({
            where: {
                id: id
            },
           //include: [{all:true}]
           include: ['regions']
        }
        );
        return res.status(200).json({sares :sares});
       //return res.status(202).json(sares); 
     } catch (error) {
         console.log(error);
          return res.status(500).json({error: "error del servidor"});
     }
},

//Actualizar regiones atendidas
async addRegionSare(req, res){
    const {id} = req.params;
    const {region} = req.body;
    try {
        const sares = await db.sare.findOne({
            where: {
                id: id
            },
           //include: [{all:true}]
           include: ['regions']

           
        }
        );
        
    const [results, metadata] = await db.sequelize.query('delete from regiones_sares where "sareId"='+id);
    
    const reg = await JSON.parse(region);
    const addR = await sares.addRegion(reg, { through: { selfGranted: false }});
 
       const sareActualizada = await db.sare.findOne({
            where: {
                id: id
            },
           //include: [{all:true}]
           include: ['regions']
        });
            return res.status(200).json({regiones : sareActualizada });
        
        
     } catch (error) {
         console.log(error);
          return res.status(500).json({error: "error del servidor"});
     }
},


async updateSare (req, res){
    
    const {id} = req.params;
    //const {idSare,nameSare,nameJefeSare,telefono,email,longitud,latitud,localidadId} = req.body;
    const objsere = {...req.body};
    delete objsere.region;
    try {
        
        const sare = await db.sare.findByPk(id);

        if(!sare){
        return res.status(404).json( "La Sare No Existe");
      } else 

        sare.set(objsere);
        await sare.save();
        const [results, metadata] = await db.sequelize.query('delete from regiones_sares where "sareId"='+id);
        const reg = await JSON.parse(req.body.region);
        const addR = await sare.addRegion(reg, { through: { selfGranted: false }});
 
        console.log("Eliminar.................."+req.body.region+"=================="+objsere.region);
        return res.status(200).json(sare);

    } catch (error) {
         console.log(error);
        return res.status(500).json( "error del servidor");
    }

},

async deleteSare (req, res){

    const {id} = req.params;

    try {
        const sares = await db.sare.findByPk(id);
         if (!sares){
            return res.status(404).json( "No Existe La Region");
         } else{
            await db.sare.destroy({
            where:{id}
        });
        return res.status(200).json( "La Region Ha Sido Eliminada ");
         }
    

    } catch (error) {
          console.log(error);
            return res.status(500).json( "error del servidor"); 
    }
},



}