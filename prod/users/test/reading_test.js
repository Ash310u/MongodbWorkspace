const assert = require('assert')
const { User } = require('../src/user')

describe(`Reading users out of the database`, (done) => {
    let joe, rick, ash, maria; 

    beforeEach((done) => {
        joe = new User({ name: 'joe' })
        rick = new User({ name: 'rick' })
        ash = new User({ name: 'ash' })
        maria = new User({ name: 'maria' })

        Promise.all([joe.save(), rick.save(), ash.save(), maria.save()])
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
        User.find({}).skip(1).limit(2)
            .then((users) => {
                console.log('======================================')
                console.log(users)
                assert(users.length === 2)
                assert(users[0].name === 'rick')
                assert(users[1].name === 'ash')
                done()
            })
    })
})