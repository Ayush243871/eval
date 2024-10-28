const express = require ('express')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
dotenv.config();

const connectMongoDB=require('./db/mongoConnection');
const logger=require('./middleware/logger')

const doctorRoutes = require('../ayush_kumar_ft33_117/unit-6/sprint-2/evaluation/routes/doctorRoutes')
const patientRoutes = require('../ayush_kumar_ft33_117/unit-6/sprint-2/evaluation/routes/patientRoutes')
const appointmentRoutes = require('../ayush_kumar_ft33_117/unit-6/sprint-2/evaluation/routes/appointmentRoutes')
const authControl = require('../ayush_kumar_ft33_117/unit-6/sprint-2/evaluation/routes/authRoutes')

const swaggerUi=require('swagger-ui-express')
const swaggerDocs=require('./Swagger/swaggerSetup')

const app=express();

app.use(express.json())
app.use('./api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
app.use(logger);

connectMongoDB();

app.use('/doctors',doctorRoutes)
app.use('/patients',patientRoutes)
app.use('/appointments',appointmentRoutes)
app.use('/auth',authControl)
app.listen(5000,()=>{
    console.log('server is running on http"//localhost:5000')
})