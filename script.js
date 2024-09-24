// script.js

const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Initialize the cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    updateCartIcon();
    saveCart();
}

// Function to update the cart icon
function updateCartIcon() {
    const cartIcon = document.getElementById('lg-bag');
    if (cartIcon) {
        cartIcon.innerHTML = `<a href="cart.html"><i class="far fa-shopping-bag"></i>(${cart.length})</a>`;
    }
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to generate WhatsApp link and open it
function checkout() {
    const whatsappNumber = '254712345678'; // Replace with your WhatsApp number
    const orderDetails = cart.map(item => `${item.name} (x${item.quantity}) - KES ${item.price * item.quantity}`).join('%0A');
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=Order%20Details:%0A${orderDetails}%0A%0ATotal:%20KES%20${total}`;
    window.open(whatsappLink, '_blank');
}

// Add event listeners to the cart buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.closest('.pro');
            const name = product.querySelector('h5').textContent;
            const price = parseFloat(product.querySelector('h4').textContent.replace('KES. ', ''));
            const image = product.querySelector('img').src;
            addToCart(name, price, image);
        });
    });

    updateCartIcon();
});