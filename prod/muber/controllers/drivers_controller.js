const Driver = require("../models/driver")

const greeting = async (req, res) => {
    res.send({ hi: 'there' })
}

const index = async (req, res) => {
    const { lng, lat } = req.query;
    try {
        const drivers = await Driver.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: 200000
                }
            }
        ])
        console.log(drivers)
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {
    try {
        const driver = new Driver(req.body)
        await driver.save()
        res.status(200).send(driver)
    } catch (error) {
        res.status(422).send(error)
    }
}
const edit = async (req, res) => {
    try {
        const driverId = req.params._id
        const updateDriver = await Driver.findByIdAndUpdate({ _id: driverId }, req.body)
        updateDriver.save()
        res.status(200).send(updateDriver)
    } catch (error) {
        res.status(422).send(error)
    }
}
const assDelete = async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params._id)
        res.status(204).send()
    } catch (error) {
        res.status(422).send(error)
    }
}

module.exports = {
    greeting,
    create,
    edit,
    assDelete,
    index
}