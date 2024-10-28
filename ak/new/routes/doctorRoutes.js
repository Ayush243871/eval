const express = require('express')
const doctorController = require('../Controller/doctorController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole=require('../middleware/roleMiddleware')

const router =express.Router();

router.post('/doctors',authMiddleware,checkRole('admin'),doctorController.addDoctor);
router.put('/doctors/:id',authMiddleware,checkRole('admin'),doctorController.updateDoctor);
router.delete('/doctors/:id',authMiddleware,checkRole('admin'),doctorController.removeDoctor)
router.get('/doctors/search',doctorController.searchDoctors)

module.exports=router;