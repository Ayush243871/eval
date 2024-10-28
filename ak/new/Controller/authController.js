const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db/mysqlConnection')

const register= async(req,res)=>{
    const{username,password}=req.body;
    const hashedPassword = await bcrypt.hash(password,10)

    db.query('INSERT INTO users (username,password) VALUES (?,?)',[username,hashedPassword],(err,result)=>{
        if(err) return res.status(500).json({message:'DATABASE error'})
        res.status(201).json({message:'User Registered'});
    })
}

const login = async(req,res)=>{
    const{username,password}=req.body;
    db.query('SELECT * FROM users WHERE username = ?',[username],async(err,users)=>{
        if(err || users.length===0) return res.satus(404).json({message:'User not found'})

        const user=users[0]
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if (!isPasswordValid) return res.status(401).json({message:'Invalid cred'})

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.json({token})
    })
}

module.exports={register,login};