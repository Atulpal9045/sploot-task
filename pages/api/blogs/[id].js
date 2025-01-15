import Blog from "../models/Blog";
import User from "../models/User";
import connectDB from "../utils/db";

export default async function handler(req, res) {
  console.log('here-----1');
  await connectDB();
  const { method } = req;
  const { id } = req.query;  // Use req.query to get the dynamic parameter

  console.log('method---', method, id);
  if (method === 'GET') {
    try {
      const blog = await Blog.findById(id)
        .populate('createdBy', 'name email') // Populate directly here
        .exec();

      // Check if the blog and its creator exist
      if (!blog) {
        return res.status(404).json({ statusCode: 404, message: 'Blog not found' });
      }

      // If createdBy is missing, you can set the fields to null
      if (!blog.createdBy) {
        blog.createdBy = { name: null, email: null };
      }

      res.status(200).json({ statusCode: 200, data: blog });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
