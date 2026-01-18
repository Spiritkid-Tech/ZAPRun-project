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


// ================= ACCEPT JOB =================
const acceptBtn = document.querySelector(".accept");
if (acceptBtn) {
  acceptBtn.addEventListener("click", () => {
    alert("Job accepted!");

    // 🔴 API GOES HERE
    // fetch("/api/jobs/accept", {
    //   method: "POST",
    //   body: JSON.stringify({ jobId: 1 })
    // });
  });
}

// ================= DECLINE JOB =================
const declineBtn = document.querySelector(".decline");
if (declineBtn) {
  declineBtn.addEventListener("click", () => {
    alert("Job declined!");

    // 🔴 API GOES HERE
    // fetch("/api/jobs/decline", {
    //   method: "POST",
    //   body: JSON.stringify({ jobId: 1 })
    // });
  });
}
