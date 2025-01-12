const express = require('express');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;  // Extract category from the query string
    
    // If category is provided, filter blogs by category
    let query = {};
    if (category) {
      query.category = category;
    }
    console.log(query)
    // Fetch blogs from the database based on the query
    const blogs = await Blog.find(query);

    // if (blogs.length === 0) {
    //   return res.status(404).json({ statusCode: 404, message: 'No blogs found for this category' });
    // }

    // Return the found blogs
    res.json({ statusCode: 200, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract category from the URL

    // Find blogs based on the category
    const blog = await Blog.findOne({ _id: id })
      .populate('createdBy', 'name email');

    // Return blogs found in the requested category
    res.json({ statusCode: 200, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
});



router.post('/', authMiddleware, async (req, res) => {
  const { title, description, category, imageUrl } = req.body;
  try {
    const blog = new Blog({ title, description, category, imageUrl, createdBy: req.user.userId });
    await blog.save();
    res.status(201).json({ statusCode: 201, data: blog });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
});

module.exports = router;
