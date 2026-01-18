document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!fullname || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // 🔹 Make login request to your API
      const res = await fetch("https://zapruntech.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullname, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed. Check your credentials.");
        return;
      }

      // 🔹 Save token and user data
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("artisan", JSON.stringify(data.user));

      // 🔹 Redirect to dashboard
      window.location.href = "../../pages/artisan/dashboard.html";

    } catch (err) {
      console.error("Login error:", err);
      alert("Network error. Please check your connection and try again.");
    }
  });

  // Forgot password link
  document.getElementById("forgotPassword").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirect to reset password page");
    // Optionally implement actual redirect:
    // window.location.href = "../../pages/auth/reset-password.html";
  });
});
