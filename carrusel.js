    document.addEventListener("DOMContentLoaded", () => {
        const carrusel = document.querySelector(".carrusel");
        const slides = document.querySelectorAll(".slide");
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");

        let index = 0;

        function moverCarrusel() {
            carrusel.style.transform = `translateX(-${index * 100}%)`;
        }

        function nextSlide() {
            index = (index + 1) % slides.length;
            moverCarrusel();
        }

        function prevSlide() {
            index = (index - 1 + slides.length) % slides.length;
            moverCarrusel();
        }

        let autoSlide = setInterval(nextSlide, 3000);


        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAuto();
        });

        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetAuto();
        });

        // Reset auto-slide al usar botones
        function resetAuto() {
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, 3000);
        }
    });