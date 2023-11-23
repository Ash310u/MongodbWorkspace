const assert = require('assert')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')
const Driver = mongoose.model('driver');

describe('Dirvers controller', () => {
    it('Post to /api/drivers creates a new driver', async () => {
        const count = await Driver.countDocuments()
        await request(app)
            .post('/api/drivers')
            .send({ email: 'test@mail.com' });
        const newCount = await Driver.countDocuments()
        assert(count + 1 === newCount)
    });

    it('Put to /api/drivers/id edits an existing driver', async () => {
        const driver = new Driver({ email: 'your@mom.com', driving: false })
        await driver.save()
        await request(app)
            .put(`/api/drivers/${driver._id}`)
            .send({ driving: true })
        const updatedDriver = await Driver.findOne({ email: 'your@mom.com' })
        assert(updateDriver.driving === true)
    });
})