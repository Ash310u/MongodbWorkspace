const mongoose = require("mongoose");
const { User } = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
        comment = new Comment({ content: 'Congrats on a great post' })

        //  AKA Mongoose magic : Mongoose is going to recognize that we just push in an entire model and it's going to automatically say 'OK' they're probably trying to set up an association here, So i'm not going to mess with the entire model itself. I'm just going to set up the 'ObjectId' type to refer to this other blogPost.
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });
});