"use strict";

const currency = (total) => parseFloat(Math.round(total * 100) / 100).toFixed(2);
const filterItem = (items, id) => items.filter(item => item.id != id);
const findItem = (items, id) => items.find(item => item.id == id);

const compare = (key, order='asc') => (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    
    const A = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const B = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    comparison = (A > B) ? 1 : -1;
    return (order === 'desc') ? -comparison : comparison;
}

const findByProps = function(items, props, what) {
    let founds = [];
    items.find((item, i) => {
        if (item[props] === what) {
            founds.push(items[i]);
        }            
    })

    return founds;
}


const sortingOrders = [
    {key:"default", value: "Default sorting"}, 
    {key:"popularity", value:"Popularity Products"}, 
    {key:"low-high", value:"Low to High Price"}, 
    {key:"high-low", value:"High to Low Price"}
];

function Product(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
}

function CardProduct(productList, item) {
    
    this.item = item;
   
    const detailTemplate = (item) =>  `
    <div class="detail-container">
        <div class="col-left">
            <img src="${item.image}">
        </div>
        <div class="col-right">
            <div class="info-container">
                <h2 class="info-header">${item.name}</h2>

                <div class="info-price">Price: <span class="price">${item.price}</span></div>
                <div class="info-shipping">Free shipping</div>
                
                <div class="info-button to-cart" data-id="${item.id}">
                    <a href="#!" class="btn btn-submit add-to-cart"><i class="fas fa-cart-plus"></i> Add to Cart</a>
                </div>

                <h2 class="qty-header py-2">Amount:</h2>     
                    
                <div class="qty qty-buttons">
                    <div class="number-input quantity" data-id="${item.id}">
                        <button class="btn btn-dec">-</button>
                        <input class="quantity-result"
                                        type="number" 
                                        value="1"
                                        min="1"
                                        max="10"
                                        required 
                                        />
                        <button class="btn btn-inc">+</button>
                    </div>
                </div>

                <div class="info-description">${item.description}</div>
                <div class="info-link">
                <a class="btn-link far fa-heart add-to-wishlist" href="#!" data-id="${item.id}">&nbsp;Add to wish list</a>
                </div>
            </div>    
        
        </div>
      </div>
    `;
    
    const showButton = item.querySelector(".show-details");
    const dialog = document.querySelector("dialog");
    const closeButton = dialog.querySelector("dialog .close");
    let dialogMain = dialog.querySelector("dialog .dialog-main");
    
    function renderModal(modal) {
        modal.querySelector('.btn-inc').addEventListener('click', e => {
            let val = e.target.previousElementSibling.value;
            val++;
            e.target.previousElementSibling.value = val;
        });

        modal.querySelector('.btn-dec').addEventListener('click', e => {
            let val = e.target.nextElementSibling.value;
            if (val > 1) {
                val--;
            }
            e.target.nextElementSibling.value = val;
        });

        let quantityResult = modal.querySelector('.quantity-result');
        let addToCart = modal.querySelector('.add-to-cart');
        
        addToCart.addEventListener('click', e => {
            let id = e.target.closest('.to-cart').dataset.id;
            let product = productList.getProductById(id);
            product = {...product, amount: +quantityResult.value};
            shoppingCart.addItemToCart(product);
        })
    }

    showButton.addEventListener("click", event => {
        let parent = event.target.closest('.product');
        let id = parent.dataset.id;
        dialogMain.innerHTML = detailTemplate(productList.getProductById(id))
        dialog.showModal();
        renderModal(dialogMain)
    });
    
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    const addToCartButton = this.item.querySelector('.add-to-cart');

    addToCartButton.addEventListener('click', this);
    
    this.handleEvent = function(event) {
        let parent = event.target.closest('.product');
        let id = parent.dataset.id;
        let product = productList.getProductById(id);
        product = {...product, amount: 1};
        shoppingCart.addItemToCart(product);
    } 
}

function Cart(tax = 0.07, shipping = 0) {

    this.tax = tax;
    this.shipping = shipping;

    const store = new Store();

    let cart = store.init('basket');

    this.saveCart = function() {
        store.set('basket', cart);
        cartAmount.textContent = shoppingCart.totalAmount();
    }

    function Item (id, price, amount) {
        this.id = id;
        this.price = price;
        this.amount = amount;
    }

    const cartItemTemplate = (item, product) => `
    <div class="row cart-item" id="id${product.id}">
        <div class="cell"><img src="${product.image}" alt="${product.name}" height="30"></div>
        <div class="cell">${product.name}</div>
        <div class="cell"><span class="product-price price">${product.price}</span></div>

        <div class="cell">
            <div class="number-input quantity" data-id="${product.id}">
                <button class="btn btn-dec">-</button>
                <input class="quantity-result"
                                type="number" 
                                value="${item.amount}"
                                min="1"
                                max="10"
                                required 
                                />
                <button class="btn btn-inc">+</button>
            </div>
        </div>

        <div class="cell"><span class="product-subtotal price">0</span></div>
        <div class="cell"><a href="#!" data-id="${product.id}" class="fas fa-trash-alt"></a></div>
    </div>
    `;

    const findItem = (items, id) => items.find(item => item.id == id);

    this.populateShoppingCart = (products) => {
        let result = `
        <div class="row header">
            <div class="cell">Cover</div>
            <div class="cell">Product</div>
            <div class="cell">Price</div>
            <div class="cell">Quantity</div>
            <div class="cell">Total</div>
            <div class="cell">Action</div>
        </div>
        `;

        cart.forEach(item => result += cartItemTemplate(item, findItem(products, item.id)));
        return result;
    }

    this.setCartTotal = function(shoppingCartItems) {
        let tmpTotal = 0;
        let subTotal = 0;

        cart.map(item => {
            let price = shoppingCartItems.querySelector(`#id${item.id} .product-price`).textContent;
            tmpTotal = +price * item.amount;
            shoppingCartItems.querySelector(`#id${item.id} .product-subtotal`).textContent = parseFloat(tmpTotal).toFixed(2);
            subTotal += parseFloat(tmpTotal).toFixed(2);
        });

        document.querySelector('.cart-subtotal').textContent = this.totalInCart();
        document.querySelector('.cart-tax').textContent = this.tax;
        document.querySelector('.cart-shipping').textContent = this.shipping;
        document.querySelector('.cart-total').textContent = (+this.totalInCart() + +this.tax + +this.shipping).toFixed(2);
    }
    
    this.addItemToCart = function(product) {

        let inCart = cart.some(item => item.id === product.id);

        if(inCart) {
            let index = cart.findIndex(item => item.id === product.id);
            cart[index].amount += product.amount;
        } else {
            let item = new Item(product.id, product.price, product.amount);
            cart.push(item);
        }

        this.saveCart();
    }

    this.setCountForItem = function(id, amount) {
        for (let i in cart) {
            if(cart[i].id === id) {
                cart[i].amount = amount;
            }
        }
    }

    this.totalAmount = function() {
        let total = 0;
        for (let item in cart) {
            total += cart[item].amount;
        }
        return total;
    }

    this.totalInCart = function() {
        let total = 0;
        for (let item in cart) {
            total += cart[item].price * cart[item].amount;
        }
        return currency(total*(1 + this.tax) + this.shipping);
    }

    this.removeItemFromCart = function(id) {
        for (let item in cart) {
            if (cart[item].id === id) {
                cart[item].amount--;
                if (cart[item].amount === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        this.saveCart();
    }

    this.removeAllItemFromCart = function(id) {
        for (let item in cart) {
            if (cart[item].id === id) {
                cart.splice(item, 1);
                break;
            }
        }
        this.saveCart();
    }

    this.clearCart = function() {
        cart = [];
        this.saveCart();
    }

    this.renderCart = function(shoppingCartItems) {
        this.setCartTotal(shoppingCartItems)
        shoppingCartItems.addEventListener('click', event => {
            if(event.target.classList.contains('fa-trash-alt')) {
                cart = filterItem(cart, event.target.dataset.id);
                this.setCartTotal(shoppingCartItems)
                this.saveCart();
                event.target.closest('.cart-item').remove();
            } else if (event.target.classList.contains('btn-inc')) {
                let tmp = findItem(cart, event.target.closest('.quantity').dataset.id);
                tmp.amount += 1;
                event.target.previousElementSibling.value = tmp.amount;
                this.setCartTotal(shoppingCartItems)
                this.saveCart();
            } else if (event.target.classList.contains('btn-dec')) {
                let tmp = findItem(cart, event.target.closest('.quantity').dataset.id);

                if(tmp !== undefined && tmp.amount > 1) {
                    tmp.amount -= 1;
                    event.target.nextElementSibling.value = tmp.amount;
                } else {
                    cart = filterItem(cart, event.target.dataset.id);
                    event.target.closest('.cart-item').remove();
                }

                this.setCartTotal(shoppingCartItems)
                this.saveCart();
            }
        })
    }

}

const starsTemplate = (n) => Array(n).fill('&starf;').concat(Array(5 - n).fill('&star;')).join('');

function ProductList(products) {

    this.products = products;

    this.productTemplate = (product) => `
    <article class="product" data-id="${product.id}">
        <div class="icons">
            <a href="#!" class="fas fa-shopping-cart add-to-cart"></a>
            <a href="#!" class="fas fa-heart add-to-wishlist"></a>
            <a href="#!" class="fas fa-eye show-details"></a>
        </div>
        <div class="image">
            <div class="badge bg-${product.badge.bg} ${product.badge.title.toLowerCase()}">${product.badge.title}</div>
            <div class="img-container"><img src="${product.image}" alt="${product.name}"></div>
        </div>
        <div class="content" data-id="${product.id}">
            <h3 class="product-name">${product.name}</h3>
            <span> <span class="price product-price">${product.price}</span></span> <span class="stars">${starsTemplate(product.stars)}</span> 
        </div>
    </article>
    `;

    this.populateProductList = function(products) {
        let content = "";
        products.forEach(item => content += this.productTemplate(item))
        return content;
    }

    this.getProductById = (id) => this.products.find(item => item.id == id);
}

const liElement = (item) => `<li><a class="category-item" href="#!" data-id="${item.id}">${item.name}</a></li>`;

const ulElement = items => {
    let ul = document.createElement('ul');
    ul.setAttribute('class', "list-unstyled categories text-muted");

    let res = '';
    for (let item of items) {
        res += liElement(item);
    }

    ul.innerHTML = res;
    return ul;
}

const distinctSections = items => {
    let mapped = [...items.map(item => item.section)];
    let unique = [...new Set(mapped)];
    return unique;
}

function categoriesCollation(distinct, categories) {
    let result = [];
    let i = 0;
    for (let section of distinct) {
        result[i] = categories.filter(item => item.section === section);
        i++;
    }
    return result;
}

let sectionName = section => {
    let div = document.createElement('div');
    div.setAttribute('class', 'py-2 px-4 bg-dark text-white mb-1');
    div.innerHTML = `<strong class="text-uppercase">${section}</strong>`;
    return div;
}

const populateCategories = (categoryContainer, categories) => {
    let distinct = distinctSections(categories);
    let collation = categoriesCollation(distinct, categories);
    for (let i=0; i<distinct.length; i++) {
        categoryContainer.append(sectionName(distinct[i]));
        categoryContainer.append(ulElement(collation[i]));
    }
}

function renderCategory(productContainer, selector, products) {
    const categoryItems = document.querySelectorAll(selector);
    let productList = new ProductList(products);

    categoryItems.forEach(item => item.addEventListener('click', event => {
        event.preventDefault();

        if (event.target.classList.contains('category-item')) {
            const category = event.target.dataset.id;
            const categoryFilter = items => items.filter(item => item.category == category);
            productContainer.innerHTML = productList.populateProductList(categoryFilter(products));
        } else {
            productContainer.innerHTML = productList.populateProductList(products);
        }

        let productCards = productContainer.querySelectorAll('.product');
        productCards.forEach(item => new CardProduct(item));

    }))
}


const sortingOptions = () => sortingOrders.map(item => `<option value="${item.key}">${item.value}</option>`).join('');

function renderSelect(selectPicker, products, productContainer) {
    selectPicker.innerHTML = sortingOptions();
    let productList = new ProductList(products);

    selectPicker.addEventListener('change', function() {
        switch(this.value) {
            case 'low-high':
                productContainer.innerHTML = productList.populateProductList(products.sort(compare('price', 'asc')))
                break;
            case 'high-low' :
                productContainer.innerHTML = productList.populateProductList(products.sort(compare('price', 'desc')))
                break;
            case 'popularity' :
                productContainer.innerHTML = productList.populateProductList(products.sort(compare('stars', 'desc')))
                break;
            default:
                productContainer.innerHTML = productList.populateProductList(products.sort(compare('id', 'asc')))
        }
        let productCards = productContainer.querySelectorAll('.product');
        productCards.forEach(item => new CardProduct(item));
    });
}

function Store() {

    this.init = function(key) {
        if(!this.isset(key)) {
            this.set(key, []);
        }
        return this.get(key);
    }

    this.isset = function(key) {
        return this.get(key) !== null;
    }

    this.get = function(key) {
        let value = localStorage.getItem(key);
        console.log('Value for key', key, 'is', value);
        return value === null ? null : JSON.parse(value);
    }

    this.set = function(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    }
    
}

const badgeTemplate = (item) => `
<div class="form-check mb-3">
    <input class="form-check-input" type="checkbox" id="id-${item}" value="${item}" name="badge">
    &nbsp; <label class="form-check-label" for="id-${item}">${item}</label>
</div>
`;

const renderList = (products, value) => {
    let filteredProducts = products.filter(product => product.badge.title.includes(value));
    let productList = new ProductList(filteredProducts);
    return productList.populateProductList(filteredProducts);
};

const renderShowOnly = (showOnly, products, productContainer) => {
    let badges = [...new Set([...products.map(item => item.badge.title)].filter(item => item != ''))];
    let productList = new ProductList(products);

    showOnly.innerHTML = badges.map(item => badgeTemplate(item)).join("");
    let checkboxes = showOnly.querySelectorAll('input[name="badge"]');

    let values = [];

    checkboxes.forEach(item => {
        item.addEventListener("change", event => {
            if(event.target.checked) {
                values.push(item.value);
            } else {
                values = values.filter(value => value !== item.value);
            }

            let filteredProducts = products.filter(product => values.some(value => product.badge.title.includes(value)));

            if (values.length === 0) {
                filteredProducts = products;
            }

            productContainer.innerHTML = productList.populateProductList(filteredProducts);

            let productCards = productContainer.querySelectorAll('.product');
            productCards.forEach(item => new CardProduct(item));
        });
    });
};

let shoppingCart = new Cart();

const cartAmount = document.getElementById('cart-amount');
cartAmount.textContent = shoppingCart.totalAmount();

async function fetchData(url) {
    return await fetch(url, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    })
    .then(response => {
        if(response.status >= 400) {
            return response.json().then(err => {
                const error = new Error('Something went wrong!')
                error.data = err
                throw error
            })
        }
        return response.json()
    })
}

function main() {

    const url = "https://my-json-server.typicode.com/TooMuchSoulless/db";
    const productContainer = document.querySelector('.product-container');

    if (productContainer) {
        fetchData(`${url}/products`)
        .then(products => {
            let productList = new ProductList(products);

            productContainer.innerHTML = productList.populateProductList(products);

            let productCards = productContainer.querySelectorAll('.product');

            productCards.forEach(item => new CardProduct(productList, item));

            const sidebar = document.getElementById('sidebar');

            if (sidebar) {
                const categoryContainer = document.getElementById('category-container');

                fetchData(`${url}/categories`)
                .then(categories => {
                    populateCategories(categoryContainer, categories);

                    renderCategory(productContainer, '#category-container', products)
                })
            }

            const selectPicker = document.getElementById('selectpicker');
            if (selectPicker) {
                renderSelect(selectPicker, products, productContainer);
            }

            const showOnly = document.querySelector(".show-only");
            if(showOnly) {
                renderShowOnly(showOnly, products, productContainer);
            }
        });
    }

    const cartPage = document.getElementById('cart-page');
    if(cartPage) {
        const shoppingCartItems = cartPage.querySelector('.cart-main .table');

        fetchData(`${url}/products`)
        .then (products => {
            shoppingCartItems.innerHTML = shoppingCart.populateShoppingCart(products);
            
            shoppingCart.renderCart(shoppingCartItems);
        
            let isAuth = auth => auth ?? false;

            class AuthException extends Error {
                constructor(code, message) {
                    const fullMessage = message ? `${code}: ${message}` : code;
                    super(fullMessage);
                    this.name = code;
                    this.code = code;
                    this.message = fullMessage;
                }

                toString() {
                    return this.message;
                }
            }

            const msgBoxId = document.getElementById('dialogBox');
            
            function showDialog(err) {
                msgBoxId.querySelector('.message').textContent = err;
                msgBoxId.showModal();
            }

            const checkoutButton = document.querySelector('.checkout');

            const closeButton = document.querySelector('.close');

            checkoutButton.addEventListener('click', () => {
                try {
                    if(!isAuth()) {
                        throw new AuthException("FORBIDDEN" , "You don't have access to this page.")
                    } else {
                        window.open("checkout.html");
                    }

                } catch(err) {
                    console.error(err)
                    console.error(err.toString())
                    showDialog(err.toString())
                    closeButton.addEventListener('click', () => {
                        msgBoxId.close();
                    })
                }
            })
        });
    }

    const checkoutPage = document.getElementById('checkout-page');
    if (checkoutPage) {
        const checkoutForm = checkoutPage.getElementById('checkout-form');
        const errorMessages = document.getElementById('errorMessages');

        function displayError(message) {
            errorMessages.innerHTML += `<div class="error">${message}</div>`;
        }

        function isValidEmail(email) {
            return /^[^\s!#$%&'*+/=?^`{|}~-]+@[^\s@\d]+\.[^\s@!#$%&'*+/=?^`{|}~\d]+$/.test(email);
            /*/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);*/
        }

        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const {name, email, address1, address2, city, zipcode} = checkoutForm.elements;

            errorMessages.innerHTML = "";
            if (!name.value.trim()) {
                displayError('Name field is required.')
                return;
            }

            if (!address1.value.trim() || !address2.value.trim()) {
                displayError('Address 1 or Address 2 field is required.')
                return;
            }

            if (!city.value.trim()) {
                displayError('City field is required.')
                return;
            }

            if (!zipcode.value.trim()) {
                displayError('City postcode field is required.')
                return;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                displayError('Please enter a valid email address.')
                return;
            }
        })
    }

    function fetchBestProducts() {
        const url = "https://my-json-server.typicode.com/TooMuchSoulless/db";
        const bestProductsContainer = document.querySelector('.best-products');
    
        if (bestProductsContainer) {
            fetchData(`${url}/products`)
            .then(products => {
                const bestProducts = products.filter(product => product.stars === 5);
                bestProductsContainer.innerHTML = populateProductList(bestProducts);

                let productList = new ProductList(products);

                const productCards = bestProductsContainer.querySelectorAll('.product');
                productCards.forEach(item => new CardProduct(productList, item));
            });
        }
    }

    function populateProductList(products) {
        let content = "";
        products.forEach(item => content += productTemplate(item));
        return content;
    }

    const productTemplate = (product) => `
        <article class="product" data-id="${product.id}">
            <div class="icons">
                <a href="#!" class="fas fa-shopping-cart add-to-cart"></a>
                <a href="#!" class="fas fa-heart add-to-wishlist"></a>
                <a href="#!" class="fas fa-eye show-details"></a>
            </div>
            <div class="image">
                <div class="badge bg-${product.badge.bg} ${product.badge.title.toLowerCase()}">${product.badge.title}</div>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="content" data-id="${product.id}">
                <h3 class="product-name">${product.name}</h3>
                <span> <span class="price product-price">${product.price}</span></span> <span class="stars">${starsTemplate(product.stars)}</span> 
            </div>
        </article>
    `;

    fetchBestProducts();

    function CardProduct(productList, item) {
        this.item = item;
    
        const detailTemplate = (item) =>  `
        <div class="detail-container">
            <div class="col-left">
                <img src="${item.image}">
            </div>
            <div class="col-right">
                <div class="info-container">
                    <h2 class="info-header">${item.name}</h2>

                    <div class="info-price">Price: <span class="price">${item.price}</span></div>
                    <div class="info-shipping">Free shipping</div>
                    
                    <div class="info-button to-cart" data-id="${item.id}">
                        <a href="#!" class="btn btn-submit add-to-cart"><i class="fas fa-cart-plus"></i> Add to Cart</a>
                    </div>

                    <h2 class="qty-header py-2">Amount:</h2>     
                        
                    <div class="qty qty-buttons">
                        <div class="number-input quantity" data-id="${item.id}">
                            <button class="btn btn-dec">-</button>
                            <input class="quantity-result"
                                            type="number" 
                                            value="1"
                                            min="1"
                                            max="10"
                                            required 
                                            />
                            <button class="btn btn-inc">+</button>
                        </div>
                    </div>

                    <div class="info-description">${item.description}</div>
                    <div class="info-link">
                    <a class="btn-link far fa-heart add-to-wishlist" href="#!" data-id="${item.id}">&nbsp;Add to wish list</a>
                    </div>
                </div>    
            
            </div>
        </div>
        `;
    
        const showButton = item.querySelector(".show-details");
        const dialog = document.querySelector("dialog");
        const closeButton = dialog.querySelector(".close");
        let dialogMain = dialog.querySelector(".dialog-main");
    
        function renderModal(modal) {
            modal.querySelector('.btn-inc').addEventListener('click', e => {
                let val = e.target.previousElementSibling.value;
                val++;
                e.target.previousElementSibling.value = val;
            });
    
            modal.querySelector('.btn-dec').addEventListener('click', e => {
                let val = e.target.nextElementSibling.value;
                if (val > 1) {
                    val--;
                }
                e.target.nextElementSibling.value = val;
            });
    
            let quantityResult = modal.querySelector('.quantity-result');
            let addToCart = modal.querySelector('.add-to-cart');
            
            addToCart.addEventListener('click', e => {
                let id = e.target.closest('.to-cart').dataset.id;
                let product = productList.getProductById(id);
                product = {...product, amount: +quantityResult.value};
                shoppingCart.addItemToCart(product);
            })
        }
    
        function showModal(event) {
            let parent = event.target.closest(".product");
            let id = parent.dataset.id;
            dialogMain.innerHTML = detailTemplate(productList.getProductById(id));

            const scrollY = window.scrollY;
            const offsetY = parent.getBoundingClientRect().top + scrollY;

            dialog.style.top = `${offsetY}px`;

            dialog.showModal();

            window.scrollTo(0, scrollY);

            renderModal(dialogMain);
        }
    
        showButton.addEventListener("click", showModal);
        closeButton.addEventListener("click", () => dialog.close());
    
        const addToCartButton = this.item.querySelector(".add-to-cart");
    
        addToCartButton.addEventListener("click", this);
    
        this.handleEvent = function (event) {
            let parent = event.target.closest(".product");
            let id = parent.dataset.id;
            let product = productList.getProductById(id);
            product = { ...product, amount: 1 };
            shoppingCart.addItemToCart(product);
        };
    }

}

(function initQItems() {
    const arrows = document.querySelectorAll('.arrow');

    arrows.forEach(function(arrow) {
        arrow.addEventListener('click', function() {
            const qTextInner = this.parentElement.querySelector('.q-text-inner');

            qTextInner.classList.toggle('open');

            const arrowImg = this.querySelector('img');
            arrowImg.classList.toggle('open');
        });
    });
    
})();

const template = document.createElement('template');

template.innerHTML = `
<footer>
    <div class="container page-footer">
        <section class="footer-main">
            <div class="footer-main-item">
                <h2 class="footer-title">ABOUT</h2>
                <ul>
                    <li><a href="https://toomuchsoulless.github.io/about.html#materials">Materials</a></li>
                    <li><a href="https://toomuchsoulless.github.io/about.html#warranty">Warranty</a></li>
                    <li><a href="https://toomuchsoulless.github.io/about.html#customers">Customers</a></li>
                    <li><a href="./blog.html">Blog</a></li>
                </ul>
            </div>

            <div class="footer-main-item">
                <h2 class="footer-title">CUSTOMER CARE</h2>
                <ul>
                    <li><a href="https://toomuchsoulless.github.io/faq.html#sizing">Sizing</a></li>
                    <li><a href="https://toomuchsoulless.github.io/faq.html#shipping">Shipping</a></li>
                    <li><a href="https://toomuchsoulless.github.io/faq.html#returns">Returns</a></li>
                    <li><a href="https://toomuchsoulless.github.io/faq.html#certification">Certification</a></li>
                </ul>
            </div>

            <div class="footer-main-item">
                <h2 class="footer-title">SOCIALS</h2>
                <ul>
                    <li><a href="https://www.instagram.com/instagram/?hl=uk"><i class="fab fa-instagram social-media"></i> Instagram</a></li>
                    <li><a href="https://www.facebook.com/facebookIndia"><i class="fab fa-facebook social-media"></i> Facebook</a></li>
                    <li><a href="https://www.pinterest.com.au/"><i class="fab fa-pinterest"></i> Pinterest</a></li>
                    <li><a href="./exercises/index.html">My Exercises</a></li>
                </ul>
            </div>
        </section>

        <section class="footer-legal px-2">
            <ul class="footer-legal-list">
                <a href="index.html" class="brand mr-5"><img src="./logo-2.png" alt="Logo" width="150"></a>

                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#"> &copy; 2024 Copyright Hermosa Inc.</a></li>
            </ul>
        </section>
    </div>
</footer>
`;

let clone = template.content.cloneNode(true);
document.body.appendChild(clone)

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        main();
    })
} else {
    main();
}