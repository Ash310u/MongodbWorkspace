const mongoose = require("mongoose");
const PostSchema = require("./postSchema");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        validate: {
            validator: (value) => value.length > 2,
            message: 'Name must be longer than 2 characters.'
        }
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

                                // Using the 'function' keyword to refer to the 'this' keyword as a 'User instance'
UserSchema.virtual('postcount').get(function () {
    return this.posts.length
});

UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost')

    BlogPost.remove({ _id:{ $in: this.blogPosts } })
    next()
})

const User = mongoose.model('user', UserSchema);

module.exports = {
    User
};