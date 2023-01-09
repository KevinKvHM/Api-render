const express = require('express');
const router = express.Router();
//middleware
const regionValidator = require("../middleware/validatorManager");
const auth = require('../middleware/auth');
//controller
const sareController = require('../controllers/sare_controller.js');

const validate = require('../middleware/validateUser');


router.post('/api/v1/addRegion/:id',auth.validateToken,sareController.addRegionSare);

router.get('/api/v1/getRegionSare/:id',sareController.getRegionSareId);
router.post('/api/v1/sare',sareController.createSare);
router.get('/api/v1/sares',sareController.allSare);
router.get('/api/v1/sare/:id',auth.validateToken,sareController.allSareId);
router.put('/api/v1/sare/:id',auth.validateToken,validate.isAdmin,regionValidator.bodySareValidator, sareController.updateSare);
router.delete('/api/v1/sare/:id',auth.validateToken,validate.isAdmin,sareController.deleteSare);


module.exports = router;