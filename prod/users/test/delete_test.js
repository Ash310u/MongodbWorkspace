const assert = require("assert");
const { User } = require("../src/user");

describe("Deleting a user", () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: "joe" });
        joe.save().then(() => {
            done();
        });
    });
    
    it("Class method deleteOne", (done) => {
        User.deleteOne(joe._id)
            .then(() => User.findOne({  _id: joe._id }))
            .then((user) => {
                assert(user === null)
                done()
            })
    });

    it("Class method deleteMany", (done) => {
        User.deleteMany({ name: 'joe' })
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user === null)
                done()
            })
    });

    it("Class method findOneAndDelete", (done) => {
        User.findOneAndDelete({ name:'joe' })
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user === null)
                done()
            })
    });

    it("Class method findByIdAndDelete", (done) => {
        User.findByIdAndDelete(joe._id)
            .then(() => User.findOne({ _id: joe._id }))
            .then((user) => {
                assert(user === null)
                done()
            })
    });

});
