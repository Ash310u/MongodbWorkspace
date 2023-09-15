const assert = require('assert')
const User = require('../src/user')

describe('Creating records', () => {
    it('saves a user', () => {
        const jeo = new User ({ name:'Joe' })
    })
})