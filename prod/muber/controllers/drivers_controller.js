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

module.exports = {
    greeting,
    create
}