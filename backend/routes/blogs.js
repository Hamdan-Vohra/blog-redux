const express = require('express');
const blogControllers = require('../controllers/blogs')

const router = express.Router();

//adding routes to handle CRUD operations
router.get('/',blogControllers.getAllBlogPosts);
router.post('/',blogControllers.createBlogPost);
router.get('/:blogId',blogControllers.getIndividualBlog);
router.patch('/:blogId',blogControllers.updateBlogPost);
router.delete('/:blogId',blogControllers.deleteBlogPost);

module.exports = router