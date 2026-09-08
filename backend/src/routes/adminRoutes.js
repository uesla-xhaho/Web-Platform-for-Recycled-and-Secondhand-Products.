const express = require('express');
const { body } = require('express-validator');
const {
  getUsers,
  getPendingArtisans,
  approveArtisan,
  featureProduct,
  removeProductByAdmin,
  getAdminMetrics,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/metrics', getAdminMetrics);
router.get('/users', getUsers);
router.get('/artisans/pending', getPendingArtisans);
router.patch('/artisans/:userId/approve', approveArtisan);
router.patch(
  '/products/:productId/feature',
  [body('featured').isBoolean().withMessage('featured boolean is required')],
  handleValidation,
  featureProduct
);
router.delete('/products/:productId', removeProductByAdmin);

module.exports = router;
