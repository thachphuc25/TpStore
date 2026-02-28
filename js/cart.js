// ===== GIỎ HÀNG - localStorage =====

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty) {
  qty = qty || 1;
  var cart = getCart();
  var product = getProductById(productId);
  if (!product || !product.inStock) return;

  var existing = cart.find(function(item) { return item.id === productId; });
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      quantity: qty
    });
  }
  saveCart(cart);
  showToast('Đã thêm "' + product.name + '" vào giỏ hàng');
}

function removeFromCart(productId) {
  var cart = getCart().filter(function(item) { return item.id !== productId; });
  saveCart(cart);
}

function updateCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  var cart = getCart();
  var item = cart.find(function(i) { return i.id === productId; });
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
}

function getCartTotal() {
  return getCart().reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);
}

function getCartItemCount() {
  return getCart().reduce(function(sum, item) {
    return sum + item.quantity;
  }, 0);
}

function updateCartCount() {
  var count = getCartItemCount();
  var badges = document.querySelectorAll(".cart-count");
  badges.forEach(function(el) {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

// ===== TOAST =====
function showToast(message) {
  // Xóa toast cũ nếu có
  var old = document.querySelector(".toast");
  if (old) old.remove();

  var toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(function() {
    toast.remove();
  }, 3000);
}
