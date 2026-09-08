const toastEl = document.getElementById('toast');

const showToast = (message) => {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2200);
};

const formatPrice = (n) => `${Number(n || 0).toFixed(2)} EUR`;

const slugToCategoryLabel = (category) =>
  category === 'second-hand' ? 'Produkte second-hand' : 'Produkte te Ricikluara';

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (error) {
    return [];
  }
};

const setCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
  updateCartCount();
};

const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const found = cart.find((item) => item.id === product._id);

  if (found) {
    found.quantity += quantity;
  } else {
    cart.push({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || '',
      quantity,
    });
  }

  setCart(cart);
  showToast('Product added to cart');
};

const updateCartCount = () => {
  const countEl = document.getElementById('cartCount');
  if (!countEl) return;
  const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = String(total);
};

const attachLogout = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.API.clearSession();
    showToast('Signed out');
    setTimeout(() => (window.location.href = './login.html'), 400);
  });
};

const hydrateAuthNav = () => {
  const user = window.API.getUser();
  const authLink = document.getElementById('authLink');
  const adminLink = document.getElementById('adminLink');

  if (authLink) {
    if (user?.role === 'artisan') {
      authLink.textContent = 'Profili i Krijuesit';
      authLink.href = './artisan.html';
    } else if (user) {
      authLink.textContent = 'Dil';
      authLink.href = '#';
      authLink.id = 'logoutBtn';
    } else {
      authLink.textContent = 'Krijues te ReArt';
      authLink.href = './login.html';
    }
  }

  if (adminLink) {
    adminLink.style.display = user?.role === 'admin' ? 'inline-block' : 'none';
  }

  attachLogout();
};

window.UI = {
  showToast,
  formatPrice,
  slugToCategoryLabel,
  getCart,
  setCart,
  addToCart,
  updateCartCount,
  hydrateAuthNav,
};
