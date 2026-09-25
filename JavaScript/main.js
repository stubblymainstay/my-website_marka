const products = [
    {
        id: 1,
        title: "Кроссовки Kari",
        price: 1500,
        oldPrice: 4500,
        discount: 67,
        rating: 4.7,
        reviews: 198,
        image: "../icons/обувь.png"
    },
    {
        id: 2,
        title: "Шейкер спортивный, 350 мл",
        price: 303,
        oldPrice: 1010,
        discount: 70,
        rating: 4.8,
        reviews: 193,
        image: "../icons/Шейкер.png"
    },
    {
        id: 3,
        title: "Пакеты фасовочные в рулоне на втулке",
        price: 143,
        oldPrice: 1190,
        discount: 88,
        rating: 4.7,
        reviews: 18511,
        image: "../icons/пакеты.png"
    },
    {
        id: 4,
        title: "Бритвенный станок для бритья +26 кассет",
        price: 360,
        oldPrice: 2400,
        discount: 85,
        rating: 4.3,
        reviews: 193,
        image: "../icons/кассеты.png"
    },
    {
        id: 5,
        title: "комплект трусов мужские ",
        price: 650,
        oldPrice: 3800,
        discount: 87,
        rating: 4.9,
        reviews: 50230,
        image: "../icons/трусы.webp"
    },
    {
        id: 6,
        title: "Ручки гелевые синие, набор 12 штук, 0.5 мм",
        price: 131,
        oldPrice: 500,
        discount: 73,
        rating: 4.9,
        reviews: 3203,
        image: "../icons/РУЧКИ.webp"
    },
    {
        id: 7,
        title: "Гель для душа женский, набор 4 шт",
        price: 721,
        oldPrice: 500,
        discount: 85,
        rating: 4.9,
        reviews: 2300,
        image: "../icons/ГЕЛЬ.webp"
    },
    {
        id: 8,
        title: "Конфеты таблетированные Холодок",
        price: 319,
        oldPrice: 4500,
        discount: 78,
        rating: 4.8,
        reviews: 25043,
        image: "../icons/КОНФЕТЫ.webp"
    },
    {
        id: 9,
        title: "Кофейный напиток в стиках 3 в 1 Латте",
        price: 533,
        oldPrice: 3408,
        discount: 84,
        rating: 4.9,
        reviews: 901,
        image: "../icons/КОФЕ.webp"
    },
    {
        id: 10,
        title: "Духи женские MY Perfume Box, набор пробников",
        price: 341,
        oldPrice: 2990,
        discount: 88,
        rating: 4.8,
        reviews: 186603,
        image: "../icons/ДУХИ.webp"
    }
];

const totalBanners = 3;
let currentBanner = 0;

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    card.innerHTML = `
        <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="product-badges">
                <span class="badge">-${product.discount}%</span>
            </div>
        </div>
        <div class="product-info">
            <div class="product-price">
                <span class="price-current">${formatNumber(product.price)} ₽</span>
                <span class="price-old">${formatNumber(product.oldPrice)} ₽</span>
                <span class="price-discount">-${product.discount}%</span>
            </div>
            <div class="product-title">${product.title}</div>
            <div class="product-rating">
                <span class="stars">★</span>
                <span>${product.rating}</span>
                <span>(${formatNumber(product.reviews)} отзывов)</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        console.log('Product clicked:', product.id, product.title);
    });

    return card;
}

function renderProducts() {
    const grid1 = document.getElementById('productsGrid');
    const grid2 = document.getElementById('favoritesProductsGrid');
    const targetGrid = grid1 || grid2;
    
    if (!targetGrid) return;

    targetGrid.innerHTML = '';
    products.forEach(product => {
        targetGrid.appendChild(createProductCard(product));
    });
}

function showBanner(index) {
    const track = document.querySelector('.banner-track');
    if (!track) return;

    if (index < 0) index = totalBanners - 1;
    if (index >= totalBanners) index = 0;

    currentBanner = index;
    track.style.transform = `translateX(-${currentBanner * 100}%)`;
}

let autoplayTimer = null;
const AUTOPLAY_DELAY = 4000;

function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
        showBanner(currentBanner + 1);
    }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}

function initBanner() {
    const leftBtn = document.querySelector('.banner-arrow-left');
    const rightBtn = document.querySelector('.banner-arrow-right');
    const bannerContent = document.querySelector('.banner-content');

    if (leftBtn) {
        leftBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showBanner(currentBanner - 1);
            startAutoplay();
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showBanner(currentBanner + 1);
            startAutoplay();
        });
    }

    if (bannerContent) {
        bannerContent.addEventListener('mouseenter', stopAutoplay);
        bannerContent.addEventListener('mouseleave', startAutoplay);

        let touchStartX = 0;
        let touchEndX = 0;

        bannerContent.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, {passive: true});

        bannerContent.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleTouch();
            startAutoplay();
        }, {passive: true});

        function handleTouch() {
            const swipeThreshold = 40; 
            const diff = touchStartX - touchEndX;

            if (diff > swipeThreshold) {
                showBanner(currentBanner + 1); 
            } else if (diff < -swipeThreshold) {
                showBanner(currentBanner - 1); 
            }
        }
    }

    startAutoplay();
}

function initMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const catalogPopup = document.getElementById('catalogPopup');

    if (menuBtn && catalogPopup) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            catalogPopup.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!catalogPopup.contains(e.target) && e.target !== menuBtn) {
                catalogPopup.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }
}

function initSearch() {
    const input = document.getElementById('searchInput');
    const searchBox = document.getElementById('searchBox');
    const clearBtn = document.getElementById('searchClear');
    const submitBtn = document.getElementById('searchSubmit');
    const searchControls = document.getElementById('searchControls');

    if (!input || !searchBox) return;

    const executeSearch = () => {
        const query = input.value.trim();
        if (query) {
            alert('Поиск: ' + query);
        }
    };

    input.addEventListener('focus', () => {
        searchBox.classList.add('active');
    });

    input.addEventListener('blur', () => {
        searchBox.classList.remove('active');
    });

    searchControls.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus(); 
    });

    submitBtn.addEventListener('click', () => {
        executeSearch();
        input.blur(); 
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
            input.blur();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initMenu();
    initSearch();
    initBanner();
});