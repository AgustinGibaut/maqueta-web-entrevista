window.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('accept-cookies');

    // Mostrar banner si no se aceptó cookies
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
        banner.classList.add('show');
    }

    // Aceptar cookies
    btnAccept.addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('cookiesAccepted', 'true');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    let cart = [];

    // Abrir carrito desde el icono
    document.querySelector('.fa-shopping-cart').addEventListener('click', () => {
        cartOverlay.style.display = 'flex';
    });

    // Cerrar carrito
    document.getElementById('close-cart').addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Agregar producto al carrito
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            const product = {
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                img: card.dataset.img,
                quantity: 1
            };

            const existing = cart.find(item => item.name === product.name);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push(product);
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
      `;
            cartItemsContainer.appendChild(div);
        });

        cartTotal.textContent = `$${total.toLocaleString()}`;
        cartCount.textContent = count;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = [];

    // Abrir carrito
    document.querySelectorAll('.fa-shopping-cart').forEach(icon => {
        icon.addEventListener('click', () => {
            cartOverlay.style.display = 'flex';
        });
    });

    // Cerrar carrito
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Agregar producto
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            const imgSrc = card.querySelector('img').getAttribute('src'); // autodetecta imagen
            const product = {
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                img: imgSrc,
                quantity: 1
            };

            const existing = cart.find(item => item.name === product.name);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push(product);
            }
            updateCart();
        });
    });

    // Actualizar carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div style="flex:1">
          <h4>${item.name}</h4>
          <p>Precio: $${item.price.toLocaleString()}</p>
          <label>Cantidad: 
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input">
          </label>
        </div>
        <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
      `;
            cartItemsContainer.appendChild(div);
        });

        cartTotal.textContent = `$${total.toLocaleString()}`;

        // Cambiar cantidad
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', e => {
                const idx = e.target.dataset.index;
                const newQty = parseInt(e.target.value);
                if (newQty > 0) {
                    cart[idx].quantity = newQty;
                } else {
                    cart[idx].quantity = 1;
                    e.target.value = 1;
                }
                updateCart();
            });
        });

        // Eliminar producto
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = e.currentTarget.dataset.index;
                cart.splice(idx, 1);
                updateCart();
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = [];

    // Abrir carrito
    document.querySelectorAll('.fa-shopping-cart').forEach(icon => {
        icon.addEventListener('click', () => {
            cartOverlay.style.display = 'flex';
        });
    });

    // Cerrar carrito
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Agregar producto
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            const imgSrc = card.querySelector('img').getAttribute('src'); // autodetecta imagen
            const product = {
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                img: imgSrc,
                quantity: 1
            };

            const existing = cart.find(item => item.name === product.name);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push(product);
            }
            updateCart();
        });
    });

    // Actualizar carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div style="flex:1">
          <h4>${item.name}</h4>
          <p>Precio: $${item.price.toLocaleString()}</p>
          <label>Cantidad: 
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input">
          </label>
        </div>
        <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
      `;
            cartItemsContainer.appendChild(div);
        });

        cartTotal.textContent = `$${total.toLocaleString()}`;

        // Cambiar cantidad
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', e => {
                const idx = e.target.dataset.index;
                const newQty = parseInt(e.target.value);
                if (newQty > 0) {
                    cart[idx].quantity = newQty;
                } else {
                    cart[idx].quantity = 1;
                    e.target.value = 1;
                }
                updateCart();
            });
        });

        // Eliminar producto
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = e.currentTarget.dataset.index;
                cart.splice(idx, 1);
                updateCart();
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    // Abrir carrito
    document.querySelectorAll('.fa-shopping-cart').forEach(icon => {
        icon.addEventListener('click', () => {
            cartOverlay.style.display = 'flex';
        });
    });

    // Cerrar carrito
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Agregar producto
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            const imgSrc = card.querySelector('img').getAttribute('src'); // autodetecta imagen
            const product = {
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                img: imgSrc,
                quantity: 1
            };

            const existing = cart.find(item => item.name === product.name);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push(product);
            }
            updateCart();
        });
    });

    // Actualizar carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div style="flex:1">
          <h4>${item.name}</h4>
          <p>Precio: $${item.price.toLocaleString()}</p>
          <div class="qty-controls">
            <button class="qty-btn" data-index="${index}" data-action="minus">-</button>
            <span class="qty">${item.quantity}</span>
            <button class="qty-btn" data-index="${index}" data-action="plus">+</button>
          </div>
        </div>
        <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
      `;
            cartItemsContainer.appendChild(div);
        });

        cartTotal.textContent = `$${total.toLocaleString()}`;

        // Botones + y -
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = e.currentTarget.dataset.index;
                const action = e.currentTarget.dataset.action;
                if (action === 'plus') {
                    cart[idx].quantity++;
                } else if (action === 'minus' && cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                }
                updateCart();
            });
        });

        // Eliminar producto
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = e.currentTarget.dataset.index;
                cart.splice(idx, 1);
                updateCart();
            });
        });
    }

    // Finalizar compra
    checkoutBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
        cartOverlay.style.display = 'none';

        // Mensaje personalizado
        const msg = document.createElement('div');
        msg.classList.add('thank-you-message');
        msg.innerHTML = `
      <p>🎉 Gracias por comprar con un carrito personalizado 🎉</p>
    `;
        document.body.appendChild(msg);

        setTimeout(() => {
            msg.remove();
        }, 3000);
    });
});