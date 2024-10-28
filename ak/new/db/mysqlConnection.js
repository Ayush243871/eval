const mysql=require('mysql2')
require('dotenv').config()

const db=mysql.createConnection({
    host:process.env.SQL_HOST,
    user:process.env.SQL_USER,
    password:process.env.SQL_PASSWORD,
    database:process.env.SQL_DB,

})

db.connect((err)=>{
    if(err){
        console.error('My SQL connection error:',err.stack)
        return
    }
    console.log('MySQL connected');
})

module.exports=db;