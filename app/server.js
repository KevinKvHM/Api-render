const express = require('express');
const app = express();
const conect = require('./models/index'); 
const { validationResult } = require('express-validator');
const cors = require('cors');
const PORT = parseInt(process.env.PORT) || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require('./routers/User_routes'));
app.use(require('./routers/Role_routes'));
app.use(require('./routers/Employee_routes'));
app.use(require('./routers/School_routes'));
app.use(require('./routers/Regiones_routes'));
app.use(require('./routers/Municipio_routes'));
app.use(require('./routers/Localidad_routes'));
app.use(require('./routers/Director_routes'))
app.use(require('./routers/Supervisor_routes'));
app.use(require('./routers/Sare_routes'));
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.listen(PORT, function(){
     try {
     console.log('servidor corriendo en el puerto: ' +PORT);    
     conect.sequelize.sync({ alter:true}).then(() => {
     console.log("Se ha establecido la conexión");
    })
    } catch (error) {
     console.log('Se ha producido un error', error)
    }
})





/*var whitelist = ['http://localhost:5000', 'http://192.168.1.194:5000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}*/
