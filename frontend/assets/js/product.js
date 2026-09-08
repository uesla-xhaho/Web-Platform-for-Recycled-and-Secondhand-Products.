const PRODUCTS_DATA_PATH = '/assets/data/products.json';

const fallbackProduct = {
  _id: 'demo',
  title: 'Ore Rrote Biciklete',
  subcategory: 'DIZAJNE ME JETE TE DYTE',
  category: 'upcycled',
  artisanName: 'Re-Art',
  artisanLocation: 'Tirane',
  ecoImpact: 'medium',
  materials: [],
  condition: 'not_applicable',
  price: 5700,
  stock: 0,
  description:
    'Ky eshte nje layout demonstrues per faqen e produktit. Ju mund te plotesoni me vone produktet dhe informacionin real sipas nevojes.',
  images: [],
};

const ECO_LUMINA_MORE_DESCRIPTION = `Procesi i Punimit: Nga Mbetja te Ndriçimi
Procesi i krijimit të ambazhurit Eco-Lumina është një udhëtim artizanal që ndjek parimet e upcycling, ku çdo etapë kryhet me dorë për të garantuar cilësinë dhe karakterin unik të produktit.

1. Seleksionimi dhe Grumbullimi
Gjithçka nis me identifikimin e materialeve. Ne bashkëpunojmë me punishte druri dhe fabrika industriale për të mbledhur pjesët e mbetura të drurit (lisi, arra, pisha) dhe mbetjet metalike ose tekstile që përndryshe do të asgjësoheshin. Çdo copë druri zgjidhet për teksturën dhe "historinë" që mbart.

2. Trajtimi Ekologjik
Materialet e grumbulluara pastrohen dhe trajtohen pa përdorur kimikate të dëmshme. Druri thahet në mënyrë natyrale dhe pastrohet nga dëmtuesit, duke ruajtur vrimat ose nyjet natyrale që i japin ambazhurit pamjen e tij skulpturore.

3. Modelimi dhe Prerja (Dizajni Luksoz)
Duke përdorur teknika të kombinuara të prerjes me dorë dhe asaj me precizion (si lazeri për detaje fine), druri merr formën e dëshiruar. Këtu ndodh magjia: mbetjet industriale transformohen në forma gjeometrike ose organike që lejojnë dritën të "shket" nëpër to.

4. Lirimi i Shpirtit të Drurit (Finisimi)
Në vend të llakut industrial, ne përdorim vajra natyralë dhe dyllë blete. Ky hap jo vetëm që mbron mjedisin, por nxjerr në pah fibrat e drurit dhe i jep produktit një ndjesi organike në prekje. Ambazhuri nuk mban erë kimikatesh, por aromën e lehtë të natyrës.

5. Montimi Elektrik i Sigurt
Pjesa teknike realizohet me komponentë të certifikuar, duke përdorur tela të veshur me tekstil (shpesh pambuk i ricikluar) dhe fole llambash që i përshtaten teknologjisë LED. Kjo siguron që "Eco-Lumina" të konsumojë sa më pak energji, duke qëndruar besnik parimeve tona ekologjike.

6. Kontrolli i Cilësisë dhe Paketimi
Çdo ambazhur testohet për sigurinë dhe efektin e dritës. Paketimi bëhet ekskluzivisht me karton të ricikluar dhe pa asnjë element plastike, duke siguruar që produkti të mbërrijë në shtëpinë tuaj me zero mbetje.`;

const TEREZE_PRODUCT_REVIEWS = [
  {
    keywords: ['canta tote', 'cante tote'],
    reviews: [
      {
        author: 'Elona R.',
        rating: 5,
        text: 'Canta tote eshte fantastike. Materiali eshte shume cilesor dhe punimi me dore duket ne cdo detaj.',
      },
      {
        author: 'Blerina H.',
        rating: 5,
        text: 'Produkt shume praktik per perdorim ditor. Ngjyrat dhe motivet tradicionale jane te mrekullueshme.',
      },
      {
        author: 'Arta D.',
        rating: 5,
        text: 'Jam shume e kenaqur me porosine. Canta duket edhe me e bukur ne realitet.',
      },
    ],
  },
  {
    keywords: ['motive tradicionale'],
    reviews: [
      {
        author: 'Mirela K.',
        rating: 5,
        text: 'Model shume elegant dhe unik. Kombinimi i tradites me stilin modern eshte i jashtezakonshem.',
      },
      {
        author: 'Klea P.',
        rating: 5,
        text: 'Punim i paster dhe rezistent. E perdor cdo dite dhe vazhdon te duket si e re.',
      },
      {
        author: 'Sara M.',
        rating: 5,
        text: 'Sherbim shume i mire dhe produkt autentik shqiptar. Rekomandoj pa hezitim.',
      },
    ],
  },
  {
    keywords: ['etnike moderne', 'etnike clutch', 'clutch'],
    reviews: [
      {
        author: 'Diana L.',
        rating: 5,
        text: 'Clutch-i etnik eshte super elegant per evente. Cdo here marr komplimente kur e mbaj.',
      },
      {
        author: 'Anisa T.',
        rating: 5,
        text: 'Detajet jane te mrekullueshme dhe cilesia shume e larte. Ja vlen cdo lek.',
      },
      {
        author: 'Ema G.',
        rating: 5,
        text: 'Produkt unik dhe me karakter. Vjen i paketuar shume bukur dhe me kujdes.',
      },
    ],
  },
  {
    keywords: ['jast', 'zadrima'],
    reviews: [
      {
        author: 'Nora B.',
        rating: 5,
        text: 'Jasteku dekorativ i jep nje ngrohtesi te vecante shtepise. Punim artizanal i mrekullueshem.',
      },
      {
        author: 'Rina C.',
        rating: 5,
        text: 'Ngjyrat jane te gjalla dhe materiali shume i mire. Produkt autentik dhe i vecante.',
      },
      {
        author: 'Ledia S.',
        rating: 5,
        text: 'Duket qarte puna me dore. Jam shume e kenaqur me blerjen.',
      },
    ],
  },
];

const buildGenericProductReviews = (item) => {
  const productTitle = String(item?.title || 'Ky produkt').trim();
  const sellerName = String(item?.artisanName || 'krijuesi').trim();
  const isSecondHand = String(item?.category || '').trim().toLowerCase() === 'second-hand';

  if (isSecondHand) {
    return [
      {
        author: 'Elira D.',
        rating: 5,
        text: `${productTitle} ishte pikerisht si ne foto. Gjendja shume e mire dhe cmim i drejte.`,
      },
      {
        author: 'Klea N.',
        rating: 5,
        text: `Porosia erdhi shpejt dhe produkti dukej i paster e i mirembajtur. Faleminderit ${sellerName}.`,
      },
      {
        author: 'Arta M.',
        rating: 4,
        text: 'Cilesi shume e mire per nje produkt second-hand. Do te blej perseri.',
      },
    ];
  }

  return [
    {
      author: 'Blerina H.',
      rating: 5,
      text: `${productTitle} ka detaje shume te bukura dhe punim cilesor. Duket qe eshte bere me kujdes.`,
    },
    {
      author: 'Sara P.',
      rating: 5,
      text: `Produkt unik dhe ekologjik. Jam shume e kenaqur me blerjen nga ${sellerName}.`,
    },
    {
      author: 'Diona K.',
      rating: 4,
      text: 'Materialet dhe perfundimi jane ne nivel shume te mire. Rekomandohet.',
    },
  ];
};

const toLek = (value) => {
  const n = Number(value || 0);
  return `Lek ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ALL`;
};

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const escapeTextWithBreaks = (value) => escapeHtml(value).replaceAll('\n', '<br />');

const normalizePersonName = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const toDisplayLabel = (value) =>
  String(value ?? '')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());

const categoryLabel = (value) =>
  String(value || '').toLowerCase() === 'second-hand' ? 'Produkte second-hand' : 'Produkte te Ricikluara';

const shouldAvoidMainImageCrop = (src) =>
  /(?:^|[\\/])(metalike|artizan2|artisan3|artisan4)\.jpg(?:$|[?#])/i.test(String(src || ''));

const getMainImageClassName = (src) =>
  `pdp-main-image${shouldAvoidMainImageCrop(src) ? ' is-no-crop' : ''}`;

const shouldSoftZoomRelatedImage = (src) =>
  /(?:^|[\\/])(metalike|artizan2|artisan3|artisan4)\.jpg(?:$|[?#])/i.test(String(src || ''));

const getProductReviews = (item) => {
  const artisanName = normalizePersonName(item?.artisanName || '');
  if (artisanName === 'tereze gega') {
    const title = normalizePersonName(item?.title || '');
    const match = TEREZE_PRODUCT_REVIEWS.find((entry) =>
      entry.keywords.some((keyword) => title.includes(keyword))
    );
    if (match?.reviews?.length) return match.reviews;
  }

  return buildGenericProductReviews(item);
};

const loadProductsCatalog = async () => {
  const res = await fetch(PRODUCTS_DATA_PATH, { cache: 'no-store' });
  if (!res.ok) throw new Error('Nuk u ngarkuan dot produktet.');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Formati i products.json eshte i pavlefshem.');
  return data;
};

const normalizeProduct = (item) => {
  if (!item) return fallbackProduct;
  return {
    ...fallbackProduct,
    ...item,
    price: Number(item.price ?? fallbackProduct.price),
    stock: Number(item.stock ?? fallbackProduct.stock),
  };
};

const renderProductLayout = (item) => {
  const wrap = document.getElementById('productDetail');
  const soldOut = Number(item.stock || 0) <= 0;
  const images = Array.isArray(item.images) && item.images.length ? item.images : ['https://placehold.co/1100x1100?text=Re-Art+Product'];
  const imageSrc = images[0];
  const isEcoLuminaProduct =
    String(item?._id || '').trim() === '26' ||
    String(item?.title || '')
      .trim()
      .toLowerCase()
      .includes('eco-lumina');
  const descriptionMore = isEcoLuminaProduct ? ECO_LUMINA_MORE_DESCRIPTION : '';
  const materialsText = Array.isArray(item.materials) && item.materials.length ? item.materials.join(', ') : 'Nuk ka';
  const conditionText =
    String(item.category || '').toLowerCase() === 'second-hand'
      ? toDisplayLabel(item.condition || 'good')
      : 'N/A';

  document.title = `${item.title} | Re-Art`;

  const sellerLabel =
    String(item.category || '')
      .trim()
      .toLowerCase() === 'second-hand'
      ? 'Shites'
      : 'Artizani';

  wrap.innerHTML = `
    <section class="pdp-left">
      <img id="pdpMainImage" class="${getMainImageClassName(imageSrc)}" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(item.title)}" />
      <div class="pdp-thumbs">
        ${images
          .map(
            (src, index) => `
              <button type="button" class="pdp-thumb ${index === 0 ? 'is-active' : ''}" data-image-index="${index}">
                <img src="${escapeHtml(src)}" alt="${escapeHtml(item.title)} ${index + 1}" />
              </button>
            `
          )
          .join('')}
      </div>
      <div class="pdp-description-block">
        <p class="pdp-description">${escapeTextWithBreaks(item.description || fallbackProduct.description)}</p>
        ${
          descriptionMore
            ? `
        <button id="pdpDescriptionToggle" type="button" class="btn secondary pdp-description-toggle" aria-expanded="false">
          Shiko me shume
        </button>
        <div id="pdpDescriptionMore" class="pdp-description pdp-description-more" hidden>
          ${escapeTextWithBreaks(descriptionMore)}
        </div>
        `
            : ''
        }
      </div>
    </section>

    <section class="pdp-right">
      <p class="pdp-kicker">${escapeHtml(String(item.subcategory || 'DIZAJNE ME JETE TE DYTE').toUpperCase())}</p>
      <h1 class="pdp-title">${escapeHtml(item.title)}</h1>

      <div class="pdp-price-row">
        <span class="pdp-price">${toLek(item.price)}</span>
        <span class="pdp-stock ${soldOut ? 'is-sold-out' : 'is-in-stock'}">${
          soldOut ? 'I shitur' : 'Ne stok'
        }</span>
      </div>

      <p class="pdp-tax">Taksa e perfshire.</p>

      <ul class="pdp-meta-list">
        <li><strong>Kategoria:</strong> ${escapeHtml(categoryLabel(item.category))}</li>
        <li><strong>${sellerLabel}:</strong> ${escapeHtml(item.artisanName || 'Re-Art')}</li>
        <li><strong>Vendndodhja:</strong> ${escapeHtml(item.artisanLocation || 'N/A')}</li>
        <li><strong>Materialet:</strong> ${escapeHtml(materialsText)}</li>
        <li><strong>Gjendja:</strong> ${escapeHtml(conditionText)}</li>
        <li><strong>Eco-impact:</strong> ${escapeHtml(toDisplayLabel(item.ecoImpact || 'medium'))}</li>
      </ul>

      <div class="pdp-qty-block">
        <p class="pdp-qty-label">Sasia</p>
        <div class="pdp-qty-box">
          <button type="button" id="qtyMinus" aria-label="Ule sasine">-</button>
          <span id="qtyValue">1</span>
          <button type="button" id="qtyPlus" aria-label="Rrit sasine">+</button>
        </div>
      </div>

      <button type="button" id="addToCartBtn" class="pdp-btn pdp-btn-outline" ${
        soldOut ? 'disabled' : ''
      }>${soldOut ? 'I shitur' : 'Shto në shportë'}</button>

      <button type="button" class="pdp-btn pdp-btn-primary" ${soldOut ? 'disabled' : ''}>Kryej blerjen</button>

      <a class="pdp-more-payments" href="#">Me shume opsione pagese</a>
    </section>
  `;

  const mainImageEl = document.getElementById('pdpMainImage');
  const thumbButtons = Array.from(document.querySelectorAll('.pdp-thumb'));
  const qtyValue = document.getElementById('qtyValue');
  const minusBtn = document.getElementById('qtyMinus');
  const plusBtn = document.getElementById('qtyPlus');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const descriptionToggleBtn = document.getElementById('pdpDescriptionToggle');
  const descriptionMoreWrap = document.getElementById('pdpDescriptionMore');

  let quantity = 1;
  const maxQty = Math.max(1, Number(item.stock || 1));

  const syncQty = () => {
    qtyValue.textContent = String(quantity);
    minusBtn.disabled = quantity <= 1 || soldOut;
    plusBtn.disabled = quantity >= maxQty || soldOut;
  };

  minusBtn.addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    syncQty();
  });

  plusBtn.addEventListener('click', () => {
    quantity = Math.min(maxQty, quantity + 1);
    syncQty();
  });

  addToCartBtn.addEventListener('click', () => {
    if (soldOut) return;
    UI.addToCart(item, quantity);
  });

  descriptionToggleBtn?.addEventListener('click', () => {
    const expanded = descriptionToggleBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      descriptionToggleBtn.setAttribute('aria-expanded', 'false');
      descriptionToggleBtn.textContent = 'Shiko me shume';
      descriptionMoreWrap?.setAttribute('hidden', 'hidden');
      return;
    }

    descriptionToggleBtn.setAttribute('aria-expanded', 'true');
    descriptionToggleBtn.textContent = 'Shiko me pak';
    descriptionMoreWrap?.removeAttribute('hidden');
  });

  thumbButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.imageIndex || 0);
      const nextImage = images[index] || images[0];
      mainImageEl.src = nextImage;
      mainImageEl.className = getMainImageClassName(nextImage);
      thumbButtons.forEach((thumb) => thumb.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });

  syncQty();
};

const renderProductReviews = (item) => {
  const section = document.getElementById('productReviewsSection');
  const list = document.getElementById('productReviewsList');
  if (!section || !list) return;

  const reviews = getProductReviews(item);
  if (!reviews.length) {
    section.setAttribute('hidden', 'hidden');
    list.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');
  list.innerHTML = reviews
    .map((review) => {
      const rating = Math.max(1, Math.min(5, Number(review.rating || 5)));
      return `
        <article class="pdp-review-card">
          <div class="pdp-review-head">
            <strong>${escapeHtml(review.author || 'Klient')}</strong>
            <span class="pdp-review-stars" aria-label="${rating} yje">${'★'.repeat(rating)}</span>
          </div>
          <p>${escapeHtml(review.text || '')}</p>
        </article>
      `;
    })
    .join('');
};

const renderRelatedProducts = (products, currentProduct) => {
  const wrap = document.getElementById('relatedProducts');
  if (!wrap) return;

  const currentId = String(currentProduct?._id ?? '');
  const currentArtisan = normalizePersonName(currentProduct?.artisanName || '');
  const currentCategory = String(currentProduct?.category || '').toLowerCase();

  const sameArtisan = products.filter(
    (item) =>
      String(item._id) !== currentId &&
      normalizePersonName(item.artisanName || '') === currentArtisan
  );

  const sameCategory = products.filter(
    (item) =>
      String(item._id) !== currentId &&
      !sameArtisan.some((artisanItem) => String(artisanItem._id) === String(item._id)) &&
      String(item.category || '').toLowerCase() === currentCategory
  );

  const otherProducts = products.filter(
    (item) =>
      String(item._id) !== currentId &&
      !sameArtisan.some((artisanItem) => String(artisanItem._id) === String(item._id)) &&
      !sameCategory.some((categoryItem) => String(categoryItem._id) === String(item._id))
  );

  const list = [...sameArtisan, ...sameCategory, ...otherProducts].slice(0, 4);

  if (!list.length) {
    wrap.innerHTML = '<p class="muted">Nuk ka produkte te tjera per momentin.</p>';
    return;
  }

  wrap.innerHTML = list
    .map((item) => {
      const image = item.images?.[0] || 'https://placehold.co/800x600?text=Re-Art+Product';
      const relatedImageClass = shouldSoftZoomRelatedImage(image) ? 'is-soft-zoom-out' : '';
      return `
        <article class="card">
          <img class="${relatedImageClass}" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" />
          <div class="card-body">
            <h4>${escapeHtml(item.title)}</h4>
            <p class="muted">${escapeHtml(item.subcategory || '')} | ${escapeHtml(item.artisanName || '')}</p>
            <p class="price">${toLek(item.price)}</p>
            <a class="btn" href="/product?id=${encodeURIComponent(item._id)}">Shiko Produktin</a>
          </div>
        </article>
      `;
    })
    .join('');
};

document.addEventListener('DOMContentLoaded', async () => {
  UI.hydrateAuthNav();
  UI.updateCartCount();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  let products = [];

  try {
    products = await loadProductsCatalog();
  } catch (error) {
    products = [];
  }

  if (!productId) {
    renderProductLayout(fallbackProduct);
    renderProductReviews(fallbackProduct);
    renderRelatedProducts(products, fallbackProduct);
    return;
  }

  try {
    const item = products.find((product) => String(product._id) === String(productId));

    if (!item) throw new Error('Produkti nuk u gjet.');

    const normalizedItem = normalizeProduct(item);
    renderProductLayout(normalizedItem);
    renderProductReviews(normalizedItem);
    renderRelatedProducts(products, normalizedItem);
  } catch (error) {
    UI.showToast('Produkti nuk u gjet. Po shfaqim faqen demo.');
    renderProductLayout(fallbackProduct);
    renderProductReviews(fallbackProduct);
    renderRelatedProducts(products, fallbackProduct);
  }
});
