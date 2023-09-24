const assert = require('assert')
const { User } = require('../src/user');

describe('virtual type test', () => {
    it('postCount return number of posts', (done) => {
        const joe = new User({
            name:'joe',
            posts: [{ title:'postCount check' }]
        })
        joe.save()
            .then(() => User.findOne({ name:'joe' }))
            .then((user) => {
                assert(user.postcount === 1)
                done()
            })
    })
})