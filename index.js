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