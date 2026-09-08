const asArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const normalizeUser = (user) => {
  const plain = user?.get ? user.get({ plain: true }) : user;
  if (!plain) return null;

  const { password, ...rest } = plain;
  return { ...rest, _id: rest.id };
};

const normalizeProduct = (product) => {
  const plain = product?.get ? product.get({ plain: true }) : product;
  if (!plain) return null;

  return {
    ...plain,
    _id: plain.id,
    materials: asArray(plain.materials),
    images: asArray(plain.images),
    shippingDetails: {
      method: plain.shippingMethod,
      cost: Number(plain.shippingCost || 0),
      estimatedDays: Number(plain.shippingDays || 0),
    },
    artisan: plain.artisan ? normalizeUser(plain.artisan) : plain.artisan,
  };
};

const normalizeReview = (review) => {
  const plain = review?.get ? review.get({ plain: true }) : review;
  if (!plain) return null;

  return {
    ...plain,
    _id: plain.id,
    user: plain.user ? normalizeUser(plain.user) : plain.user,
    product: plain.product ? normalizeProduct(plain.product) : plain.product,
  };
};

const normalizeOrder = (order) => {
  const plain = order?.get ? order.get({ plain: true }) : order;
  if (!plain) return null;

  return {
    ...plain,
    _id: plain.id,
    shippingAddress: {
      fullName: plain.shippingFullName,
      line1: plain.shippingLine1,
      line2: plain.shippingLine2,
      city: plain.shippingCity,
      postalCode: plain.shippingPostalCode,
      country: plain.shippingCountry,
    },
    customer: plain.customer ? normalizeUser(plain.customer) : plain.customer,
    items: (plain.items || []).map((item) => ({
      ...item,
      _id: item.id,
      product: item.product ? normalizeProduct(item.product) : item.product,
      artisan: item.artisan ? normalizeUser(item.artisan) : item.artisan,
    })),
  };
};

module.exports = {
  asArray,
  normalizeUser,
  normalizeProduct,
  normalizeReview,
  normalizeOrder,
};
