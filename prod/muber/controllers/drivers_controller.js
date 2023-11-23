const Driver = require("../models/driver")

const greeting = async (req, res) => {
    res.send({ hi: 'there' })
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
        res.status(200).send()
    } catch (error) {
        res.status(422).send(error)
    }
}

module.exports = {
    greeting,
    create,
    edit,
    assDelete
}