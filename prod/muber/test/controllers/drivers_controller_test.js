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
        assert(updatedDriver.driving === true)
    });

    it('delete to /api/drivers/id assdelete an existing driver', async () => {
        const driver = new Driver({ email: 'your@mom.com', driving: false })
        await driver.save()
        await request(app)
            .delete(`/api/drivers/${driver._id}`)
            .send()
        const updatedDriver = await Driver.findOne({ email: 'your@mom.com' })
        assert(updatedDriver === null)
    });

    it('get to /api/drivers/ finds drivers in a location', async () => {

        const driver1 = new Driver({
            email: 'your@mom.com',
            geometry: { type: 'Point', coordinates: [20, 80] }
        })
        const driver2 = new Driver({
            email: 'your@crush.com',
            geometry: { type: 'Point', coordinates: [24, 87] }
        })
        await driver1.save()
        await driver2.save()
        const response = await request(app)
            .get(`/api/drivers?lng=20&lat=79`)
            .send()
        assert(response.body.length === 1)
        assert(response.body[0].email === 'your@mom.com')
    });
})