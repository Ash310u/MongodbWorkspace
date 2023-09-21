const assert = require('assert')
const { User } = require('../src/user')

describe('Subdocument', () => {
    it('It can create a subdocument', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{ title: '1st post' }] 
        })
        joe.save()
            .then(() => User.findOne({ _id:joe._id }))
            .then((user) => {
                const { title } = user.posts[0]
                assert(title === '1st post')
                done()
            })
    })
})