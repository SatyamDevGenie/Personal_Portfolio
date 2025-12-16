const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/admin/dashboard
router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({ message: `Welcome to admin dashboard, ${req.user.username}` });
});

module.exports = router;
