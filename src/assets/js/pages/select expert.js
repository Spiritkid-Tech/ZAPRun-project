// ===============================
// CONFIG
// ===============================
const API_BASE_URL = "https://zappruntech.onrender.com"; 
// Example later: https://zaprun-api.onrender.com

const expertsList = document.getElementById("expertsList");

// ===============================
// LOAD EXPERTS FROM BACKEND
// ===============================
async function loadExperts(filters = {}) {
  try {
    // Build query string dynamically
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/experts?${params}`);

    if (!response.ok) {
      throw new Error("Failed to load experts");
    }

    const experts = await response.json();
    renderExperts(experts);

  } catch (error) {
    expertsList.innerHTML = `<p>Unable to load experts.</p>`;
    console.error(error);
  }
}

// ===============================
// RENDER EXPERTS
// ===============================
function renderExperts(experts) {
  expertsList.innerHTML = "";

  if (experts.length === 0) {
    expertsList.innerHTML = "<p>No experts found.</p>";
    return;
  }

  experts.forEach(expert => {
    const portfolioHTML = expert.portfolio?.length
      ? `
        <div class="portfolio">
          ${expert.portfolio.map(img =>
            `<img src="${img}" alt="portfolio">`
          ).join("")}
        </div>
      `
      : "";

    expertsList.innerHTML += `
      <div class="expert-card">
        <img src="${expert.avatar || "assets/avatar.png"}" alt="expert">
        <h3>${expert.name}</h3>
        <p>${expert.service}</p>
        <p>${expert.location}</p>

        <div class="rating">
          ⭐ ${expert.rating || 0} (${expert.reviews || 0})
        </div>

        ${portfolioHTML}

        <button onclick="viewProfile('${expert._id}')">View Profile</button>
        <button onclick="messageExpert('${expert._id}')">Message</button>
      </div>
    `;
  });
}

// ===============================
// SEARCH & FILTER
// ===============================
function searchExperts() {
  const location = document.getElementById("location").value;
  const service = document.getElementById("service").value;
  const distance =
    document.querySelector('input[name="distance"]:checked')?.value;

  const filters = {};

  if (location) filters.location = location;
  if (service) filters.service = service;
  if (distance) filters.distance = distance;

  loadExperts(filters);
}

// ===============================
// PROFILE & MESSAGE ACTIONS
// ===============================
function viewProfile(id) {
  window.location.href = `/profile.html?id=${id}`;
}

function messageExpert(id) {
  window.location.href = `/messages.html?user=${id}`;
}

// ===============================
// INITIAL LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadExperts();
});