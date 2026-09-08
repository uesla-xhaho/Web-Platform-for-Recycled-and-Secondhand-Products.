const { sequelize, Product, Order, OrderItem, User } = require('../models');
const { normalizeOrder } = require('../utils/normalizers');

const createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { items, shippingAddress, markPaid = false } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      await transaction.rollback();
      return res.status(422).json({ message: 'Order items are required' });
    }

    if (!shippingAddress?.fullName || !shippingAddress?.line1 || !shippingAddress?.city) {
      await transaction.rollback();
      return res.status(422).json({ message: 'Complete shipping address is required' });
    }

    const productIds = items.map((item) => Number(item.productId));
    if (productIds.some((id) => !Number.isInteger(id))) {
      await transaction.rollback();
      return res.status(422).json({ message: 'Invalid product id in items' });
    }

    const products = await Product.findAll({
      where: { id: productIds, isActive: true },
      transaction,
    });
    const byId = new Map(products.map((p) => [Number(p.id), p]));

    let subtotal = 0;
    let shippingTotal = 0;
    const orderItems = [];

    for (const entry of items) {
      const productId = Number(entry.productId);
      const product = byId.get(productId);
      const quantity = Math.max(1, Number(entry.quantity || 1));

      if (!product) {
        await transaction.rollback();
        return res.status(404).json({ message: `Product not found: ${entry.productId}` });
      }

      if (Number(product.stock) < quantity) {
        await transaction.rollback();
        return res.status(422).json({ message: `Insufficient stock for ${product.title}` });
      }

      subtotal += Number(product.price) * quantity;
      shippingTotal += Number(product.shippingCost || 0) * quantity;

      orderItems.push({
        productId: Number(product.id),
        artisanId: Number(product.artisanId),
        titleSnapshot: product.title,
        priceSnapshot: Number(product.price),
        quantity,
      });
    }

    for (const entry of orderItems) {
      const product = byId.get(entry.productId);
      product.stock = Number(product.stock) - entry.quantity;
      await product.save({ transaction });
    }

    const commissionPercent = Number(process.env.PLATFORM_COMMISSION_PERCENT || 8);
    const commissionAmount = Number(((subtotal * commissionPercent) / 100).toFixed(2));
    const totalAmount = Number((subtotal + shippingTotal).toFixed(2));

    const order = await Order.create(
      {
        customerId: req.user.id,
        subtotal: Number(subtotal.toFixed(2)),
        commissionPercent,
        commissionAmount,
        totalAmount,
        paymentStatus: markPaid ? 'paid' : 'pending',
        orderStatus: markPaid ? 'processing' : 'pending',
        shippingFullName: shippingAddress.fullName,
        shippingLine1: shippingAddress.line1,
        shippingLine2: shippingAddress.line2 || '',
        shippingCity: shippingAddress.city,
        shippingPostalCode: shippingAddress.postalCode,
        shippingCountry: shippingAddress.country,
      },
      { transaction }
    );

    await OrderItem.bulkCreate(
      orderItems.map((item) => ({
        orderId: order.id,
        ...item,
      })),
      { transaction }
    );

    await transaction.commit();

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, as: 'customer', attributes: ['id', 'name', 'email'] },
        {
          model: OrderItem,
          as: 'items',
          include: [
            { model: Product, as: 'product', attributes: ['id', 'title', 'images', 'artisanId'] },
            { model: User, as: 'artisan', attributes: ['id', 'name'] },
          ],
        },
      ],
    });

    return res.status(201).json({
      message: 'Order placed successfully',
      order: normalizeOrder(createdOrder),
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { customerId: req.user.id },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'title', 'images', 'artisanId'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.json({ items: orders.map(normalizeOrder) });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);

    if (!Number.isInteger(orderId)) {
      return res.status(422).json({ message: 'Invalid order id' });
    }

    const order = await Order.findByPk(orderId, {
      include: [
        { model: User, as: 'customer', attributes: ['id', 'name', 'email'] },
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'title', 'images', 'artisanId'] }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isCustomer = Number(order.customerId) === Number(req.user.id);
    const isAdmin = req.user.role === 'admin';
    const isArtisan = (order.items || []).some((item) => Number(item.artisanId) === Number(req.user.id));

    if (!isCustomer && !isAdmin && !isArtisan) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return res.json({ item: normalizeOrder(order) });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);

    if (!Number.isInteger(orderId)) {
      return res.status(422).json({ message: 'Invalid order id' });
    }

    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    return res.json({ message: 'Order updated', item: normalizeOrder(order) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};
