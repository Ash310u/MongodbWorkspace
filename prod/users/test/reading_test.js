const assert = require('assert')
const { User } = require('../src/user')

describe(`Reading users out of the database`, (done) => {
    let ash, joe, maria, rick; 

    beforeEach((done) => {
        ash = new User({ name: 'ash' })
        joe = new User({ name: 'joe' })
        maria = new User({ name: 'maria' })
        rick = new User({ name: 'rick' })

        Promise.all([ash.save(), joe.save(), maria.save(), rick.save()])
            .then(() => done());
    });
    
    it(`Find all users with a name of joe `, (done) => {
        User.find({ name:'joe' })
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            })
    })
    it(`Find a user by _id`, (done) => {
        User.findOne({ _id:joe._id })
            .then((user) => {
                assert(user.name === 'joe');
                done();
            })
    })
    it('can skip and limit the result set', (done) => {
        User.find({})
        .sort({name: 1})
        .skip(1)
        .limit(2)
            .then((users) => {
                assert(users.length === 2)
                assert(users[0].name === 'joe')
                assert(users[1].name === 'maria')
                done()
            })
    })
})