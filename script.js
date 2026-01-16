const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-links");
const setNavOpen = (isOpen) => {
  if (!navToggle || !nav) return;
  nav.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
};

if (navToggle && nav) {

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    setNavOpen(!isOpen);
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(event.target) || navToggle.contains(event.target)) return;
    setNavOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setNavOpen(false);
      navToggle.focus();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (nav && nav.classList.contains("open")) {
      setNavOpen(false);
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

const heroMedia = document.querySelector(".hero-media");
if (heroMedia) {
  const resizeHeroMedia = () => {
    const rect = heroMedia.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const progress = Math.min(Math.max((viewHeight - rect.top) / viewHeight, 0), 1);
    heroMedia.style.transform = `scale(${0.9 + progress * 0.1})`;
  };
  resizeHeroMedia();
  window.addEventListener("scroll", resizeHeroMedia, { passive: true });
  window.addEventListener("resize", resizeHeroMedia);
}

const statSection = document.querySelector("#stats");
const counters = document.querySelectorAll("[data-count]");
let statsPlayed = false;

if (statSection && counters.length) {
  const runCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = `${target}`;
          return;
        }
        counter.textContent = `${current}`;
        requestAnimationFrame(tick);
      };
      tick();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsPlayed) {
          statsPlayed = true;
          runCounters();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(statSection);
}

const serviceNav = document.querySelector("[data-service-nav]");
if (serviceNav) {
  const links = Array.from(serviceNav.querySelectorAll(".service-link"));
  const panels = links.map((link) => document.querySelector(`#${link.dataset.target}`));

  const setActive = (id) => {
    links.forEach((link) => link.classList.toggle("active", link.dataset.target === id));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { threshold: 0.4 }
  );

  panels.forEach((panel) => panel && observer.observe(panel));

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(`#${link.dataset.target}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

const faqSection = document.querySelector("[data-faq]");
if (faqSection) {
  const items = Array.from(faqSection.querySelectorAll(".faq-item"));
  items.forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (!button) return;
    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((entry) => entry.classList.remove("is-open"));
      if (!isOpen) {
        item.classList.add("is-open");
      }
    });
  });
}
