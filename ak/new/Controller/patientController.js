const Patient=require('../models/patient')

const getAllPatients=async(req,res)=>{
    try{
        const patients=await Patient.find({});
        res.json(patients);
    }catch(error){
        res.status(500).json({message:'Server error'})
    }
}

module.exports={getAllPatients}
