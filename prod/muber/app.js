const express = require('express');
const routes = require('./test/routes/routes');
const app = express();

routes(app)

module.exports = app