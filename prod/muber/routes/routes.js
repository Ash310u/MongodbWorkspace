const driversControllers = require("../controllers/drivers_controller")

module.exports = (app) => {
    app.get('/api', driversControllers.greeting);
    app.post('/api/drivers', driversControllers.create);
    app.put('/api/drivers/:_id', driversControllers.edit);
    app.delete('/api/drivers/:_id', driversControllers.assDelete);
}