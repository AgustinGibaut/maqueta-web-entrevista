let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[i].classList.add('active');
    dots[i].classList.add('active');
    slideIndex = i;
}

function moveSlide(step) {
    let newIndex = (slideIndex + step + slides.length) % slides.length;
    showSlide(newIndex);
}

function goToSlide(i) {
    showSlide(i);
}

setInterval(() => moveSlide(1), 3000);

const frases = [
    "con actitud, estilo y precisión",
    "como si el universo te hubiese diseñado",
    "para destacar sin decir una palabra"
];

let fraseIndex = 0;
let charIndex = 0;
const modelos = document.querySelector(".modelos");

function type() {
    const base = "vistete ";
    if (charIndex < frases[fraseIndex].length) {
        modelos.textContent = base + frases[fraseIndex].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            fraseIndex = (fraseIndex + 1) % frases.length;
            type();
        }, 2000);
    }
}

type();