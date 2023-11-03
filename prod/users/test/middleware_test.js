const mongoose = require('mongoose');
const assert = require('assert')
const { User } = require("../src/user");
const BlogPost = require('../src/blogPost');

describe('Middlewares', () => {
    beforeEach((done) => {
        joe = new User({ name: 'joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

        jeo.blogPost.push(BlogPost)

        Promise.all([jeo.save(),BlogPost.save()])
            .then(()=> done())
    })
})