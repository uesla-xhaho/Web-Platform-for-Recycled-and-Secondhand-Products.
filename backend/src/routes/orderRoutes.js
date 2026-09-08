const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('customer'),
  [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('shippingAddress.fullName').notEmpty().withMessage('Shipping name is required'),
    body('shippingAddress.line1').notEmpty().withMessage('Address line 1 is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
  ],
  handleValidation,
  createOrder
);

router.get('/mine', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.patch('/:id/status', protect, authorize('admin'), updateOrderStatus);

module.exports = router;
