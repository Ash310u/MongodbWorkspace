const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required:[true, 'Name is required.'],
        validate:{
            validator: (value) => value.length > 2,
            message:'Name must be longer than 2 characters.'
        }
    },
    postcount: {
        type: Number
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = {
    User
};