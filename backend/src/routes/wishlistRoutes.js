const express = require('express');
const { body } = require('express-validator');
const { getWishlist, toggleWishlistItem } = require('../controllers/wishlistController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

router.get('/', protect, authorize('customer'), getWishlist);

router.post(
  '/toggle',
  protect,
  authorize('customer'),
  [body('productId').isInt({ min: 1 }).withMessage('Valid productId is required')],
  handleValidation,
  toggleWishlistItem
);

module.exports = router;
