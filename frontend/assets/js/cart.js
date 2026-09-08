const SHIPPING_THRESHOLD = 10000;
const SHIPPING_FEE = 250;

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const formatLek = (value) => {
  const n = Number(value || 0);
  return `Lek ${n.toLocaleString('en-US')} ALL`;
};

const toSafeQty = (value) => {
  const qty = Number(value);
  if (!Number.isFinite(qty) || qty < 1) return 1;
  return Math.floor(qty);
};

const normalizeCart = () => {
  const normalized = UI.getCart()
    .map((item) => ({
      ...item,
      id: String(item.id),
      title: String(item.title || 'Produkt'),
      price: Number(item.price || 0),
      quantity: toSafeQty(item.quantity),
      image: String(item.image || ''),
    }))
    .filter((item) => item.id && item.price >= 0);

  UI.setCart(normalized);
  return normalized;
};

const computeTotals = (cart) => {
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return { itemsCount, subtotal, shipping, total };
};

const setSummary = ({ itemsCount, subtotal, shipping, total }) => {
  const itemsCountEl = document.getElementById('cartItemsCount');
  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');

  if (itemsCountEl) itemsCountEl.textContent = String(itemsCount);
  if (subtotalEl) subtotalEl.textContent = formatLek(subtotal);
  if (shippingEl) shippingEl.textContent = formatLek(shipping);
  if (totalEl) totalEl.textContent = formatLek(total);
};

const renderCart = () => {
  const cart = normalizeCart();
  const wrap = document.getElementById('cartItems');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearBtn = document.getElementById('clearCartBtn');
  const totals = computeTotals(cart);

  setSummary(totals);

  if (checkoutBtn) checkoutBtn.disabled = !cart.length;
  if (clearBtn) clearBtn.disabled = !cart.length;

  if (!cart.length) {
    wrap.innerHTML = `
      <div class="cart-empty">
        <h3>Shporta eshte bosh</h3>
        <p class="muted">Shto disa produkte dhe kthehu perseri per checkout.</p>
        <a class="btn" href="/browse">Shiko produktet</a>
      </div>
    `;
    return;
  }

  wrap.innerHTML = cart
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      const image = item.image || 'https://placehold.co/240x240?text=Re-Art';

      return `
        <article class="cart-item" data-id="${encodeURIComponent(item.id)}">
          <img class="cart-item-image" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" />

          <div>
            <h4 class="cart-item-title">${escapeHtml(item.title)}</h4>
            <p class="cart-item-meta">Cmimi: ${formatLek(item.price)}</p>
            <p class="cart-item-total">Total: ${formatLek(lineTotal)}</p>
          </div>

          <div class="cart-item-actions">
            <button class="btn secondary" type="button" data-action="dec" data-id="${encodeURIComponent(item.id)}">-</button>
            <input
              class="cart-item-qty"
              type="number"
              min="1"
              value="${item.quantity}"
              data-action="set"
              data-id="${encodeURIComponent(item.id)}"
              aria-label="Sasia"
            />
            <button class="btn secondary" type="button" data-action="inc" data-id="${encodeURIComponent(item.id)}">+</button>
            <button class="btn danger" type="button" data-action="del" data-id="${encodeURIComponent(item.id)}">Hiq</button>
          </div>
        </article>
      `;
    })
    .join('');
};

const updateCartItem = (id, updater) => {
  const cart = UI.getCart().map((item) => ({ ...item, id: String(item.id) }));
  const index = cart.findIndex((item) => item.id === String(id));
  if (index === -1) return;

  const next = updater({ ...cart[index] });
  if (!next) {
    cart.splice(index, 1);
  } else {
    cart[index] = next;
  }

  UI.setCart(cart);
  renderCart();
};

const clearCart = () => {
  UI.setCart([]);
  renderCart();
};

const storeMockOrder = ({ items, shippingAddress, totals }) => {
  let mockOrders = [];
  try {
    mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
  } catch (error) {
    mockOrders = [];
  }

  mockOrders.unshift({
    id: `mock_${Date.now()}`,
    createdAt: new Date().toISOString(),
    items,
    shippingAddress,
    totals,
    status: 'created',
  });

  localStorage.setItem('mockOrders', JSON.stringify(mockOrders.slice(0, 50)));
};

document.addEventListener('DOMContentLoaded', () => {
  UI.hydrateAuthNav();
  UI.updateCartCount();
  renderCart();

  const wrap = document.getElementById('cartItems');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');

  clearCartBtn?.addEventListener('click', () => {
    if (!UI.getCart().length) return;
    clearCart();
    UI.showToast('Shporta u pastrua.');
  });

  wrap?.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const id = decodeURIComponent(target.dataset.id || '');
    const action = target.dataset.action;

    if (!id || !action) return;

    if (action === 'inc') {
      updateCartItem(id, (item) => ({ ...item, quantity: Math.max(1, Number(item.quantity || 1) + 1) }));
      return;
    }

    if (action === 'dec') {
      updateCartItem(id, (item) => ({ ...item, quantity: Math.max(1, Number(item.quantity || 1) - 1) }));
      return;
    }

    if (action === 'del') {
      updateCartItem(id, () => null);
      UI.showToast('Produkti u hoq nga shporta.');
    }
  });

  wrap?.addEventListener('change', (event) => {
    const input = event.target.closest('input[data-action="set"]');
    if (!input) return;

    const id = decodeURIComponent(input.dataset.id || '');
    const nextQty = toSafeQty(input.value);

    updateCartItem(id, (item) => ({ ...item, quantity: nextQty }));
  });

  checkoutForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cart = normalizeCart();
    if (!cart.length) {
      UI.showToast('Shporta eshte bosh.');
      return;
    }

    const formData = new FormData(checkoutForm);
    const shippingAddress = {
      fullName: String(formData.get('fullName') || '').trim(),
      line1: String(formData.get('line1') || '').trim(),
      line2: String(formData.get('line2') || '').trim(),
      city: String(formData.get('city') || '').trim(),
    };

    const requiredFields = ['fullName', 'line1', 'city'];
    const missing = requiredFields.some((field) => !shippingAddress[field]);

    if (missing) {
      UI.showToast('Ploteso fushat e detyrueshme te adreses.');
      return;
    }

    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = 'Duke procesuar...';
    }

    const totals = computeTotals(cart);

    let remoteOrderCreated = false;

    try {
      const user = API.getUser();
      if (user?.role === 'customer') {
        await API.apiFetch('/orders', {
          method: 'POST',
          body: JSON.stringify({
            items: cart.map((item) => ({
              productId: /^\d+$/.test(String(item.id)) ? Number(item.id) : item.id,
              quantity: toSafeQty(item.quantity),
            })),
            markPaid: true,
            shippingAddress,
          }),
        });
        remoteOrderCreated = true;
      }
    } catch (error) {
      remoteOrderCreated = false;
    }

    storeMockOrder({
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      totals,
    });

    UI.setCart([]);
    renderCart();
    checkoutForm.reset();

    if (checkoutBtn) {
      checkoutBtn.textContent = 'Perfundo porosine';
    }

    UI.showToast(remoteOrderCreated ? 'Porosia u krijua me sukses.' : 'Porosia u regjistrua lokalisht (mock).');
  });
});
