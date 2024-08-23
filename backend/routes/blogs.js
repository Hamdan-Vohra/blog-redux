const express = require('express');
const blogControllers = require('./controllers/blogs')

const router = express.Router();

//adding routes to handle CRUD operations
router.get('/',blogControllers.getAllBlogPosts);
router.get('/',blogControllers.createBlogPost);
router.get('/:blogId',blogControllers.getIndividualBlog);
router.get('/:blogId',blogControllers.updateBlogPost);
router.get('/:blogId',blogControllers.deleteBlogPost);

module.exports = router