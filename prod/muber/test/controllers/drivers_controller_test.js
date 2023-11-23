const assert = require('assert')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')
const Driver = mongoose.model('driver');

describe('Dirvers controller', () => {
    it('Post to /api/drivers creates a new driver', async () => {
        const count  = await Driver.countDocuments()
        await request(app)
            .post('/api/drivers')
            .send({ email: 'test@mail.com' });
        const newCount  = await Driver.countDocuments()
        assert(count + 1 === newCount)
    })
})