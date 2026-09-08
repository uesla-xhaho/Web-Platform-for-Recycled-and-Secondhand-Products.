const LOCAL_ARTISAN_EMAIL = 'terezagega@gmail.com';
const TEREZE_MAKER_SLUG = 'tereze-gega';
const PRODUCTS_DATA_PATH = '/assets/data/products.json';
const LOCAL_PRODUCTS_KEY = 'local_artisan_products';
const LOCAL_PRODUCTS_VERSION_KEY = 'local_artisan_products_version';
const LOCAL_PRODUCTS_VERSION = 'tereza-catalog-v2';
const TEREZA_TOTE_COMMENT =
  'E punuar me nj\u00eb struktur\u00eb t\u00eb fort\u00eb prej copash t\u00eb ricikluara, kjo \u00e7ant\u00eb dallohet p\u00ebr nuanc\u00ebn e saj natyrale t\u00eb tok\u00ebs. Detaji qendror \u00ebsht\u00eb nj\u00eb brez i thurur me motive gjeometrike, i cili \u00ebsht\u00eb marr\u00eb nga pjes\u00eb t\u00eb mbetura t\u00eb kostumeve tradicionale, duke u shnd\u00ebrruar n\u00eb nj\u00eb element modern dhe shum\u00eb praktik p\u00ebr p\u00ebrdorim t\u00eb p\u00ebrditsh\u00ebm.';
const TEREZA_TRADITIONAL_BAG_COMMENT =
  'Kjo \u00e7ant\u00eb krahu \u00ebsht\u00eb nj\u00eb fest\u00eb ngjyrash e krijuar t\u00ebr\u00ebsisht nga fijet e mbetura t\u00eb leshit dhe pambukut. \u00c7do fije e ricikluar \u00ebsht\u00eb thurur me kujdes p\u00ebr t\u00eb krijuar nj\u00eb mozaik teksturash, nd\u00ebrsa rripi i g\u00ebrshetuar tregon mjesht\u00ebrin\u00eb e dor\u00ebs q\u00eb kthen \"mbetjet\" n\u00eb nj\u00eb aksesor unik dhe plot jet\u00eb.';
const TEREZA_STRIPED_BAG_COMMENT =
  'Nj\u00eb shembull i shk\u00eblqyer i upcycling, kjo \u00e7ant\u00eb p\u00ebrdor kombinimin e copave t\u00eb forta t\u00eb ricikluara me shirita shum\u00ebngjyr\u00ebsh q\u00eb krijojn\u00eb nj\u00eb kontrast vizual t\u00eb fort\u00eb. Doreza e gjer\u00eb \u00ebsht\u00eb e dizajnuar p\u00ebr komoditet, duke treguar se materialet e rip\u00ebrdorura mund t\u00eb ofrojn\u00eb t\u00eb nj\u00ebjt\u00ebn cil\u00ebsi (apo edhe m\u00eb t\u00eb lart\u00eb) se produktet e reja industriale.';
const TEREZA_DECORATIVE_PILLOW_COMMENT =
  'Ky jast\u00ebk \u00ebsht\u00eb krijuar nga bashkimi i copave t\u00eb mbetura t\u00eb m\u00ebndafshit dhe pambukut t\u00eb thurur n\u00eb tezgjah. Duke p\u00ebrdorur mbetje tekstile n\u00eb nuanca t\u00eb ndezura si portokallia, jeshilja dhe e verdha, ky produkt tregon se si riciklimi mund t\u00eb sjell\u00eb ngroht\u00ebsi dhe art n\u00eb \u00e7do ambient sht\u00ebpiak, pa pasur nevoj\u00eb p\u00ebr materiale t\u00eb reja.';
const TEREZA_FEATURED_COMMENT =
  'Kjo \u00e7ant\u00eb \u00ebsht\u00eb nj\u00eb kryevep\u00ebr e rip\u00ebrdorimit t\u00eb tekstilit. E krijuar nga p\u00eblhur\u00eb pambuku t\u00eb ricikluar, ajo \u00ebsht\u00eb zbukuruar me rruaza dhe xhufka shum\u00ebngjyr\u00ebshe q\u00eb vijn\u00eb nga mbetje artizanale. Shiriti i q\u00ebndisur n\u00eb fund i jep nj\u00eb karakter urban ndryshe, duke e b\u00ebr\u00eb aksesorin perfekt p\u00ebr dik\u00eb q\u00eb k\u00ebrkon stil dhe q\u00ebndrueshm\u00ebri.';
const LOCAL_STATS_BOOST = {
  products: 4,
  lowStock: 3,
  revenue: 6,
  orders: 5,
};

const defaultLocalProducts = [
  {
    _id: 'local-1',
    title: '\u00c7anta tote',
    category: 'upcycled',
    stock: 7,
    price: 45.0,
    image: './assets/images/t1.jpg',
    comment: TEREZA_TOTE_COMMENT,
  },
  {
    _id: 'local-2',
    title: '\u00c7ant\u00eb me motive tradicionale',
    category: 'upcycled',
    stock: 5,
    price: 42.0,
    image: './assets/images/t2.jpg',
    comment: TEREZA_TRADITIONAL_BAG_COMMENT,
  },
  {
    _id: 'local-3',
    title: '\u00c7anta me dizajn shiritash',
    category: 'upcycled',
    stock: 6,
    price: 30.0,
    image: './assets/images/t3.jpg',
    comment: TEREZA_STRIPED_BAG_COMMENT,
  },
  {
    _id: 'local-4',
    title: 'Jast\u00ebku Dekorativ "Zadrima"',
    category: 'upcycled',
    stock: 2,
    price: 39.0,
    image: './assets/images/t4.jpg',
    comment: TEREZA_DECORATIVE_PILLOW_COMMENT,
  },
  {
    _id: 'local-5',
    title: '\u00c7anta Etnike Moderne',
    category: 'upcycled',
    stock: 8,
    price: 35.0,
    image: './assets/images/0.jpg',
    comment: TEREZA_FEATURED_COMMENT,
  },
];

const localOrders = [
  {
    id: 'ORD-1001',
    customer: { name: 'Elona K' },
    myItems: [{ quantity: 2, total: 49.8 }],
    orderStatus: 'processing',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-1002',
    customer: { name: 'Ardit P' },
    myItems: [{ quantity: 1, total: 64.0 }],
    orderStatus: 'shipped',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-1003',
    customer: { name: 'Sara M' },
    myItems: [{ quantity: 1, total: 31.0 }],
    orderStatus: 'pending',
    paymentStatus: 'pending',
  },
  {
    id: 'ORD-1004',
    customer: { name: 'Blerina R' },
    myItems: [{ quantity: 2, total: 84.0 }],
    orderStatus: 'processing',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-1005',
    customer: { name: 'Klea N' },
    myItems: [{ quantity: 1, total: 45.0 }],
    orderStatus: 'delivered',
    paymentStatus: 'paid',
  },
];

const ORDER_STATUS_LABELS = {
  pending: 'Ne pritje',
  processing: 'Ne proces',
  shipped: 'Derguar',
  delivered: 'Dorezuar',
  canceled: 'Anuluar',
  cancelled: 'Anuluar',
};

const PAYMENT_STATUS_LABELS = {
  pending: 'Ne pritje',
  paid: 'Paguar',
  unpaid: 'Pa pagese',
  refunded: 'Rimbursuar',
  failed: 'Deshtuar',
};

const PUBLIC_MAKER_PROFILES = {
  'tereze-gega': {
    slug: 'tereze-gega',
    name: 'Tereze Gega',
    location: 'Lezhe',
    profileImage: './assets/images/tereza.jpg',
    story:
      'Me qender ne Lezhe, Tereze Gega eshte artizania qe i ka dhene jete te re tradites unike te Zadrimes. Punimet e saj, qe variojne nga kostumet popullore te shamitet ikonike, jane vleresuar me cmime nderkombetare.',
    galleryTitle: 'Momente nga Krijimtaria',
    gallery: [
      {
        src: './assets/images/tereza1.jpg',
        alt: 'Tereza ne panair me punimet e saj artizanale',
      },
      {
        src: './assets/images/tereza2.jpg',
        alt: 'Tereza me certifikaten mjeshter',
      },
      {
        src: './assets/images/tereza3.jpg',
        alt: 'Procesi i punes ne tezgjah',
      },
    ],
  },
  estefania: {
    slug: 'estefania',
    name: 'Estefania',
    location: 'Tirane',
    profileImage: './assets/images/artisan1.jpg',
    story:
      'Estefanía, një dizajnerja industriale me profesion, u rikthye në Medellín në vitin 2019 me synimin për të krijuar brandin e saj me mbështetjen e nënës së saj. Nëna e saj u bë partnerja ideale në këtë rrugëtim, duke përmirësuar cilësinë e produkteve përmes thurjes së unazave të aluminit dhe testimit të qëndrueshmërisë së materialit për të zhvilluar një produkt të jashtëzakonshëm.',
    galleryTitle: 'Krijime te Estefanias',
    gallery: [
      {
        src: './assets/images/metalike.jpg',
        alt: 'Cante dore nga unaza alumini te ricikluara',
      },
    ],
  },
  'arben-spahiu': {
    slug: 'arben-spahiu',
    name: 'Arben Spahiu',
    location: 'Gjirokaster',
    profileImage: './assets/images/druri5.jpg',
    story:
      'Arben Spahiu eshte krijues qe fokusohet ne dizajne industriale upcycled, duke transformuar materiale te perdorura ne produkte funksionale dhe estetike per ambientet moderne.',
    galleryTitle: 'Krijime te Arbenit',
    gallery: [
      {
        src: './assets/images/llamba.jpg',
        alt: 'Ambazhur industrial upcycled i Arben Spahiut',
      },
    ],
  },
  'mimoza-koxhaj': {
    slug: 'mimoza-koxhaj',
    name: 'Mimoza Koxhaj',
    location: 'Tirane',
    profileImage: './assets/images/jeans.jpg',
    story:
      'Mimoza Koxhaj eshte krijuese e Re-Art me fokus ne punime artizanale dhe produkte te qendrueshme qe i japin materialeve jete te re.',
    galleryTitle: 'Krijime te Mimozes',
    gallery: [],
  },
};

const PUBLIC_MAKER_REVIEWS = {
  'tereze-gega': [
    {
      author: 'Elona M.',
      rating: 5,
      text: 'Punime shume cilesore dhe unike. Canta qe mora ishte edhe me e bukur ne realitet dhe me perfundime perfekte.',
    },
    {
      author: 'Blerina K.',
      rating: 5,
      text: 'Komunikim shume i mire dhe porosia erdhi shpejt. Produkt autentik, me shpirt artizanal dhe detaje tradicionale.',
    },
    {
      author: 'Sara P.',
      rating: 5,
      text: 'Jam shume e kenaqur. Cilesia e materialeve dhe puna me dore duken qarte. Do porosis perseri pa dyshim.',
    },
    {
      author: 'Arta L.',
      rating: 5,
      text: 'Krijime te mrekullueshme qe ruajne traditen dhe duken moderne njekohesisht. Super eksperienca ne cdo hap.',
    },
  ],
};

const toOrderStatusLabel = (value) => {
  const key = String(value || '')
    .trim()
    .toLowerCase();
  return ORDER_STATUS_LABELS[key] || String(value || '-');
};

const toPaymentStatusLabel = (value) => {
  const key = String(value || '')
    .trim()
    .toLowerCase();
  return PAYMENT_STATUS_LABELS[key] || String(value || '-');
};

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const normalizePersonName = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const enforceArtisan = () => {
  const user = API.getUser();
  if (!user || user.role !== 'artisan') {
    window.location.href = './login.html';
    return false;
  }
  return true;
};

const isLocalArtisanSession = () => {
  const user = API.getUser();
  return (
    !!user &&
    user.role === 'artisan' &&
    String(user.email || '')
      .trim()
      .toLowerCase() === LOCAL_ARTISAN_EMAIL
  );
};

const getPublicMakerSlug = () => {
  const params = new URLSearchParams(window.location.search);
  const maker = String(params.get('maker') || '')
    .trim()
    .toLowerCase();
  const isPublic = String(params.get('public') || '').trim() === '1';
  if (maker && PUBLIC_MAKER_PROFILES[maker]) return maker;
  if (isPublic) return TEREZE_MAKER_SLUG;
  return '';
};

const migrateLocalProducts = (items) => {
  if (!Array.isArray(items)) return { items: [], changed: false };
  let changed = false;

  const next = items.map((item) => {
    const image = String(item?.image || '');
    const isToteTarget =
      item?._id === 'local-1' || image.endsWith('/t1.jpg') || image.endsWith('\\t1.jpg');
    const isTraditionalTarget =
      item?._id === 'local-2' || image.endsWith('/t2.jpg') || image.endsWith('\\t2.jpg');
    const isStripedTarget =
      item?._id === 'local-3' || image.endsWith('/t3.jpg') || image.endsWith('\\t3.jpg');
    const isDecorativePillowTarget =
      item?._id === 'local-4' || image.endsWith('/t4.jpg') || image.endsWith('\\t4.jpg');
    const isFeaturedTarget =
      item?._id === 'local-5' || image.endsWith('/0.jpg') || image.endsWith('\\0.jpg');
    if (
      !isToteTarget &&
      !isTraditionalTarget &&
      !isStripedTarget &&
      !isDecorativePillowTarget &&
      !isFeaturedTarget
    )
      return item;

    let updated = { ...item };

    if (isToteTarget) {
      updated = {
        ...updated,
        title: '\u00c7anta tote',
        image: './assets/images/t1.jpg',
        comment: TEREZA_TOTE_COMMENT,
      };
    }

    if (isTraditionalTarget) {
      updated = {
        ...updated,
        title: '\u00c7ant\u00eb me motive tradicionale',
        image: './assets/images/t2.jpg',
        comment: TEREZA_TRADITIONAL_BAG_COMMENT,
      };
    }

    if (isStripedTarget) {
      updated = {
        ...updated,
        title: '\u00c7anta me dizajn shiritash',
        image: './assets/images/t3.jpg',
        comment: TEREZA_STRIPED_BAG_COMMENT,
      };
    }

    if (isDecorativePillowTarget) {
      updated = {
        ...updated,
        title: 'Jast\u00ebku Dekorativ "Zadrima"',
        image: './assets/images/t4.jpg',
        stock: 2,
        comment: TEREZA_DECORATIVE_PILLOW_COMMENT,
      };
    }

    if (isFeaturedTarget) {
      updated = {
        ...updated,
        title: '\u00c7anta Etnike Moderne',
        image: './assets/images/0.jpg',
        comment: TEREZA_FEATURED_COMMENT,
      };
    }

    if (
      updated.title !== item.title ||
      updated.image !== item.image ||
      Number(updated.stock || 0) !== Number(item.stock || 0) ||
      updated.comment !== item.comment
    ) {
      changed = true;
    }

    return updated;
  });

  return { items: next, changed };
};

const getLocalProducts = () => {
  const localVersion = localStorage.getItem(LOCAL_PRODUCTS_VERSION_KEY);

  if (localVersion !== LOCAL_PRODUCTS_VERSION) {
    const migratedDefaults = migrateLocalProducts(defaultLocalProducts).items;
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(migratedDefaults));
    localStorage.setItem(LOCAL_PRODUCTS_VERSION_KEY, LOCAL_PRODUCTS_VERSION);
    return [...migratedDefaults];
  }

  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]');
    if (Array.isArray(parsed) && parsed.length) {
      const migrated = migrateLocalProducts(parsed);
      if (migrated.changed) {
        localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(migrated.items));
      }
      return migrated.items;
    }
  } catch (error) {
    // ignore and fallback to defaults
  }

  const migratedDefaults = migrateLocalProducts(defaultLocalProducts).items;
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(migratedDefaults));
  localStorage.setItem(LOCAL_PRODUCTS_VERSION_KEY, LOCAL_PRODUCTS_VERSION);
  return [...migratedDefaults];
};

const setLocalProducts = (items) => {
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(items.slice(0, 100)));
};

const formatLek = (value) => {
  const n = Number(value || 0);
  return `Lek ${n.toLocaleString('en-US')} ALL`;
};

const loadProductsCatalog = async () => {
  const res = await fetch(PRODUCTS_DATA_PATH, { cache: 'no-store' });
  if (!res.ok) throw new Error('Nuk u ngarkuan dot produktet.');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Formati i products.json eshte i pavlefshem.');
  return data;
};

const getMakerProfileBySlug = (slug) => {
  return PUBLIC_MAKER_PROFILES[slug] || PUBLIC_MAKER_PROFILES[TEREZE_MAKER_SLUG];
};

const buildLocalSummary = (products, orders) => {
  const lowStockProducts = products.filter((p) => Number(p.stock || 0) <= 3);
  const revenueBase = orders.reduce(
    (sum, order) =>
      sum +
      (order.myItems || []).reduce((lineSum, item) => lineSum + Number(item.total || 0), 0),
    0
  );

  const totalProducts = products.length * LOCAL_STATS_BOOST.products;
  const lowStockCount = lowStockProducts.length * LOCAL_STATS_BOOST.lowStock;
  const revenue = revenueBase * LOCAL_STATS_BOOST.revenue;
  const orderCount = orders.length * LOCAL_STATS_BOOST.orders;

  return {
    totalProducts,
    lowStockCount,
    revenue,
    orderStats: [{ status: 'all', count: orderCount }],
    lowStockProducts,
  };
};

const renderProfile = (profile) => {
  const wrap = document.getElementById('artisanProfile');
  if (!wrap) return;

  const name = escapeHtml(profile?.name || 'Tereze Gega');
  const story = escapeHtml(
    profile?.story ||
      'Artizane e dedikuar me fokus te vecante tek krijimet e qendrueshme dhe riciklimi krijues.'
  );
  const profileImage = escapeHtml(profile?.profileImage || './assets/images/re-art-logo.png');

  wrap.innerHTML = `
    <div class="artisan-profile-media">
      <img
        class="artisan-profile-photo"
        src="${profileImage}"
        alt="Portret i ${name}"
        onerror="this.onerror=null;this.src='./assets/images/re-art-logo.png';"
      />
    </div>
    <div class="artisan-profile-content">
      <p class="pdp-kicker">Krijuese Re-Art</p>
      <h4 class="artisan-profile-name">${name}</h4>
      <p class="artisan-profile-story">${story}</p>
    </div>
  `;
};

const renderGallery = (profile) => {
  const section = document.getElementById('artisanGallerySection');
  const titleEl = document.getElementById('artisanGalleryTitle');
  const grid = document.getElementById('artisanGalleryGrid');
  if (!section || !titleEl || !grid) return;

  const gallery = Array.isArray(profile?.gallery) ? profile.gallery : [];
  if (!gallery.length) {
    section.setAttribute('hidden', 'hidden');
    return;
  }

  section.removeAttribute('hidden');
  titleEl.textContent = profile?.galleryTitle || 'Momente nga Krijimtaria';
  grid.innerHTML = gallery
    .map(
      (item) => `
      <figure class="artisan-gallery-card">
        <img
          class="artisan-gallery-image"
          src="${escapeHtml(item.src || './assets/images/re-art-logo.png')}"
          alt="${escapeHtml(item.alt || 'Krijim artizanal')}"
          loading="lazy"
          onerror="this.onerror=null;this.src='./assets/images/re-art-logo.png';"
        />
      </figure>
    `
    )
    .join('');
};

const renderDashboard = (summary) => {
  const wrap = document.getElementById('artisanSummary');
  wrap.innerHTML = `
    <div class="kpi"><strong>${summary.totalProducts}</strong><div class="muted">Produkte Aktive</div></div>
    <div class="kpi"><strong>${summary.lowStockCount}</strong><div class="muted">Stok i Ulet</div></div>
    <div class="kpi"><strong>${summary.revenue.toFixed(2)} EUR</strong><div class="muted">Te Ardhura</div></div>
    <div class="kpi"><strong>${summary.orderStats.reduce((a, b) => a + b.count, 0)}</strong><div class="muted">Porosi Totale</div></div>
  `;

  document.getElementById('lowStock').innerHTML = summary.lowStockProducts.length
    ? summary.lowStockProducts
        .map(
          (p) => `
        <li class="low-stock-item">
          <img
            class="low-stock-thumb"
            src="${escapeHtml(p.image || './assets/images/re-art-logo.png')}"
            alt="${escapeHtml(p.title)}"
            onerror="this.onerror=null;this.src='./assets/images/re-art-logo.png';"
          />
          <span>${escapeHtml(p.title)} (${p.stock})</span>
        </li>
      `
        )
        .join('')
    : '<li class="low-stock-item">Pa produkte me stok te ulet.</li>';
};

const renderMyProducts = (items, options = {}) => {
  const { localMode = false, readOnly = false } = options;
  const tbody = document.getElementById('artisanProductsBody');

  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="${readOnly ? 6 : 7}">Nuk ka produkte.</td></tr>`;
    return;
  }

  tbody.innerHTML = items
    .map(
      (item) => `
      <tr>
        <td>
          <img
            class="artisan-product-thumb"
            src="${escapeHtml(item.image || './assets/images/re-art-logo.png')}"
            alt="${escapeHtml(item.title)}"
            onerror="this.onerror=null;this.src='./assets/images/re-art-logo.png';"
          />
        </td>
        <td>${escapeHtml(item.title)}</td>
        <td>${escapeHtml(item.category)}</td>
        <td>${Number(item.stock || 0)}</td>
        <td>${UI.formatPrice(item.price)}</td>
        <td class="artisan-product-comment">
          ${item.comment ? escapeHtml(item.comment) : '<span class="muted">Pa koment</span>'}
        </td>
        ${
          readOnly
            ? ''
            : `<td class="artisan-product-actions">
          <button class="btn secondary" data-edit="${escapeHtml(item._id)}">Edit</button>
          <button class="btn danger" data-remove="${escapeHtml(item._id)}">Delete</button>
        </td>`
        }
      </tr>
    `
    )
    .join('');

  if (readOnly) return;

  tbody.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const itemId = String(btn.dataset.edit || '');
      const source = items.find((item) => String(item._id) === itemId);
      if (!source) return;

      const titleInput = window.prompt('Titulli i produktit', String(source.title || ''));
      if (titleInput === null) return;
      const stockInput = window.prompt('Stoku', String(Number(source.stock || 0)));
      if (stockInput === null) return;
      const priceInput = window.prompt('Cmimi', String(Number(source.price || 0)));
      if (priceInput === null) return;

      const nextTitle = String(titleInput || '').trim();
      const nextStock = Number(stockInput);
      const nextPrice = Number(priceInput);

      if (!nextTitle) {
        UI.showToast('Titulli nuk mund te jete bosh.');
        return;
      }

      if (!Number.isFinite(nextStock) || nextStock < 0) {
        UI.showToast('Stoku duhet te jete numer >= 0.');
        return;
      }

      if (!Number.isFinite(nextPrice) || nextPrice < 0) {
        UI.showToast('Cmimi duhet te jete numer >= 0.');
        return;
      }

      try {
        if (localMode) {
          const next = getLocalProducts().map((item) =>
            String(item._id) === itemId
              ? {
                  ...item,
                  title: nextTitle,
                  stock: Math.floor(nextStock),
                  price: nextPrice,
                }
              : item
          );
          setLocalProducts(next);
        } else {
          await API.apiFetch(`/products/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: nextTitle,
              stock: Math.floor(nextStock),
              price: nextPrice,
            }),
          });
        }

        UI.showToast('Produkti u perditesua');
        await loadAll();
      } catch (error) {
        UI.showToast(error.message);
      }
    });
  });

  tbody.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        if (localMode) {
          const next = getLocalProducts().filter((item) => item._id !== btn.dataset.remove);
          setLocalProducts(next);
        } else {
          await API.apiFetch(`/products/${btn.dataset.remove}`, { method: 'DELETE' });
        }

        UI.showToast('Produkti u fshi');
        await loadAll();
      } catch (error) {
        UI.showToast(error.message);
      }
    });
  });
};

const renderPublicProductsCatalog = (items, options = {}) => {
  const { hideGroupLabels = false, softZoomOutImages = false } = options;
  const wrap = document.getElementById('publicCatalogGrid');
  if (!wrap) return;

  if (!items.length) {
    wrap.innerHTML = '<p class="muted">Nuk ka produkte te afishuara.</p>';
    return;
  }

  const groups = [
    { key: 'second-hand', label: 'Produkte second-hand' },
    { key: 'upcycled', label: 'Produkte te Ricikluara' },
  ];

  const sections = groups
    .map((group) => {
      const groupItems = items.filter((item) => String(item.category || '').toLowerCase() === group.key);
      if (!groupItems.length) return '';

      const cards = groupItems
        .map((item) => {
          const image = item.images?.[0] || item.image || './assets/images/re-art-logo.png';
          const imageClass = [
            softZoomOutImages ? 'is-soft-zoom-out' : '',
            /(?:^|[\\/])goma\.jpg(?:$|[?#])/i.test(String(image || '')) ? 'is-zoom-out-more' : '',
          ]
            .filter(Boolean)
            .join(' ');
          const soldOut = Number(item.stock || 0) <= 0;
          return `
            <article class="showcase-card">
              <a href="/product?id=${encodeURIComponent(item._id)}" class="showcase-card-link">
                <div class="showcase-image-wrap">
                  <img
                    class="${imageClass}"
                    src="${escapeHtml(image)}"
                    alt="${escapeHtml(item.title)}"
                  />
                  ${soldOut ? '<span class="sold-badge">I shitur</span>' : ''}
                </div>
                <h3>${escapeHtml(item.title)}</h3>
                <p class="showcase-price">${formatLek(item.price)}</p>
              </a>
            </article>
          `;
        })
        .join('');

      return `
        <section class="showcase-group">
          ${
            hideGroupLabels ? '' : `<h3 class="showcase-group-title">${group.label} (${groupItems.length})</h3>`
          }
          <div class="showcase-grid">
            ${cards}
          </div>
        </section>
      `;
    })
    .join('');

  wrap.innerHTML = sections || '<p class="muted">Nuk ka produkte te afishuara.</p>';
};

const renderPublicReviews = (makerSlug) => {
  const section = document.getElementById('publicReviewsSection');
  const list = document.getElementById('publicReviewsList');
  if (!section || !list) return;

  const reviews = PUBLIC_MAKER_REVIEWS[makerSlug] || [];
  if (!reviews.length) {
    section.setAttribute('hidden', 'hidden');
    list.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');
  list.innerHTML = reviews
    .map((review) => {
      const rating = Math.max(1, Math.min(5, Number(review.rating || 5)));
      const stars = '★'.repeat(rating);
      return `
        <article class="artisan-review-card">
          <div class="artisan-review-head">
            <strong>${escapeHtml(review.author || 'Klient')}</strong>
            <span class="artisan-review-stars" aria-label="${rating} yje">${stars}</span>
          </div>
          <p>${escapeHtml(review.text || '')}</p>
        </article>
      `;
    })
    .join('');
};

const renderMyOrders = (items) => {
  const tbody = document.getElementById('artisanOrdersBody');

  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="5">Nuk ka porosi.</td></tr>';
    return;
  }

  tbody.innerHTML = items
    .map(
      (order) => `
      <tr>
        <td>${escapeHtml(order.id)}</td>
        <td>${escapeHtml(order.customer?.name || '-')}</td>
        <td>${(order.myItems || []).reduce((s, i) => s + Number(i.quantity || 0), 0)}</td>
        <td>${escapeHtml(toOrderStatusLabel(order.orderStatus))}</td>
        <td>${escapeHtml(toPaymentStatusLabel(order.paymentStatus))}</td>
      </tr>
    `
    )
    .join('');
};

const loadAll = async ({ publicView = false, makerSlug = '' } = {}) => {
  try {
    const user = API.getUser();
    if (publicView) {
      const profile = getMakerProfileBySlug(makerSlug);
      const isCompactPublicProfile = ['estefania', 'arben-spahiu'].includes(
        String(profile?.slug || '')
      );
      renderProfile(profile);
      if (isCompactPublicProfile) {
        document.getElementById('artisanGallerySection')?.setAttribute('hidden', 'hidden');
      } else {
        renderGallery(profile);
      }
      const catalogProducts = await loadProductsCatalog();
      const profileNameKey = normalizePersonName(profile.name || '');
      const products = catalogProducts
        .filter(
          (item) =>
            normalizePersonName(item.artisanName || '') === profileNameKey
        )
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      renderPublicProductsCatalog(products, {
        hideGroupLabels: isCompactPublicProfile,
        softZoomOutImages: isCompactPublicProfile,
      });
      renderPublicReviews(profile?.slug || makerSlug);
      document.getElementById('artisanWarning').textContent = '';
      return;
    }

    const ownerProfile = getMakerProfileBySlug(TEREZE_MAKER_SLUG);
    renderProfile(ownerProfile);
    renderGallery(ownerProfile);

    if (isLocalArtisanSession()) {
      const products = getLocalProducts();
      const orders = [...localOrders];
      const summary = buildLocalSummary(products, orders);

      renderDashboard(summary);
      renderMyProducts(products, { localMode: true, readOnly: false });
      renderMyOrders(orders);
      document.getElementById('artisanWarning').textContent = '';
      return;
    }

    const [dashboard, products, orders] = await Promise.all([
      API.apiFetch('/artisan/dashboard'),
      API.apiFetch('/artisan/products'),
      API.apiFetch('/artisan/orders'),
    ]);

    renderDashboard(dashboard.summary);
    renderMyProducts(products.items || [], { localMode: false, readOnly: false });
    renderMyOrders(orders.items || []);
    document.getElementById('artisanWarning').textContent = '';
  } catch (error) {
    document.getElementById('artisanWarning').textContent = error.message;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UI.hydrateAuthNav();
  UI.updateCartCount();

  const makerSlug = getPublicMakerSlug();
  const publicView = Boolean(makerSlug);

  if (publicView) {
    document.body.classList.add('public-artisan-view');
    document.getElementById('artisanSummary')?.setAttribute('hidden', 'hidden');
    document.getElementById('lowStockSection')?.setAttribute('hidden', 'hidden');
    document.getElementById('createProductSection')?.remove();
    document.getElementById('productsSection')?.setAttribute('hidden', 'hidden');
    document.getElementById('publicCatalogSection')?.removeAttribute('hidden');
    document.getElementById('publicReviewsSection')?.setAttribute('hidden', 'hidden');
    document.getElementById('ordersSection')?.setAttribute('hidden', 'hidden');
    document.getElementById('artisanActionsHeader')?.setAttribute('hidden', 'hidden');
    document.getElementById('artisanLogoutBtn')?.setAttribute('hidden', 'hidden');
    const productsTitle = document.getElementById('productsSectionTitle');
    if (productsTitle) productsTitle.textContent = 'Produktet e Krijueses';
    loadAll({ publicView: true, makerSlug });
    return;
  }

  if (!enforceArtisan()) return;
  document.body.classList.remove('public-artisan-view');
  document.getElementById('publicReviewsSection')?.setAttribute('hidden', 'hidden');

  const form = document.getElementById('newProductForm');
  const formWrap = document.getElementById('newProductFormWrap');
  const toggleFormBtn = document.getElementById('toggleNewProductForm');
  const logoutBtn = document.getElementById('artisanLogoutBtn');

  const setProductFormExpanded = (expanded) => {
    if (!formWrap || !toggleFormBtn) return;
    formWrap.hidden = !expanded;
    toggleFormBtn.setAttribute('aria-expanded', String(expanded));
    toggleFormBtn.textContent = expanded ? 'Mbyll formen e produktit' : 'Shto Produkt te Ri';
  };

  setProductFormExpanded(false);

  toggleFormBtn?.addEventListener('click', () => {
    setProductFormExpanded(formWrap?.hidden);
  });

  logoutBtn?.addEventListener('click', () => {
    API.clearSession();
    window.location.href = './login.html';
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fd = new FormData(form);

    try {
      if (isLocalArtisanSession()) {
        const next = getLocalProducts();
        next.unshift({
          _id: `local-${Date.now()}`,
          title: String(fd.get('title') || '').trim() || 'Produkt i ri',
          category: String(fd.get('category') || '').trim() || 'upcycled',
          stock: Number(fd.get('stock') || 0),
          price: Number(fd.get('price') || 0),
          image: './assets/images/re-art-logo.png',
          comment: '',
        });
        setLocalProducts(next);
      } else {
        await API.apiFetch('/products', {
          method: 'POST',
          body: fd,
        });
      }

      UI.showToast('Produkti u krijua');
      form.reset();
      setProductFormExpanded(false);
      await loadAll();
    } catch (error) {
      UI.showToast(error.message);
    }
  });

  loadAll();
});
