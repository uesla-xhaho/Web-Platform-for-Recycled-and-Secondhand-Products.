const jwt = require('jsonwebtoken');
const { User } = require('../models');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password;
    plainUser._id = plainUser.id;

    req.user = plainUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }

  next();
};

const requireApprovedArtisan = (req, res, next) => {
  if (req.user.role !== 'artisan') {
    return res.status(403).json({ message: 'Only artisans can perform this action' });
  }

  if (!req.user.artisanApproved) {
    return res.status(403).json({ message: 'Artisan account pending admin approval' });
  }

  next();
};

const artisanOrAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }

  if (req.user.role !== 'artisan') {
    return res.status(403).json({ message: 'Only artisans or admins can perform this action' });
  }

  if (!req.user.artisanApproved) {
    return res.status(403).json({ message: 'Artisan account pending admin approval' });
  }

  next();
};

module.exports = { protect, authorize, requireApprovedArtisan, artisanOrAdmin };
