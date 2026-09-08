const { Op } = require('sequelize');
const { User, Product, Order } = require('../models');
const { normalizeUser } = require('../utils/normalizers');

const getUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    const where = {};

    if (role) where.role = role;
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const users = await User.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json({ items: users.map(normalizeUser) });
  } catch (error) {
    next(error);
  }
};

const getPendingArtisans = async (req, res, next) => {
  try {
    const items = await User.findAll({
      where: { role: 'artisan', artisanApproved: false },
      order: [['createdAt', 'DESC']],
    });

    return res.json({ items: items.map(normalizeUser) });
  } catch (error) {
    next(error);
  }
};

const approveArtisan = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
      return res.status(422).json({ message: 'Invalid artisan id' });
    }

    const user = await User.findByPk(userId);

    if (!user || user.role !== 'artisan') {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    user.artisanApproved = true;
    await user.save();

    return res.json({ message: 'Artisan approved' });
  } catch (error) {
    next(error);
  }
};

const featureProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Invalid product id' });
    }

    const product = await Product.findByPk(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.featured = Boolean(req.body.featured);
    await product.save();

    return res.json({ message: 'Product updated', featured: product.featured });
  } catch (error) {
    next(error);
  }
};

const removeProductByAdmin = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Invalid product id' });
    }

    const product = await Product.findByPk(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isActive = false;
    product.featured = false;
    await product.save();

    return res.json({ message: 'Product removed by admin' });
  } catch (error) {
    next(error);
  }
};

const getAdminMetrics = async (req, res, next) => {
  try {
    const [customers, artisans, pendingArtisans, products, activeProducts, orders, paidRevenueRaw] =
      await Promise.all([
        User.count({ where: { role: 'customer' } }),
        User.count({ where: { role: 'artisan' } }),
        User.count({ where: { role: 'artisan', artisanApproved: false } }),
        Product.count(),
        Product.count({ where: { isActive: true } }),
        Order.count(),
        Order.sum('totalAmount', { where: { paymentStatus: 'paid' } }),
      ]);

    return res.json({
      metrics: {
        customers,
        artisans,
        pendingArtisans,
        products,
        activeProducts,
        orders,
        paidRevenue: Number(Number(paidRevenueRaw || 0).toFixed(2)),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getPendingArtisans,
  approveArtisan,
  featureProduct,
  removeProductByAdmin,
  getAdminMetrics,
};
