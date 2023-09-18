const assert = require('assert')
const { User }= require('../src/user')

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name:'joe'})
        joe.save()
            .then(() => done())
    })

    it('Instance type using set n save', (done) => {
        joe.set('name', 'Tom')
        joe.save()
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1)
                assert(users[0].name === 'Tom')
                done()
            })
    })
})