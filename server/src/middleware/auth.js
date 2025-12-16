const jwt = require('jsonwebtoken');

const authMiddleware = {};

authMiddleware.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Missing or invalid authorization token' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

authMiddleware.isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  // Allow admin role or specific username 'satyam'
  if (req.user.role === 'admin' || req.user.username === 'satyam') return next();
  return res.status(403).json({ message: 'Forbidden: admin only' });
};

module.exports = authMiddleware;
