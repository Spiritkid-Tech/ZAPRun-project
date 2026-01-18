const homepageBtn = document.getElementById("homepageBtn");

if (homepageBtn) {
  homepageBtn.addEventListener("click", () => {
    window.location.href = "../../pages/public/index.html";
  });
}
