let slides = document.querySelectorAll(".slide");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let dotsContainer = document.querySelector(".dots");

let currentIndex = 0;
let autoSlide;
let startX = 0;
let endX = 0;

// Create dots
slides.forEach((_, index) => {
  let dot = document.createElement("span");
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

let dots = document.querySelectorAll(".dots span");

function showSlide(index) {
  slides[currentIndex].classList.remove("active");
  dots[currentIndex].classList.remove("active-dot");

  currentIndex = index;

  slides[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active-dot");
}

function nextSlide() {
  let newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}

function prevSlide() {
  let newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto scroll
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

document.querySelector(".carousel").addEventListener("mouseover", stopAutoSlide);
document.querySelector(".carousel").addEventListener("mouseout", startAutoSlide);

// Swipe support
let carousel = document.querySelector(".carousel");

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  if (startX - endX > 50) {
    nextSlide();
  } else if (endX - startX > 50) {
    prevSlide();
  }
});

// Init
showSlide(0);
startAutoSlide();