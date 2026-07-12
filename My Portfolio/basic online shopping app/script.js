const products = [
  { id: 1, name: "T-Shirt", price: 20, image: "images/shirt.jpg" },
  { id: 2, name: "Jeans", price: 40, image: "images/jeans.jpg" },
  { id: 3, name: "Sneakers", price: 60, image: "images/sneakers.jpg" },
  { id: 4, name: "Hat", price: 15, image: "images/hat.jpg" },
  { id: 5, name: "Watch", price: 120, image: "images/watch.jpg" },
  { id: 6, name: "Jacket", price: 90, image: "images/jacket.jpg" }
];

let cart = [];

// Load cart from local storage
function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Display Products
function displayProducts() {
  const productContainer = document.getElementById('products');
  productContainer.innerHTML = '';
  
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const inCart = cart.find(item => item.id === productId);
  
  if (!inCart) {
    cart.push(product);
    updateCart();
    alert(`${product.name} added to cart!`);
  } else {
    alert(`${product.name} is already in the cart.`);
  }
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <p>${item.name}</p>
          <p>$${item.price}</p>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });
  
  totalDisplay.textContent = total;
  saveCart();
}

// Clear cart
document.getElementById('clear-cart').addEventListener('click', () => {
  if (cart.length === 0) return alert("Cart is already empty!");
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    updateCart();
  }
});

// Initialize app
displayProducts();
loadCart();
