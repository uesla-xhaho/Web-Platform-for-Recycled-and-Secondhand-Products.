const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, artisanOrAdmin } = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validationMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

router.post(
  '/',
  protect,
  artisanOrAdmin,
  upload.array('images', 5),
  [
    body('title').trim().isLength({ min: 3 }).withMessage('Title is required'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description is required'),
    body('category').isIn(['second-hand', 'upcycled']).withMessage('Invalid category'),
    body('subcategory').trim().notEmpty().withMessage('Subcategory is required'),
    body('ecoImpact').isIn(['low', 'medium', 'high']).withMessage('Invalid ecoImpact'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be >= 0'),
  ],
  handleValidation,
  createProduct
);

router.put('/:id', protect, artisanOrAdmin, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, artisanOrAdmin, deleteProduct);

module.exports = router;
