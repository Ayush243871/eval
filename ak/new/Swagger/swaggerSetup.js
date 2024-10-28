
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare Appointment Booking System API',
      version: '1.0.0',
      description: 'API Documentation for Healthcare Appointment Booking System',
      contact: {
        name: 'Ayush',
        email: 'your-email@example.com',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = { swaggerDocs };
