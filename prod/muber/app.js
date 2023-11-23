const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1/muber')

app.use(express.json())
routes(app)

module.exports = app