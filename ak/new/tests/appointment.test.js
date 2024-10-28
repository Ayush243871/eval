const request = require('supertest')
const app = require('../server')
const { describe } = require('node:test')


describe('Appointment Approval',()=>{
    it('should allow admin to approve appointment',async ()=>{
        const response =await request(app)
        .put('/appointments/123/approve')
        .send({status:'approved'})
        .set('Authorization',`Bearer ${adminToken}`);

        expect(response.status).toBe(200)
        expect(response.body.status).toBe('approved')
    })
})