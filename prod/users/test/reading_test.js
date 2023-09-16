const assert = require('assert')
const { User } = require('../src/user')

describe(`Reading users out of the database`, (done) => {
    let joe; 

    beforeEach((done) => {
        joe = new User({ name: 'joe' })
        joe.save()
            .then(() => done());
    });
    
    it(`Find all users with a name of joe `, (done) => {
        User.find({ name:'joe' })
            .then((users) => {
                console.log(users);
                done();
            })
    })
})