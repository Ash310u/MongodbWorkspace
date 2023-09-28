const mongoose = require("mongoose");
const assert = require('assert')
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

    it('Saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name:'joe' })
            .populate('blogPosts')
            .then((user) => {
                assert( user.blogPosts[0].title === 'JS is Great')
                done()
            })
    });

    it ('Saves a full relation graph', (done) => {
        User.findOne({ name:'joe' })
            .populate({
                // This path key says in the user find the 'blogPosts' property and load up all the associated blogPosts.
                path:'blogPosts',
                // Inside of all those 'blogPosts' that you just fetched find the 'comments' property and attempt load up all the associated comments.
                populate: {
                    path:'comments',
                    // Mongoose requires us to tell it which model we want to be using.
                    model:'comment',
                    populate: {
                        path:'user',
                        model:'user'
                    }
                }
            })
            .then((user) => {
                console.log(user.blogPosts[0].comments[0]);
                assert(user.blogPosts[0].comments[0].content === 'Congrats on a great post')
                done()
            })
    })
}); 