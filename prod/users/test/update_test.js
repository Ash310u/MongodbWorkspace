const assert = require('assert')
const { User }= require('../src/user')

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name:'joe'})
        joe.save()
            .then(() => done())
    })
})