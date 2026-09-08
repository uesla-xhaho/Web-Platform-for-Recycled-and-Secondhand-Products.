const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const dbEnabled = String(process.env.USE_DB || 'false').toLowerCase() === 'true';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(limiter);
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'circular-marketplace-api',
    database: dbEnabled ? 'enabled' : 'disabled',
  });
});

if (dbEnabled) {
  const authRoutes = require('./routes/authRoutes');
  const productRoutes = require('./routes/productRoutes');
  const orderRoutes = require('./routes/orderRoutes');
  const reviewRoutes = require('./routes/reviewRoutes');
  const wishlistRoutes = require('./routes/wishlistRoutes');
  const adminRoutes = require('./routes/adminRoutes');
  const artisanRoutes = require('./routes/artisanRoutes');

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/wishlist', wishlistRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/artisan', artisanRoutes);
} else {
  app.use('/api', (req, res) => {
    res.status(503).json({
      message:
        'Database mode is disabled. Set USE_DB=true and configure DB_* variables to enable API routes.',
    });
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
