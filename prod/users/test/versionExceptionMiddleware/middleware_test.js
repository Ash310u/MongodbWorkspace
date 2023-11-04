const mongoose = require('mongoose');
const assert = require('assert')
const { User } = require("../../src/user");
const BlogPost = require('../../src/blogPost');

describe('Middlewares', () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'joe' }); 
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('Users clean up dangling blogposts on delete', (done) => {
        
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) =>{
                console.log(count)
                assert(count === 0)
                done()
            })
            .catch(err => console.log(err))
    }) 
})