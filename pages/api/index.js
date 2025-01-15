import connectDB from "./utils/db";

export default async function handler(req, res) {
    await connectDB();
    res.status(200).json({ statusCode: 200, message: 'db connected' });
}
