const experts = [
  {
    name: "Fola David",
    service: "plumber",
    location: "lagos",
    distance: 5,
    rating: 4.8,
    reviews: 356,
    portfolio: []
  },
  {
    name: "Calvin Ajayi",
    service: "electrician",
    location: "abuja",
    distance: 10,
    rating: 3.9,
    reviews: 432,
    portfolio: []
  },
  {
    name: "Modupe Mariam",
    service: "carpenter",
    location: "ibadan",
    distance: 20,
    rating: 3.0,
    reviews: 84,
    portfolio: []
  }
];

const expertsList = document.getElementById("expertsList");

function loadExperts(data) {
  expertsList.innerHTML = "";

  data.forEach(expert => {
    const portfolioHTML = expert.portfolio.length
      ? `<div class="portfolio">${expert.portfolio.map(img => `<img src="${img}">`).join("")}</div>`
      : "";

    expertsList.innerHTML += `
      <div class="expert-card">
        <img src="assets/avatar.png">
        <h3>${expert.name}</h3>
        <p>${expert.service}</p>
        <div class="rating">⭐ ${expert.rating} (${expert.reviews})</div>
        ${portfolioHTML}
        <button>View Profile</button>
        <button>Message</button>
      </div>
    `;
  });
}

function searchExperts() {
  const location = document.getElementById("location").value;
  const service = document.getElementById("service").value;
  const distance = document.querySelector('input[name="distance"]:checked')?.value;

  const filtered = experts.filter(e =>
    (location === "" || e.location === location) &&
    (service === "" || e.service === service) &&
    (!distance || e.distance <= distance)
  );

  loadExperts(filtered);
}

loadExperts(experts);