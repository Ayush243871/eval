  
3. API DOCUMENTATION
   /**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Retrieve a list of all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Successfully fetched appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Server error
 */
app.get('/appointments', appointmentController.getAppointments);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */  
 app.post('/appointments', appointmentController.createAppointment);


4. Schemas in Swagger
     /**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - patientId
 *         - doctorId
 *         - date
 *         - time
 *       properties:
 *         patientId:
 *           type: string
 *           description: The ID of the patient
 *         doctorId:
 *           type: string
 *           description: The ID of the doctor
 *         date:
 *           type: string
 *           format: date
 *           description: Appointment date
 *         time:
 *           type: string
 *           format: time
 *           description: Appointment time
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           description: Status of the appointment
 *       example:
 *         patientId: 61f717bc8a6f3e6bd8284b9a
 *         doctorId: 60f66bc6ec3f4867e7d5e8a0
 *         date: 2024-10-28
 *         time: 14:30
 *         status: pending
 */

    
