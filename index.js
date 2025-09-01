document.addEventListener('DOMContentLoaded', () => {
    // ----------- COOKIE BANNER -----------
    const banner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('accept-cookies');

    if (localStorage.getItem('cookiesAccepted') !== 'true') {
        banner.classList.add('show');
    }

    btnAccept.addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('cookiesAccepted', 'true');
    });

    // ----------- CARRITO DE COMPRAS -----------
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    // Abrir carrito
    document.querySelectorAll('.fa-shopping-cart').forEach(icon => {
        icon.addEventListener('click', () => cartOverlay.style.display = 'flex');
    });

    // Cerrar carrito
    closeCartBtn.addEventListener('click', () => cartOverlay.style.display = 'none');

    // Agregar producto al carrito
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            const product = {
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                img: card.querySelector('img').src,
                quantity: 1
            };

            const existing = cart.find(item => item.name === product.name);
            if (existing) existing.quantity++;
            else cart.push(product);

            updateCart();
        });
    });

    // Función para actualizar carrito (lista de productos, total, botones)
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

        // Botones + y - para cambiar cantidad
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.onclick = e => {
                const idx = e.currentTarget.dataset.index;
                const action = e.currentTarget.dataset.action;
                if (action === 'plus') cart[idx].quantity++;
                else if (action === 'minus' && cart[idx].quantity > 1) cart[idx].quantity--;
                updateCart();
            };
        });

        // Botones para eliminar producto
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.onclick = e => {
                const idx = e.currentTarget.dataset.index;
                cart.splice(idx, 1);
                updateCart();
            };
        });
    }

    // Finalizar compra
    checkoutBtn.addEventListener('click', () => {
        if (!cart.length) return;

        cart = [];
        updateCart();
        cartOverlay.style.display = 'none';

        const msg = document.createElement('div');
        msg.classList.add('thank-you-message');
        msg.innerHTML = `<p>🎉 Gracias por tu compra 🎉</p>`;
        document.body.appendChild(msg);

        setTimeout(() => msg.remove(), 3000);
    });
});