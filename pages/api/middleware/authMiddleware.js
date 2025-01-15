import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ statusCode: 401, message: 'No token provided' });
    throw new Error('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(403).json({ statusCode: 403, message: 'Invalid token' });
    throw new Error('Forbidden');
  }
}
