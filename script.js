const menuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const header = document.querySelector(".header");

let lastScrollY = window.scrollY;

menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

mobileLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    menuButton.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

window.addEventListener("scroll", function () {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (currentScrollY > lastScrollY && currentScrollY > 120) {
    header.classList.add("header-hidden");
    menuButton.classList.remove("active");
    mobileMenu.classList.remove("active");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollY = currentScrollY;
});

const revealElements = document.querySelectorAll(
  ".hero-content, .hero-visual, .integration-strip-content, .problem-copy, .diagnostic-panel, .unified-copy, .unified-module, .infra-visual, .modular-copy, .pipeline-copy, .pipeline-board, .command-copy, .command-interface, .outcomes-copy, .outcome-feature, .outcome-row, .conversion-box, .footer-main, .footer-column"
);

revealElements.forEach(function (element, index) {
  element.classList.add("reveal");
  element.style.transitionDelay = `${(index % 4) * 0.08}s`;
});

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});