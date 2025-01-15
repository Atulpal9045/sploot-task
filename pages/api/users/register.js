import bcrypt from 'bcrypt';
import connectDB from '../utils/db';
import User from '../models/User';

export default async function handler(req, res) {
   await connectDB();
  const { method } = req;

  if (method === 'POST') {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ statusCode: 400, message: 'Username, email, and password are required' });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ statusCode: 409, message: 'User already exists!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name: username, email, password: hashedPassword });

      res.status(200).json({ statusCode: 200, data: { user: { name: newUser.name, email: newUser.email } } });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
