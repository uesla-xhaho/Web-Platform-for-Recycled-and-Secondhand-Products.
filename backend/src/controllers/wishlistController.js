const { Wishlist, WishlistItem, Product } = require('../models');
const { normalizeProduct } = require('../utils/normalizers');

const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          as: 'products',
          where: { isActive: true },
          required: false,
          through: { attributes: [] },
        },
      ],
    });

    return res.json({ items: (wishlist?.products || []).map(normalizeProduct) });
  } catch (error) {
    next(error);
  }
};

const toggleWishlistItem = async (req, res, next) => {
  try {
    const productId = Number(req.body.productId);

    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Valid productId is required' });
    }

    const product = await Product.findByPk(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const [wishlist] = await Wishlist.findOrCreate({
      where: { userId: req.user.id },
      defaults: { userId: req.user.id },
    });

    const existing = await WishlistItem.findOne({ where: { wishlistId: wishlist.id, productId } });

    if (existing) {
      await existing.destroy();
    } else {
      await WishlistItem.create({ wishlistId: wishlist.id, productId });
    }

    const count = await WishlistItem.count({ where: { wishlistId: wishlist.id } });

    return res.json({
      message: existing ? 'Removed from wishlist' : 'Added to wishlist',
      isFavorite: !existing,
      count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  toggleWishlistItem,
};
