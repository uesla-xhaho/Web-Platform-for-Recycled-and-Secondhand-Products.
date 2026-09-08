const { fn, col } = require('sequelize');
const { Review, Product, User } = require('../models');
const { normalizeReview } = require('../utils/normalizers');

const updateProductRatings = async (productId) => {
  const stats = await Review.findOne({
    where: { productId },
    attributes: [
      [fn('AVG', col('rating')), 'averageRating'],
      [fn('COUNT', col('id')), 'reviewCount'],
    ],
    raw: true,
  });

  const averageRating = Number(Number(stats?.averageRating || 0).toFixed(2));
  const reviewCount = Number(stats?.reviewCount || 0);

  await Product.update({ averageRating, reviewCount }, { where: { id: productId } });
};

const createOrUpdateReview = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const { rating, comment } = req.body;

    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Invalid product id' });
    }

    const product = await Product.findByPk(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existing = await Review.findOne({ where: { productId, userId: req.user.id } });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment ?? existing.comment;
      await existing.save();
    } else {
      await Review.create({
        productId,
        userId: req.user.id,
        rating,
        comment: comment || '',
      });
    }

    await updateProductRatings(productId);

    return res.status(201).json({ message: 'Review saved' });
  } catch (error) {
    next(error);
  }
};

const getProductReviews = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);

    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Invalid product id' });
    }

    const reviews = await Review.findAll({
      where: { productId },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'profileImage'] }],
      order: [['createdAt', 'DESC']],
    });

    return res.json({ reviews: reviews.map(normalizeReview) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrUpdateReview,
  getProductReviews,
};
