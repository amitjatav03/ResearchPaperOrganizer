// Landing Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for anchor links
  window.scrollToFeatures = () =>
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });

  // Add scroll effect to navigation
  window.addEventListener("scroll", function () {
    const nav = document.querySelector(".landing-nav");
    nav && nav.classList.toggle("scrolled", window.scrollY > 100);
  });

  // Animate elements on scroll
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".feature-card, .step, .stat-item").forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Check if user is already logged in
  function checkAuthStatus() {
    if (localStorage.getItem("current_user")) window.location.href = "home.html";
  }
  checkAuthStatus();

  // Handle navigation buttons using data-href attribute (safer than inline onclick)
  document.querySelectorAll("[data-href]").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("data-href");
      if (href === "index.html") {
        checkAuthStatus();
      } else if (href) {
        window.location.href = href;
      }
    });
  });
});

// Utility: Smooth scroll to any section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Utility: Add loading state to button
function addLoadingState(button) {
  const original = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  button.disabled = true;
  setTimeout(() => {
    button.innerHTML = original;
    button.disabled = false;
  }, 2000);
}

// Utility: Validate email format
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
