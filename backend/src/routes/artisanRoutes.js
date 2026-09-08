const express = require('express');
const {
  getDashboard,
  getMyProducts,
  getMyOrdersAsArtisan,
} = require('../controllers/artisanController');
const { protect, authorize, requireApprovedArtisan } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('artisan'), requireApprovedArtisan);

router.get('/dashboard', getDashboard);
router.get('/products', getMyProducts);
router.get('/orders', getMyOrdersAsArtisan);

module.exports = router;
