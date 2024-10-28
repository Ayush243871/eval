const express=require('express')
const appointmentController = require('../Controller/appointmentController');
const authMiddleware=require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const router=express.Router()

router.put('/appointments/:id/approve',authMiddleware,checkRole('admin'),appointmentController.approveAppointment)
router.get('/appointments/search',authMiddleware)
router.put('/appointments/:id/reschedule',authMiddleware,checkRole('user'),appointmentController.rescheduleAppointment)
module.exports=router;