const PRODUCTS_DATA_PATH = '/assets/data/products.json';
const CATEGORY_CONFIG = {
  'second-hand': { label: 'Produkte second-hand' },
  upcycled: { label: 'Produkte te Ricikluara' },
};

const normalizeCategoryKey = (value) => {
  const key = String(value || '')
    .trim()
    .toLowerCase();
  return Object.prototype.hasOwnProperty.call(CATEGORY_CONFIG, key) ? key : '';
};

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const buildQueryFromForm = (formData) => {
  const params = new URLSearchParams();
  const allowed = new Set([
    'search',
    'category',
    'ecoImpact',
    'condition',
    'material',
    'location',
    'minPrice',
    'maxPrice',
    'rating',
    'sort',
    'availability',
  ]);

  for (const [key, value] of formData.entries()) {
    if (!allowed.has(key)) continue;
    if (value) params.set(key, value);
  }

  return params;
};

const formatLek = (value) => {
  const n = Number(value || 0);
  return `Lek ${n.toLocaleString('en-US')} ALL`;
};

const parseOptionalNumber = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
};

const loadProductsCatalog = async () => {
  const res = await fetch(PRODUCTS_DATA_PATH, { cache: 'no-store' });
  if (!res.ok) throw new Error('Nuk u ngarkuan dot produktet.');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Formati i products.json eshte i pavlefshem.');
  return data;
};

const applyClientSort = (items, sortValue) => {
  if (sortValue === 'titleAsc') {
    return [...items].sort((a, b) => String(a.title || '').localeCompare(String(b.title || '')));
  }

  if (sortValue === 'priceAsc') {
    return [...items].sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  }

  if (sortValue === 'priceDesc') {
    return [...items].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  }

  if (sortValue === 'rating') {
    return [...items].sort((a, b) => Number(b.averageRating || 0) - Number(a.averageRating || 0));
  }

  return [...items].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
};

const applyAvailabilityFilter = (items, availability) => {
  if (availability === 'in-stock') {
    return items.filter((item) => Number(item.stock || 0) > 0);
  }

  if (availability === 'sold-out') {
    return items.filter((item) => Number(item.stock || 0) <= 0);
  }

  return items;
};

const applyFilters = (items, formData) => {
  const search = String(formData.get('search') || '').trim().toLowerCase();
  const category = String(formData.get('category') || '').trim().toLowerCase();
  const ecoImpact = String(formData.get('ecoImpact') || '').trim().toLowerCase();
  const condition = String(formData.get('condition') || '').trim().toLowerCase();
  const material = String(formData.get('material') || '').trim().toLowerCase();
  const location = String(formData.get('location') || '').trim().toLowerCase();
  const minPrice = parseOptionalNumber(formData.get('minPrice'));
  const maxPrice = parseOptionalNumber(formData.get('maxPrice'));
  const minRating = parseOptionalNumber(formData.get('rating'));

  return items.filter((item) => {
    if (search) {
      const haystack = [
        item.title,
        item.description,
        item.subcategory,
        item.artisanName,
        item.artisanLocation,
        ...(Array.isArray(item.materials) ? item.materials : []),
      ]
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(search)) return false;
    }

    if (category && String(item.category || '').toLowerCase() !== category) return false;
    if (ecoImpact && String(item.ecoImpact || '').toLowerCase() !== ecoImpact) return false;
    if (condition && String(item.condition || '').toLowerCase() !== condition) return false;

    if (material) {
      const materials = (Array.isArray(item.materials) ? item.materials : []).join(' ').toLowerCase();
      if (!materials.includes(material)) return false;
    }

    if (location && !String(item.artisanLocation || '').toLowerCase().includes(location)) return false;
    if (minPrice !== null && Number(item.price || 0) < minPrice) return false;
    if (maxPrice !== null && Number(item.price || 0) > maxPrice) return false;
    if (minRating !== null && Number(item.averageRating || 0) < minRating) return false;

    return true;
  });
};

const renderProducts = (items) => {
  const wrap = document.getElementById('browseProducts');

  if (!items.length) {
    wrap.innerHTML = '<p class="muted">Nuk u gjet asnje produkt per kete filter.</p>';
    return;
  }

  const renderCards = (groupItems) =>
    groupItems
      .map((item) => {
        const image = item.images?.[0] || 'https://placehold.co/800x600?text=Upcycled+Product';
        const soldOut = Number(item.stock || 0) <= 0;

        return `
          <article class="showcase-card">
            <a href="/product?id=${encodeURIComponent(item._id)}" class="showcase-card-link">
              <div class="showcase-image-wrap">
                <img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" />
                ${soldOut ? '<span class="sold-badge">I shitur</span>' : ''}
              </div>
              <h3>${escapeHtml(item.title)}</h3>
              <p class="showcase-price">${formatLek(item.price)}</p>
            </a>
          </article>
        `;
      })
      .join('');

  const groups = Object.entries(CATEGORY_CONFIG).map(([key, value]) => ({
    key,
    label: value.label,
  }));

  const sections = groups
    .map((group) => {
      const groupItems = items.filter((item) => String(item.category || '').toLowerCase() === group.key);
      if (!groupItems.length) return '';
      return `
        <section id="showcase-group-${group.key}" class="showcase-group">
          <h3 class="showcase-group-title">${group.label}</h3>
          <div class="showcase-grid">
            ${renderCards(groupItems)}
          </div>
        </section>
      `;
    })
    .join('');

  if (!sections) {
    wrap.innerHTML = '<p class="muted">Nuk u gjet asnje produkt per kete filter.</p>';
    return;
  }

  wrap.innerHTML = sections;
};

document.addEventListener('DOMContentLoaded', async () => {
  UI.hydrateAuthNav();
  UI.updateCartCount();

  const filterForm = document.getElementById('filterForm');
  let productsCatalog = [];
  let didInitialCategoryJump = false;

  const initialParams = new URLSearchParams(window.location.search);
  const hashCategory = normalizeCategoryKey(window.location.hash.replace('#', ''));
  initialParams.forEach((value, key) => {
    const field = filterForm.elements[key];
    if (field) field.value = value;
  });
  if (hashCategory) {
    const categoryField = filterForm.elements.category;
    if (categoryField) categoryField.value = hashCategory;
  }

  const load = async () => {
    try {
      const formData = new FormData(filterForm);
      const availability = formData.get('availability');
      const sort = formData.get('sort');
      const params = buildQueryFromForm(formData);
      const queryString = params.toString();
      const nextUrl = queryString ? `?${queryString}` : window.location.pathname;
      window.history.replaceState(null, '', nextUrl);

      const filteredByForm = applyFilters(productsCatalog, formData);
      const sortedItems = applyClientSort(filteredByForm, sort);
      const filteredItems = applyAvailabilityFilter(sortedItems, availability);

      document.getElementById('resultsMeta').textContent = `${filteredItems.length} produkte`;
      renderProducts(filteredItems);

      if (!didInitialCategoryJump) {
        const initialCategory = normalizeCategoryKey(formData.get('category'));
        if (initialCategory) {
          requestAnimationFrame(() => {
            const section = document.getElementById(`showcase-group-${initialCategory}`);
            section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
        didInitialCategoryJump = true;
      }
    } catch (error) {
      document.getElementById('browseProducts').innerHTML = `<p class="muted">${error.message}</p>`;
    }
  };

  let timer;
  const debouncedLoad = () => {
    clearTimeout(timer);
    timer = setTimeout(load, 250);
  };

  filterForm.addEventListener('input', debouncedLoad);
  filterForm.addEventListener('change', load);

  productsCatalog = await loadProductsCatalog();
  await load();
});
