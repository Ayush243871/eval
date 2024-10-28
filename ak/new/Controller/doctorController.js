const Doctor=require('../models/doctor');
const { options } = require('../routes/doctorRoutes');

const getAllDoctors=async(req,res)=>{
    try{
        const doctors=await Doctor.find({});
        res.json(doctors);
    }catch(error){
        res.status(500).json({message:'Server error'})
    }
}

exports.searchDoctors=async (req,res)=>{
    const{name,specialization,available}=req.query;
    const filter={}
    if(name)filter.name={$regex:name,$options:'i'}
    if(specialization)filter.specialization=specialization
    if(available)filter.available=available

    const doctors=await Doctor.find(filter)
    res.json(doctors)
}


module.exports={getAllDoctors}