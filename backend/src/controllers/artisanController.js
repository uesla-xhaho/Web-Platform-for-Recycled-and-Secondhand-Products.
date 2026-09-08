const { QueryTypes, Op } = require('sequelize');
const { sequelize, Product, Order, OrderItem, User } = require('../models');
const { normalizeProduct, normalizeUser } = require('../utils/normalizers');

const getDashboard = async (req, res, next) => {
  try {
    const artisanId = req.user.id;

    const [totalProducts, lowStockProducts, orderStatsRows, earningsRows] = await Promise.all([
      Product.count({ where: { artisanId, isActive: true } }),
      Product.findAll({
        where: { artisanId, isActive: true, stock: { [Op.lte]: 5 } },
        attributes: ['id', 'title', 'stock'],
        order: [['stock', 'ASC']],
        limit: 8,
      }),
      sequelize.query(
        `
        SELECT o.orderStatus AS orderStatus,
               COUNT(*) AS count,
               SUM(oi.quantity) AS soldUnits
        FROM order_items oi
        INNER JOIN orders o ON o.id = oi.orderId
        WHERE oi.artisanId = :artisanId
        GROUP BY o.orderStatus
      `,
        {
          replacements: { artisanId },
          type: QueryTypes.SELECT,
        }
      ),
      sequelize.query(
        `
        SELECT SUM(CAST(oi.priceSnapshot AS DECIMAL(10,2)) * oi.quantity) AS revenue
        FROM order_items oi
        INNER JOIN orders o ON o.id = oi.orderId
        WHERE oi.artisanId = :artisanId AND o.paymentStatus = 'paid'
      `,
        {
          replacements: { artisanId },
          type: QueryTypes.SELECT,
        }
      ),
    ]);

    const orderStats = orderStatsRows.map((row) => ({
      _id: row.orderStatus,
      count: Number(row.count || 0),
      soldUnits: Number(row.soldUnits || 0),
    }));

    return res.json({
      summary: {
        totalProducts,
        lowStockCount: lowStockProducts.length,
        lowStockProducts: lowStockProducts.map((p) => ({ ...p.get({ plain: true }), _id: p.id })),
        orderStats,
        revenue: Number(Number(earningsRows[0]?.revenue || 0).toFixed(2)),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyProducts = async (req, res, next) => {
  try {
    const items = await Product.findAll({
      where: { artisanId: req.user.id, isActive: true },
      order: [['createdAt', 'DESC']],
    });

    return res.json({ items: items.map(normalizeProduct) });
  } catch (error) {
    next(error);
  }
};

const getMyOrdersAsArtisan = async (req, res, next) => {
  try {
    const artisanId = req.user.id;

    const orders = await Order.findAll({
      include: [
        { model: User, as: 'customer', attributes: ['id', 'name', 'email'] },
        {
          model: OrderItem,
          as: 'items',
          where: { artisanId },
          required: true,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const filtered = orders.map((order) => {
      const plain = order.get({ plain: true });
      return {
        id: plain.id,
        _id: plain.id,
        createdAt: plain.createdAt,
        customer: plain.customer ? normalizeUser(plain.customer) : null,
        orderStatus: plain.orderStatus,
        paymentStatus: plain.paymentStatus,
        myItems: (plain.items || []).map((item) => ({ ...item, _id: item.id })),
      };
    });

    return res.json({ items: filtered });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getMyProducts,
  getMyOrdersAsArtisan,
};
