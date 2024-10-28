const express=require('express')
const {getAllPatients}=require('../../ayush_kumar_ft33_117/unit-6/sprint-2/evaluation/Controller/patientController')
const router=express.Router()

router.get('/',getAllPatients)

module.exports=router;