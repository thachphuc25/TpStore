// ===== RENDER HEADER =====
function renderHeader() {
  var headerEl = document.getElementById("header");
  if (!headerEl) return;

  headerEl.innerHTML =
    '<header class="header">' +
    '<div class="container">' +
    '<div class="header-inner">' +
    '<a href="index.html" class="logo">' +
    '<div class="logo-icon">Tp</div>' +
    "<span>TpStore<code style='color:red'>.</code></span>" +
    "</a>" +
    '<form class="header-search" onsubmit="handleHeaderSearch(event)">' +
    '<span class="search-icon">🔍</span>' +
    '<input type="text" id="header-search-input" placeholder="Tìm CPU, RAM, SSD, Card đồ họa...">' +
    "</form>" +
    '<div style="display:flex;align-items:center;gap:0.5rem">' +
    '<a href="cart.html" class="cart-btn">🛒<span class="cart-count">0</span></a>' +
    '<button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>' +
    "</div>" +
    "</div>" +
    '<nav class="header-nav">' +
    '<a href="index.html">Trang chủ</a>' +
    '<a href="products.html">Tất cả sản phẩm</a>' +
    '<a href="products.html?category=cpu">CPU</a>' +
    '<a href="products.html?category=gpu">Card đồ họa</a>' +
    '<a href="products.html?category=laptop">Laptop</a>' +
    '<a href="products.html?category=monitor">Màn hình</a>' +
    '<a href="contact.html">Liên hệ</a>' +
    "</nav>" +
    "</div>" +
    "</header>";

  updateCartCount();
}

function handleHeaderSearch(e) {
  e.preventDefault();
  var q = document.getElementById("header-search-input").value.trim();
  if (q) {
    window.location.href = "products.html?search=" + encodeURIComponent(q);
  }
}

function toggleMobileMenu() {
  var nav = document.querySelector(".header-nav");
  if (nav) {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  }
}

// ===== RENDER FOOTER =====
function renderFooter() {
  var footerEl = document.getElementById("footer");
  if (!footerEl) return;

  footerEl.innerHTML =
    '<footer class="footer">' +
    '<div class="container footer-inner">' +
    '<div class="footer-grid">' +
    "<div>" +
    '<div class="footer-brand">' +
    '<div class="logo-icon">Tp</div>' +
    "<span>TPstore<code style='color:red'>.</code></span>" +
    "</div>" +
    '<p style="font-size:0.875rem;color:var(--muted-fg)">Cung cấp linh kiện PC & Laptop chính hãng với giá tốt nhất. Tư vấn build PC miễn phí.</p>' +
    "</div>" +
    '<div class="footer-col">' +
    "<h4>Linh kiện PC</h4>" +
    "<ul>" +
    '<li><a href="products.html?category=cpu">CPU - Bộ xử lý</a></li>' +
    '<li><a href="products.html?category=gpu">Card đồ họa (GPU)</a></li>' +
    '<li><a href="products.html?category=ram">RAM</a></li>' +
    '<li><a href="products.html?category=ssd">SSD / HDD</a></li>' +
    '<li><a href="products.html?category=mainboard">Mainboard</a></li>' +
    "</ul>" +
    "</div>" +
    '<div class="footer-col">' +
    "<h4>Hỗ trợ</h4>" +
    "<ul>" +
    '<li><a href="contact.html">Liên hệ</a></li>' +
    "<li><span>Chính sách bảo hành</span></li>" +
    "<li><span>Hướng dẫn mua hàng</span></li>" +
    "<li><span>Hướng dẫn build PC</span></li>" +
    "</ul>" +
    "</div>" +
    '<div class="footer-col">' +
    "<h4>Liên hệ</h4>" +
    '<ul class="footer-contact">' +
    "<li>📞 0123 456 789</li>" +
    "<li>📧 info@tpstore.vn</li>" +
    "<li>📍 TP. Hồ Chí Minh, Việt Nam</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    '<div class="footer-bottom">© 2026 TPstore. Bài tập cuối kỳ - Thiết kế Web.</div>' +
    "</div>" +
    "</footer>";
}

// ===== RENDER PRODUCT CARD =====
function renderProductCard(product) {
  var discount = "";
  if (product.originalPrice) {
    var pct = Math.round((1 - product.price / product.originalPrice) * 100);
    discount = '<span class="discount-badge">-' + pct + "%</span>";
  }

  var outOfStock = "";
  if (!product.inStock) {
    outOfStock =
      '<div class="out-of-stock-overlay"><span>Hết hàng</span></div>';
  }

  var originalPriceHtml = "";
  if (product.originalPrice) {
    originalPriceHtml =
      '<span class="product-card-original-price">' +
      formatPrice(product.originalPrice) +
      "</span>";
  }

  return (
    '<a href="product-detail.html?id=' +
    product.id +
    '" class="product-card">' +
    '<div class="product-card-img">' +
    '<img src="' +
    product.image +
    '" alt="' +
    product.name +
    '" loading="lazy">' +
    discount +
    outOfStock +
    "</div>" +
    '<div class="product-card-body">' +
    '<p class="product-card-brand">' +
    product.brand +
    "</p>" +
    '<h3 class="product-card-name">' +
    product.name +
    "</h3>" +
    '<div class="product-card-rating">' +
    '<span class="star">★</span> ' +
    "<span>" +
    product.rating +
    " (" +
    product.reviewCount +
    ")</span>" +
    "</div>" +
    '<div class="product-card-footer">' +
    "<div>" +
    '<span class="product-card-price">' +
    formatPrice(product.price) +
    "</span>" +
    originalPriceHtml +
    "</div>" +
    '<button class="product-card-cart-btn" onclick="event.preventDefault();addToCart(' +
    product.id +
    ')" ' +
    (product.inStock ? "" : "disabled") +
    ">🛒</button>" +
    "</div>" +
    "</div>" +
    "</a>"
  );
}

// ===== RENDER CATEGORY SIDEBAR =====
function renderCategorySidebar(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;

  var html =
    '<nav class="category-sidebar">' +
    '<div class="sidebar-title">📂 Danh mục sản phẩm</div><ul>';

  categories
    .filter(function (c) {
      return c.id !== "all";
    })
    .forEach(function (cat) {
      html +=
        '<li><a href="products.html?category=' +
        cat.id +
        '">' +
        '<span class="cat-icon">' +
        cat.icon +
        "</span> " +
        cat.name +
        "</a></li>";
    });

  html += "</ul></nav>";
  el.innerHTML = html;
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderFooter();
});
