const assert = require('assert')
const User = require('../src/user')

describe(`Reading users out of the database`, (done) => {
    let joe; 

    beforeEach((done) => {
        joe = new User({ name: 'joe' })
        joe.save()
            .then(() => done());
    })
})