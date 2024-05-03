import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find the user based on the decoded token
    const user = await User.findById({ _id: decoded.userID, 'tokens.token': token });

    // If no user is found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Attach token and user information to the request
    req.token = token;
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default authMiddleware;
