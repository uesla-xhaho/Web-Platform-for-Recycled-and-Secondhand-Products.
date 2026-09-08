const PRODUCTS_DATA_PATH = '/assets/data/products.json';
const PINNED_MAKERS = [
  {
    name: 'Tereze Gega',
    birthplace: 'Lezhe',
    image: './assets/images/tereza.jpg',
    count: 5,
    info: 'Mjeshtre e artizanatit te Zadrimes',
    featuredPriority: 1,
  },
  {
    name: 'Estefania',
    birthplace: 'Tirane',
    image: './assets/images/artisan1.jpg',
    count: 1,
    info: 'Aksesore upcycled me metale te ricikluara',
    featuredPriority: 1,
  },
  {
    name: 'Arben Spahiu',
    birthplace: 'Gjirokaster',
    image: './assets/images/druri5.jpg',
    count: 1,
    info: 'Dizajne industriale nga materiale te ricikluara',
    featuredPriority: 1,
  },
  {
    name: 'Mimoza Koxhaj',
    birthplace: 'Tirane',
    image: './assets/images/jeans.jpg',
    count: 0,
    info: 'Krijuese Re-Art me produkte artizanale te qendrueshme',
    featuredPriority: 1,
  },
];

const formatLek = (value) => {
  const n = Number(value || 0);
  return `Lek ${n.toLocaleString('en-US')} ALL`;
};

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const loadProductsCatalog = async () => {
  const res = await fetch(PRODUCTS_DATA_PATH, { cache: 'no-store' });
  if (!res.ok) throw new Error('Nuk u ngarkuan dot produktet.');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Formati i products.json eshte i pavlefshem.');
  return data;
};

document.addEventListener('DOMContentLoaded', async () => {
  UI.hydrateAuthNav();
  UI.updateCartCount();

  const featuredWrap = document.getElementById('featuredProducts');
  const makersWrap = document.getElementById('featuredMakers');
  const searchForm = document.getElementById('heroSearchForm');
  const searchInput = document.getElementById('heroSearchInput');

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = encodeURIComponent(searchInput.value.trim());
    window.location.href = `./browse.html?search=${query}`;
  });

  try {
    const products = await loadProductsCatalog();
    const featured = products
      .filter((item) => item.featured)
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const fallback = [...products].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const items = (featured.length ? featured : fallback).slice(0, 4);

    featuredWrap.innerHTML = items
      .map(
        (item) => `
          <article class="card">
            <img src="${escapeHtml(item.images?.[0] || 'https://placehold.co/600x400?text=Eco+Product')}" alt="${escapeHtml(item.title)}" />
            <div class="card-body">
              <h4>${escapeHtml(item.title)}</h4>
              <p class="muted">${escapeHtml(item.subcategory)} | ${escapeHtml(item.artisanName)}</p>
              <div class="badges">
                <span class="badge">${UI.slugToCategoryLabel(item.category)}</span>
                <span class="badge">Eco ${escapeHtml(item.ecoImpact)}</span>
              </div>
              <p class="price">${formatLek(item.price)}</p>
              <a class="btn" href="/product?id=${encodeURIComponent(item._id)}">Shiko Produktin</a>
            </div>
          </article>
        `
      )
      .join('');

    if (!items.length) {
      featuredWrap.innerHTML = '<p class="muted">Nuk ka produkte te afishuara ende.</p>';
    }

    const makersMap = new Map();
    products.forEach((item) => {
      const name = String(item.artisanName || '').trim();
      if (!name) return;

      const existing = makersMap.get(name) || {
        name,
        birthplace: String(item.artisanLocation || 'N/A').trim(),
        image: item.images?.[0] || 'https://placehold.co/600x400?text=Artizan',
        count: 0,
        info: '',
        featuredPriority: 0,
      };

      existing.count += 1;
      if (!existing.birthplace || existing.birthplace === 'N/A') {
        existing.birthplace = String(item.artisanLocation || 'N/A').trim();
      }
      if (!existing.image && item.images?.[0]) {
        existing.image = item.images[0];
      }

      makersMap.set(name, existing);
    });

    PINNED_MAKERS.forEach((maker) => {
      const existing = makersMap.get(maker.name) || {
        name: maker.name,
        birthplace: maker.birthplace,
        image: maker.image,
        count: 0,
        info: '',
        featuredPriority: 0,
      };

      existing.birthplace = maker.birthplace || existing.birthplace;
      existing.image = maker.image || existing.image;
      existing.count = Math.max(Number(existing.count || 0), Number(maker.count || 0));
      existing.info = maker.info || existing.info;
      existing.featuredPriority = Math.max(
        Number(existing.featuredPriority || 0),
        Number(maker.featuredPriority || 0)
      );

      makersMap.set(maker.name, existing);
    });

    const makers = Array.from(makersMap.values())
      .sort(
        (a, b) =>
          Number(b.featuredPriority || 0) - Number(a.featuredPriority || 0) ||
          b.count - a.count ||
          a.name.localeCompare(b.name)
      )
      .slice(0, 4);

    if (makersWrap) {
      makersWrap.innerHTML = makers
        .map(
          (maker) => {
            const makerName = String(maker.name || '')
              .trim()
              .toLowerCase();
            const profileHref =
              makerName === 'tereze gega'
                ? '/artisan?maker=tereze-gega&public=1'
                : makerName === 'estefania'
                  ? '/artisan?maker=estefania&public=1'
                  : makerName === 'arben spahiu'
                    ? '/artisan?maker=arben-spahiu&public=1'
                    : makerName === 'mimoza koxhaj'
                      ? '/artisan?maker=mimoza-koxhaj&public=1'
                  : `/browse?search=${encodeURIComponent(maker.name)}`;

            return `
            <article class="card maker-card">
              <img src="${escapeHtml(maker.image)}" alt="${escapeHtml(maker.name)}" />
              <div class="card-body">
                <h4>${escapeHtml(maker.name)}</h4>
                <p class="muted">Vendlindja | ${escapeHtml(maker.birthplace)}</p>
                ${maker.info ? `<p class="muted">${escapeHtml(maker.info)}</p>` : ''}
                <div class="badges">
                  <span class="badge">${maker.count} produkte</span>
                </div>
                <a class="btn" href="${profileHref}">Shiko Krijimet</a>
              </div>
            </article>
          `;
          }
        )
        .join('');

      if (!makers.length) {
        makersWrap.innerHTML = '<p class="muted">Nuk ka artizane te afishuar ende.</p>';
      }
    }
  } catch (error) {
    featuredWrap.innerHTML = `<p class="muted">${error.message}</p>`;
    if (makersWrap) makersWrap.innerHTML = `<p class="muted">${error.message}</p>`;
  }
});
