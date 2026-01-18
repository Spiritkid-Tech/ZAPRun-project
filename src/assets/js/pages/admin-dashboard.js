/*******************************************
 * ADMIN DASHBOARD – LIVE DATA CONTROLLER
 *******************************************/

// ---------- API ENDPOINTS ----------
const API = {
  stats: "https://yourapi.com/admin/stats",
  verifications: "https://yourapi.com/admin/artisan-verifications",
  jobs: "https://yourapi.com/admin/recent-jobs",
  approve: "https://yourapi.com/admin/approve-artisan"
};

// ---------- STATS ----------
async function loadStats() {
  const res = await fetch(API.stats);
  const data = await res.json();

  document.getElementById("totalArtisans").textContent = data.artisans;
  document.getElementById("totalCustomers").textContent = data.customers;
  document.getElementById("jobsToday").textContent = data.jobsToday;
  document.getElementById("totalRevenue").textContent =
    `₦${data.revenue.toLocaleString()}`;
}

// ---------- VERIFICATIONS ----------
async function loadVerifications() {
  const res = await fetch(API.verifications);
  const data = await res.json();

  const table = document.getElementById("verificationTable");
  table.innerHTML = "";

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.skill}</td>
        <td>${item.verificationStatus}</td>
        <td>
          <button onclick="approveArtisan('${item.id}')">
            Approve
          </button>
        </td>
      </tr>
    `;
  });
}

async function approveArtisan(id) {
  await fetch(API.approve, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artisanId: id })
  });

  loadVerifications();
}

// ---------- RECENT JOBS ----------
async function loadJobs() {
  const res = await fetch(API.jobs);
  const data = await res.json();

  const table = document.getElementById("jobsTable");
  table.innerHTML = "";

  data.forEach(job => {
    table.innerHTML += `
      <tr>
        <td>${job.jobId}</td>
        <td>${job.artisan}</td>
        <td>${job.service}</td>
        <td>
          <span class="status ${job.status.toLowerCase()}">
            ${job.status}
          </span>
        </td>
      </tr>
    `;
  });
}

// ---------- INIT ----------
function initDashboard() {
  loadStats();
  loadVerifications();
  loadJobs();
}

// Auto refresh every 15 seconds
setInterval(initDashboard, 15000);

initDashboard();

/************************************
 * MOBILE SIDEBAR TOGGLE
 ************************************/
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});
