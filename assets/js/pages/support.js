function callPhone() {
  window.location.href = "tel:+2348000000000";
}

function sendEmail() {
  window.location.href = "mailto:zaprun2025@gmail.com";
}

function openWhatsApp() {
  window.open("https://wa.me/2348000000000", "_blank");
}

function sendMessage() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  alert("Message sent successfully!");

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}
// Placeholder for any future JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // You can add interactivity here if needed
});