const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {
  dashboardBtn.addEventListener("click", () => {
    window.location.href = "../artisan/dashboard.html";
  });
}
