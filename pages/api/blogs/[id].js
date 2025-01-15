import Blog from "../models/Blog";
import connectDB from "../utils/db";

export default async function handler(req, res) {
    console.log('here-----1')
  await connectDB();
  const { method } = req;
  const { id } = req.query;  // Use req.query to get the dynamic parameter

  console.log('method---', method, id);
  if (method === 'GET') {
    try {
      const blog = await Blog.findById(id).populate('createdBy', 'name email');
      res.status(200).json({ statusCode: 200, data: blog });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
