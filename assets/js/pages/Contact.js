const API_BASE_URL = "https://zapruntech.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

    const phoneCard = document.getElementById("phoneCard");
    const emailCard = document.getElementById("emailCard");
    const addressCard = document.getElementById("addressCard");
    const hoursCard = document.getElementById("hoursCard");

    // 1️⃣ Phone -> open dialer
    phoneCard.addEventListener("click", () => {
        const phoneNumber = document.getElementById("phoneNumber").textContent;
        window.location.href = `tel:${phoneNumber}`;
    });

    // 2️⃣ Email -> open email client
    emailCard.addEventListener("click", () => {
        const emailAddress = document.getElementById("emailAddress").textContent.trim();
        window.location.href = `mailto:${emailAddress}`;
    });

    // 3️⃣ Address -> open Google Maps
    addressCard.addEventListener("click", () => {
        const address = document.getElementById("officeAddress").textContent;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, "_blank");
    });

    // 4️⃣ Hours -> optional popup
    hoursCard.addEventListener("click", () => {
        const hours = document.getElementById("officeHours").textContent;
        alert(`Our hours of operation:\n${hours}`);
    });

});

  // Support desk link
  const supportLink = document.querySelector(".support-link");
  supportLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "support.html";
  });
