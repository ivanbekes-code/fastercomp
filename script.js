const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-links");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const track = document.querySelector("[data-testimonials]");
const controls = document.querySelectorAll(".control");
let activeIndex = 0;

const updateTestimonials = () => {
  if (!track) return;
  const cards = track.querySelectorAll(".testimonial");
  cards.forEach((card, index) => {
    card.style.display = index === activeIndex ? "grid" : "none";
  });
};

if (track) {
  updateTestimonials();
  setInterval(() => {
    const cards = track.querySelectorAll(".testimonial");
    activeIndex = (activeIndex + 1) % cards.length;
    updateTestimonials();
  }, 7000);
}

controls.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cards = track ? track.querySelectorAll(".testimonial") : [];
    if (!cards.length) return;
    if (btn.dataset.dir === "next") {
      activeIndex = (activeIndex + 1) % cards.length;
    } else {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    }
    updateTestimonials();
  });
});
