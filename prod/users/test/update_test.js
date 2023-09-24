const assert = require('assert')
const { User } = require('../src/user')

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'joe', postcount: 0 })
        joe.save()
            .then(() => done())
    })

    const assertName = (operation, done) => {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1)
                assert(users[0].name === 'Tom')
                done()
            })
    }

    it('Instance type using set n save', (done) => {
        joe.set('name', 'Tom')
        assertName(joe.save(), done)
    })

    it('A model class can updateOne', (done) => {
        assertName(User.updateOne({ _id: joe._id }, { name: 'Tom' }), done)
    })

    it('A model class can findOneAndUpdate', (done) => {
        assertName(User.findOneAndUpdate({ name: 'joe' }, { name: 'Tom' }), done)
    })

    it('A model class can findByIdAndUpdate', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, { name: 'Tom' }), done)
    })

    it('A model class can updateMany', (done) => {
        assertName(User.updateMany({ name: 'joe' }, { name: 'Tom' }), done)
    })
})