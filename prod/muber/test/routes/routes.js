const driversControllers = require("../../controllers/drivers_controller")

module.exports = (app) => {
    app.get('/api', driversControllers.greeting)
}