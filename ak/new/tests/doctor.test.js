const request = require('supertest')
const app = require('../server')
const { describe } = require('node:test')

describe('Doctor Search',()=>{
    it('should returna list of doctors matching search critieria',async ()=>{
        const response=await request(app)
        .get('/doctors/search')
        .query({name:'John',specialty:'Cardiology'})

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })
})