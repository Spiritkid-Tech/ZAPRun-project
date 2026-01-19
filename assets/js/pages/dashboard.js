// ================= SIDEBAR TOGGLE =================
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// Close sidebar on mobile when a link is clicked
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    sidebar.classList.remove("active");
  }
});

// ================= API SETUP =================
const API_BASE = "https://zapruntech.onrender.com";
const token = localStorage.getItem("accessToken");

// Redirect to login if no token
if (!token) {
  window.location.href = "../auth/login.html";
}

// ================= DASHBOARD LOADER =================
async function loadDashboard() {
  try {
    const res = await fetch(`${API_BASE}/api/artisan/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    // ---- Token invalid or expired ----
    if (res.status === 401 || res.status === 403) {
      console.log("Token invalid or expired");
      localStorage.removeItem("accessToken"); // clear invalid token
      window.location.href = "../../pages/auth/login.html";
      return;
    }

    // ---- Other server errors ----
    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      alert("Failed to load dashboard. Please try again later.");
      return;
    }

    // ---- Process valid response ----
    const data = await res.json();
    console.log("Dashboard data:", data);

    // Update stats cards
    document.getElementById("welcomeText").innerText =
      `Welcome back, ${data.artisan.name} 👋`;

    document.getElementById("pendingJobs").innerText = data.stats.pending;
    document.getElementById("jobsToday").innerText = data.stats.today;
    document.getElementById("completedJobs").innerText = data.stats.completed;
    document.getElementById("totalEarnings").innerText =
      `₦${data.stats.earnings.toLocaleString()}`;

    // Render job requests
    renderJobs(data.jobs);

  } catch (err) {
    // ---- Network / fetch errors ----
    console.error("Network or fetch error:", err);
    alert("Network error. Please check your connection and try again.");
  }
}

// ================= RENDER JOBS =================
function renderJobs(jobs) {
  const container = document.getElementById("jobsContainer");
  container.innerHTML = "";

  if (!jobs || !jobs.length) {
    container.innerHTML = "<p>No new job requests</p>";
    return;
  }

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-details";

    div.innerHTML = `
      <img src="${job.client.avatar || 'assets/avatar.png'}" alt="Client Avatar">
      <div>
        <h4>${job.client.name}</h4>
        <p>${job.description}</p>
        <p><strong>Price:</strong> ₦${job.price}</p>
        <div class="job-actions">
          <button class="accept" onclick="acceptJob('${job._id}')">Accept</button>
          <button class="decline" onclick="declineJob('${job._id}')">Decline</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

// ================= ACCEPT JOB =================
async function acceptJob(jobId) {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/${jobId}/accept`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to accept job:", text);
      alert("Failed to accept job. Try again.");
      return;
    }

    alert("Job accepted successfully!");
    loadDashboard(); // refresh jobs
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error. Try again.");
  }
}

// ================= DECLINE JOB =================
async function declineJob(jobId) {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/${jobId}/decline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to decline job:", text);
      alert("Failed to decline job. Try again.");
      return;
    }

    alert("Job declined successfully!");
    loadDashboard(); // refresh jobs
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error. Try again.");
  }
}

// ================= INITIALIZE DASHBOARD =================
loadDashboard();
