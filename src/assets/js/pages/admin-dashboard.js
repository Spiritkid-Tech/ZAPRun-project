/*******************************************
 * ADMIN DASHBOARD – LIVE DATA CONTROLLER
 *******************************************/

const API_BASE = "https://zapruntech.onrender.com/admin"; // Replace with your real admin API

// ---------- STATS ----------
async function loadStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    const data = await res.json();

    document.getElementById("totalArtisans").textContent = data.artisans;
    document.getElementById("totalCustomers").textContent = data.customers;
    document.getElementById("jobsToday").textContent = data.jobsToday;
    document.getElementById("totalRevenue").textContent =
      `₦${data.revenue.toLocaleString()}`;
  } catch (err) {
    console.error("Failed to load stats:", err);
  }
}

// ---------- VERIFICATIONS ----------
async function loadVerifications() {
  try {
    const res = await fetch(`${API_BASE}/artisan-verifications`);
    const data = await res.json();

    const table = document.getElementById("verificationTable");
    table.innerHTML = "";

    data.forEach(item => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.skill}</td>
        <td>${item.verificationStatus}</td>
        <td><button class="approveBtn">Approve</button></td>
      `;

      // Approve button
      row.querySelector(".approveBtn").addEventListener("click", () => {
        approveArtisan(item.id);
      });

      table.appendChild(row);
    });
  } catch (err) {
    console.error("Failed to load verifications:", err);
  }
}

async function approveArtisan(id) {
  try {
    await fetch(`${API_BASE}/approve-artisan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artisanId: id })
    });

    loadVerifications(); // Refresh table
  } catch (err) {
    console.error("Failed to approve artisan:", err);
  }
}

// ---------- RECENT JOBS ----------
async function loadJobs() {
  try {
    const res = await fetch(`${API_BASE}/recent-jobs`);
    const data = await res.json();

    const table = document.getElementById("jobsTable");
    table.innerHTML = "";

    data.forEach(job => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${job.jobId}</td>
        <td>${job.artisan}</td>
        <td>${job.service}</td>
        <td><span class="status ${job.status.toLowerCase()}">${job.status}</span></td>
      `;

      table.appendChild(row);
    });
  } catch (err) {
    console.error("Failed to load jobs:", err);
  }
}

// ---------- INIT DASHBOARD ----------
function initDashboard() {
  loadStats();
  loadVerifications();
  loadJobs();
}

// Auto refresh every 15 seconds
setInterval(initDashboard, 15000);
initDashboard();

/********************************************
 * MOBILE SIDEBAR TOGGLE
 ********************************************/
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Open sidebar
hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

// Close sidebar on overlay click
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Close sidebar when a link is clicked
document.querySelectorAll(".sidebar nav a, .sidebar-bottom a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});
