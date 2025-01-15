import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connectDB from '../utils/db';
import User from '../models/User';



export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  if (method === 'POST') {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ statusCode: 400, message: 'Email and password are required' });
    }

    try {
      const users = await User.find()
      console.log('users', users)
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ statusCode: 401, message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ statusCode: 200, data: { token, user: { name: user.name, email: user.email } } });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
