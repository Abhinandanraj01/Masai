// Select DOM elements
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productRatingInput = document.getElementById('product-rating');
const addProductButton = document.getElementById('add-product');
const sortPriceButton = document.getElementById('sort-price');
const sortRatingButton = document.getElementById('sort-rating');
const priceGraph = document.getElementById('price-graph');
const ratingGraph = document.getElementById('rating-graph');

// Array to store product data
let products = [];

// Function to create a bar for the graph
function createBar(product, value, className) {
    const bar = document.createElement('div');
    bar.className = 'bar';

    const barDiv = document.createElement('div');
    barDiv.style.width = `${value}px`; // Width represents value
    barDiv.className = className;
    barDiv.textContent = value;

    const label = document.createElement('span');
    label.textContent = product.name;

    bar.appendChild(barDiv);
    bar.appendChild(label);

    return bar;
}

// Function to render the graphs
function renderGraphs() {
    // Clear existing graphs
    priceGraph.innerHTML = '';
    ratingGraph.innerHTML = '';

    // Render price graph
    products.forEach(product => {
        const bar = createBar(product, product.price, 'price-bar');
        priceGraph.appendChild(bar);
    });

    // Render rating graph
    products.forEach(product => {
        const bar = createBar(product, product.rating * 20, 'rating-bar'); // Scale rating for visualization
        ratingGraph.appendChild(bar);
    });
}

// Add product to the list and update graphs
addProductButton.addEventListener('click', () => {
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    const rating = parseFloat(productRatingInput.value);

    if (!name || isNaN(price) || isNaN(rating) || rating < 0 || rating > 5) {
        alert('Please enter valid product data.');
        return;
    }

    products.push({ name, price, rating });

    // Clear inputs
    productNameInput.value = '';
    productPriceInput.value = '';
    productRatingInput.value = '';

    // Render graphs
    renderGraphs();
});

// Sort by price and update graphs
sortPriceButton.addEventListener('click', () => {
    products.sort((a, b) => a.price - b.price);
    renderGraphs();
});

// Sort by rating and update graphs
sortRatingButton.addEventListener('click', () => {
    products.sort((a, b) => b.rating - a.rating); // Descending order for ratings
    renderGraphs();
});
