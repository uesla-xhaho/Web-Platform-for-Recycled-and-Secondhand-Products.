const enforceAdmin = () => {
  const user = API.getUser();
  if (!user || user.role !== 'admin') {
    window.location.href = './login.html';
    return false;
  }
  return true;
};

const renderMetrics = (metrics) => {
  document.getElementById('adminMetrics').innerHTML = `
    <div class="kpi"><strong>${metrics.customers}</strong><div class="muted">Customers</div></div>
    <div class="kpi"><strong>${metrics.artisans}</strong><div class="muted">Artisans</div></div>
    <div class="kpi"><strong>${metrics.pendingArtisans}</strong><div class="muted">Ne pritje</div></div>
    <div class="kpi"><strong>${metrics.paidRevenue.toFixed(2)} EUR</strong><div class="muted">Paid Revenue</div></div>
  `;
};

const renderPending = (items) => {
  const tbody = document.getElementById('pendingArtisansBody');
  tbody.innerHTML = items
    .map(
      (u) => `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.location || '-'}</td>
        <td><button class="btn" data-approve="${u._id}">Approve</button></td>
      </tr>
    `
    )
    .join('');

  tbody.querySelectorAll('[data-approve]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await API.apiFetch(`/admin/artisans/${btn.dataset.approve}/approve`, { method: 'PATCH' });
        UI.showToast('Artizani u aprovua');
        await loadAdmin();
      } catch (error) {
        UI.showToast(error.message);
      }
    });
  });
};

const renderProducts = (items) => {
  const tbody = document.getElementById('adminProductsBody');
  tbody.innerHTML = items
    .map(
      (p) => `
      <tr>
        <td>${p.title}</td>
        <td>${p.artisanName || p.artisan?.name || '-'}</td>
        <td>${p.featured ? 'Po' : 'Jo'}</td>
        <td>
          <button class="btn secondary" data-feature="${p._id}" data-next="${!p.featured}">${
        p.featured ? 'Unfeature' : 'Feature'
      }</button>
          <button class="btn danger" data-remove="${p._id}">Remove</button>
        </td>
      </tr>
    `
    )
    .join('');

  tbody.querySelectorAll('[data-feature]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await API.apiFetch(`/admin/products/${btn.dataset.feature}/feature`, {
          method: 'PATCH',
          body: JSON.stringify({ featured: btn.dataset.next === 'true' }),
        });
        UI.showToast('Statusi i produktit u perditesua');
        await loadAdmin();
      } catch (error) {
        UI.showToast(error.message);
      }
    });
  });

  tbody.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await API.apiFetch(`/admin/products/${btn.dataset.remove}`, { method: 'DELETE' });
        UI.showToast('Produkti u hoq');
        await loadAdmin();
      } catch (error) {
        UI.showToast(error.message);
      }
    });
  });
};

const loadAdmin = async () => {
  const [metrics, pending, products] = await Promise.all([
    API.apiFetch('/admin/metrics'),
    API.apiFetch('/admin/artisans/pending'),
    API.apiFetch('/products?limit=100'),
  ]);

  renderMetrics(metrics.metrics);
  renderPending(pending.items);
  renderProducts(products.items);
};

document.addEventListener('DOMContentLoaded', async () => {
  UI.hydrateAuthNav();
  UI.updateCartCount();

  if (!enforceAdmin()) return;

  try {
    await loadAdmin();
  } catch (error) {
    document.getElementById('adminError').textContent = error.message;
  }
});
