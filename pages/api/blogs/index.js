import { authMiddleware } from "../middleware/authMiddleware";
import Blog from "../models/Blog";
import connectDB from "../utils/db";

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  if (method === 'GET') {
    const { category } = req.query;

    try {
      const query = category ? { category } : {};
      const blogs = await Blog.find(query);
      res.status(200).json({ statusCode: 200, data: blogs });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
    }
  } else if (method === 'POST') {
    await authMiddleware(req, res);
    const { title, description, category, imageUrl } = req.body;

    try {
      const newBlog = await Blog.create({
        title,
        description,
        category,
        imageUrl,
        createdBy: req.user.userId,
      });

      res.status(201).json({ statusCode: 201, data: newBlog });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
