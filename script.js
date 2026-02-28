document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const dotsContainer = document.querySelector(".dots");

  let slideIndex = 0;
  let autoTimeout;

  const slideTimes = [
    10000, // 5 minutes
    10000,  // 60 seconds
    10000  // 60 seconds
  ];

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      showSlide(index);
      restartAuto();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dots span");

  function showSlide(index) {

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active-dot"));

    slideIndex = index;

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active-dot");
  }

  function nextSlide() {
    showSlide(slideIndex + 1);
  }

  function prevSlide() {
    showSlide(slideIndex - 1);
  }

  function startAuto() {
    clearTimeout(autoTimeout);
    autoTimeout = setTimeout(() => {
      nextSlide();
      startAuto();
    }, slideTimes[slideIndex]);
  }

  function restartAuto() {
    startAuto();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAuto();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAuto();
  });

  showSlide(0);
  startAuto();

});


const carousel = document.querySelector(".carousel");

let startX = 0;

carousel.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
}, { passive: true });

carousel.addEventListener("touchmove", function (e) {
  let currentX = e.touches[0].clientX;
  let diff = currentX - startX;

  if (Math.abs(diff) > 50) {
    e.preventDefault();
  }
}, { passive: false });



