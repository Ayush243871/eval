const Appointment=require('../models/appointment');
const Doctor=require('../models/doctor')
const Patient =require('../models/patient')

const bookAppointment = async(req,res)=>{
    const{patientName,doctorName,appointmentTime,reason}=req.body;
    try{
        const doctor=await Doctor.findOne({name:doctorName})
        const patient=await Patient.findOne({name:patientName})

        if(!doctor || !patient){
            return res.status(404).json({message:'Doctor or patient not found'});
        }

        const newAppointment=new Appointment({
            patientName,
            doctorName,
            appointmentTime,
            reason,
        })
        await newAppointment.save();
        res.status(201).json(newAppointment);
    }catch(error){
        res.status(500).json({message:'Server error'});
    }
}

exports.approveAppointment=async(req,res)=>{
    const {id}=req.params
    const {status}=req.body
    const appointment=await Appointment.findById(id);
    if(!appointment) return res.status(404).json({message:'Appointment not found'});

    appointment.status=status
    await appointment.save()
    res.json(appointment)

}

exports.searchAppointments=async(Req,res)=>{
    const {from,to,specialization,status}=req.query;
    const filter={};
    if (from && to) filter.date={$gte:new Date(from),$lte:new Date(to)};
    if (specialization) filter.specialization=specialization
    if(status) filter.status=status

    const appointments=await Appointment.find(filter);
    res.json(appointments);
}
exports.rescheduleAppointment=async(req,res)=>{
    const {id}=req.params
    const {newDate}=req.body
    const appointment = await Appointment.findById(id)
    const doctorAppointments = await Appointment.find({
        doctor: appointment.doctor,
        date: newDate,
        status:'approved'
    })

    if(doctorAppointments.length>0){
        
        return res.status(400).json({message:'Doctor already has an appointment at this time'})
    }
    appointment.date=newDate
    await appointment.save()
    res.json(appointment)
}

module.exports={bookAppointment}