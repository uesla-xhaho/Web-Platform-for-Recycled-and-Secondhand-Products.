const express = require('express');
const { body } = require('express-validator');
const {
  createOrUpdateReview,
  getProductReviews,
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

router.get('/:productId', getProductReviews);

router.post(
  '/:productId',
  protect,
  authorize('customer'),
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1 to 5'),
    body('comment').optional().isLength({ max: 1200 }).withMessage('Comment too long'),
  ],
  handleValidation,
  createOrUpdateReview
);

module.exports = router;
