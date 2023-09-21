const assert = require('assert')
const { User } = require('../src/user')

describe('Subdocument', () => {
    it('It can create a subdocument', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{ title: '1st post' }]
        })
        joe.save()
            .then(() => User.findOne({ _id: joe._id }))
            .then((user) => {
                const { title } = user.posts[0]
                assert(title === '1st post')
                done()
            })
    });

    it('Can add a subdocument to an existing record', (done) => {
        // created joe
        const joe = new User({
            name: 'joe',
            posts: []
        })
        // saved joe
        joe.save()      // fetched joe
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                // Added a post to joe
                user.posts.push({ title: '1st post' })
                // saved joe
                return user.save();
            })          // fetched the updated joe
            .then(() => User.findOne({ name:'joe' }))
            .then((user) => {
                assert(user.posts[0].title === '1st post')
                done()
            })
    })
})