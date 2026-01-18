const API_BASE_URL = "https://zapruntech.onrender.com";

const signupForm = document.querySelector(".fill"); // The div with inputs
const signupBtn = signupForm.querySelector("button");

signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // Get input values
const fullname = document.getElementById("fullname").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
const confirmPassword = document.getElementById("confirmPassword").value.trim();

  // Simple validation
  if (!fullname || !email || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    // Call signup API
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fullname, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed. Try again.");
      return;
    }

    // ✅ Signup success → redirect to OTP verification
    alert("Signup successful! Enter OTP sent to your email.");
    window.location.href = "../../pages/auth/otp-verification.html";

  } catch (err) {
    console.error("Signup error:", err);
    alert("Network error. Please try again.");
  }
});
