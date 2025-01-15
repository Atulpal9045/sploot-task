import { authMiddleware } from "../middleware/authMiddleware";
import User from "../models/User";
import connectDB from "../utils/db";

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  if (method === 'GET') {
    await authMiddleware(req, res);
    const userId = req.user.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(403).json({ statusCode: 403, message: 'User not found, access forbidden' });
      }

      res.status(200).json({ statusCode: 200, data: { user: { name: user.name, email: user.email } } });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
