const { Op } = require('sequelize');
const { Product, User } = require('../models');
const { normalizeProduct } = require('../utils/normalizers');

const parseMaterials = (materials) => {
  if (Array.isArray(materials)) {
    return materials.map((m) => String(m).trim()).filter(Boolean);
  }

  if (typeof materials === 'string') {
    return materials
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);
  }

  return [];
};

const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      ecoImpact,
      condition,
      material,
      location,
      minPrice,
      maxPrice,
      rating,
      search,
      sort = 'newest',
      page = 1,
      limit = 12,
      artisanId,
    } = req.query;

    const where = { isActive: true };

    if (category) where.category = category;
    if (ecoImpact) where.ecoImpact = ecoImpact;
    if (condition) where.condition = condition;

    if (artisanId) {
      const parsedArtisanId = Number(artisanId);
      if (Number.isInteger(parsedArtisanId)) {
        where.artisanId = parsedArtisanId;
      }
    }

    if (material) {
      where.materials = { [Op.like]: `%${material}%` };
    }

    if (location) {
      where.artisanLocation = { [Op.like]: `%${location}%` };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    if (rating) {
      where.averageRating = { [Op.gte]: Number(rating) };
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { subcategory: { [Op.like]: `%${search}%` } },
        { materials: { [Op.like]: `%${search}%` } },
      ];
    }

    const sortMap = {
      newest: [['createdAt', 'DESC']],
      priceAsc: [['price', 'ASC']],
      priceDesc: [['price', 'DESC']],
      rating: [
        ['averageRating', 'DESC'],
        ['reviewCount', 'DESC'],
      ],
      relevance: [['createdAt', 'DESC']],
    };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    const result = await Product.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'artisan',
          attributes: ['id', 'name', 'profileImage', 'location', 'artisanApproved'],
        },
      ],
      order: sortMap[sort] || sortMap.newest,
      offset: (pageNum - 1) * limitNum,
      limit: limitNum,
      distinct: true,
    });

    return res.json({
      items: result.rows.map(normalizeProduct),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.count,
        totalPages: Math.ceil(result.count / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getFeaturedProducts = async (req, res, next) => {
  try {
    const items = await Product.findAll({
      where: { isActive: true, featured: true },
      include: [{ model: User, as: 'artisan', attributes: ['id', 'name', 'location', 'profileImage'] }],
      order: [['createdAt', 'DESC']],
      limit: 8,
    });

    return res.json({ items: items.map(normalizeProduct) });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Invalid product id' });
    }

    const product = await Product.findOne({
      where: { id: productId, isActive: true },
      include: [{ model: User, as: 'artisan', attributes: ['id', 'name', 'profileImage', 'bio', 'location'] }],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ item: normalizeProduct(product) });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const materials = parseMaterials(req.body.materials);
    const images = (req.files || []).map((file) => `/uploads/${file.filename}`);

    if (req.body.category === 'second-hand' && !req.body.condition) {
      return res.status(422).json({ message: 'Condition is required for second-hand products' });
    }

    const product = await Product.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      materials,
      condition: req.body.category === 'second-hand' ? req.body.condition : 'not_applicable',
      ecoImpact: req.body.ecoImpact,
      price: Number(req.body.price),
      artisanId: req.user.id,
      artisanName: req.user.name,
      artisanLocation: req.user.location || '',
      stock: Number(req.body.stock),
      shippingMethod: req.body.shippingMethod || 'Standard',
      shippingCost: Number(req.body.shippingCost || 0),
      shippingDays: Number(req.body.shippingDays || 5),
      images,
    });

    return res.status(201).json({ message: 'Product created', item: normalizeProduct(product) });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Invalid product id' });
    }

    const product = await Product.findByPk(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const isOwner = Number(product.artisanId) === Number(req.user.id);
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not allowed to edit this product' });
    }

    const incomingMaterials = req.body.materials ? parseMaterials(req.body.materials) : product.materials;
    const incomingImages = req.files?.length
      ? [...product.images, ...req.files.map((file) => `/uploads/${file.filename}`)]
      : product.images;

    const nextCategory = req.body.category || product.category;

    product.title = req.body.title ?? product.title;
    product.description = req.body.description ?? product.description;
    product.category = nextCategory;
    product.subcategory = req.body.subcategory ?? product.subcategory;
    product.materials = incomingMaterials;
    product.condition =
      nextCategory === 'second-hand' ? req.body.condition || product.condition : 'not_applicable';
    product.ecoImpact = req.body.ecoImpact ?? product.ecoImpact;
    product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.stock = req.body.stock !== undefined ? Number(req.body.stock) : product.stock;
    product.images = incomingImages;

    if (req.body.shippingMethod || req.body.shippingCost || req.body.shippingDays) {
      product.shippingMethod = req.body.shippingMethod || product.shippingMethod;
      product.shippingCost =
        req.body.shippingCost !== undefined ? Number(req.body.shippingCost) : product.shippingCost;
      product.shippingDays =
        req.body.shippingDays !== undefined ? Number(req.body.shippingDays) : product.shippingDays;
    }

    await product.save();

    return res.json({ message: 'Product updated', item: normalizeProduct(product) });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId)) {
      return res.status(422).json({ message: 'Invalid product id' });
    }

    const product = await Product.findByPk(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const isOwner = Number(product.artisanId) === Number(req.user.id);
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not allowed to delete this product' });
    }

    product.isActive = false;
    product.featured = false;
    await product.save();

    return res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
