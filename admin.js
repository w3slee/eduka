// admin.js

// Initialize products from localStorage or create an empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList').getElementsByTagName('tbody')[0];
const totalProductsElement = document.getElementById('totalProducts');
const averagePriceElement = document.getElementById('averagePrice');
const mostExpensiveProductElement = document.getElementById('mostExpensiveProduct');

// Function to save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to render the product list
function renderProductList() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const row = productList.insertRow();
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
    });
}

// Function to update analytics
function updateAnalytics() {
    totalProductsElement.textContent = products.length;

    const totalPrice = products.reduce((sum, product) => sum + parseFloat(product.price), 0);
    const averagePrice = products.length > 0 ? (totalPrice / products.length).toFixed(2) : 0;
    averagePriceElement.textContent = averagePrice;

    const mostExpensiveProduct = products.reduce((max, product) => 
        parseFloat(product.price) > parseFloat(max.price) ? product : max, 
        { name: 'None', price: 0 }
    );
    mostExpensiveProductElement.textContent = `${mostExpensiveProduct.name} ($${mostExpensiveProduct.price})`;
}

// Function to add or update a product
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productId = document.getElementById('productId').value;
    const product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        description: document.getElementById('productDescription').value
    };

    if (productId) {
        // Update existing product
        products[productId] = product;
    } else {
        // Add new product
        products.push(product);
    }

    saveProducts();
    renderProductList();
    updateAnalytics();
    productForm.reset();
    document.getElementById('productId').value = '';
});

// Function to edit a product
function editProduct(index) {
    const product = products[index];
    document.getElementById('productId').value = index;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
}

// Function to delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProductList();
    updateAnalytics();
}

// Initial render
renderProductList();
updateAnalytics();