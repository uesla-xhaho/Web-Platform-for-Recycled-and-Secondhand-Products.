const { User } = require('../models');
const generateToken = require('../utils/generateToken');
const { normalizeUser } = require('../utils/normalizers');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, location, bio, profileImage } = req.body;

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const safeRole = ['customer', 'artisan'].includes(role) ? role : 'customer';

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: safeRole,
      location: location || '',
      bio: bio || '',
      profileImage: profileImage || '',
      artisanApproved: false,
    });

    return res.status(201).json({
      token: generateToken(user.id),
      user: normalizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: String(email).toLowerCase().trim() } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await user.matchPassword(password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      token: generateToken(user.id),
      user: normalizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, location, bio, profileImage } = req.body;

    user.name = name ?? user.name;
    user.location = location ?? user.location;
    user.bio = bio ?? user.bio;
    user.profileImage = profileImage ?? user.profileImage;

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    return res.json({
      message: 'Profile updated',
      user: normalizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateMe,
};
