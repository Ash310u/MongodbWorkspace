const mongoose = require('mongoose')

before(done => {
    mongoose.connect('mongodb://127.0.0.1/muber_test')
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err)
        })
})


beforeEach(done => {
    let { drivers } = mongoose.connection.collections;  
    drivers.drop()
        .then(() => drivers.createIndex({ 'geometry.coordinates': '2dsphere'}))
        .then(() => done())
        .catch(() => done());
})