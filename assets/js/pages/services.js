document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  console.log(navLinks);
  const primaryButtons = document.querySelectorAll(".btn-primary");
  const serviceButtons = document.querySelectorAll(".service-card button");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (targetId.startsWith("#")) {
        event.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    });
  });

  primaryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Finding artisan…");
    });
  });

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceName = button.closest(".service-card")?.querySelector("h3")
        ?.innerText;

      if (serviceName) {
        alert(`Checking available: ${serviceName}`);
      }
    });
  });
});
