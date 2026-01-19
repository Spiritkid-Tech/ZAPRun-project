const API_BASE_URL = "https://zapruntech.onrender.com";

const form = document.getElementById("otpForm");
const inputs = document.querySelectorAll(".inputs input");
const otpMsg = document.getElementById("otpMsg");
const resendBtn = document.getElementById("resendOtp");

// Auto move cursor between inputs
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// Submit OTP to API
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = Array.from(inputs).map(input => input.value).join("");

  if (otp.length !== 6) {
    otpMsg.style.color = "red";
    otpMsg.textContent = "Please enter the complete 6-digit OTP";
    return;
  }

  otpMsg.style.color = "black";
  otpMsg.textContent = "Verifying OTP...";

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ otp })
    });

    const result = await response.json();

    if (response.ok) {
      otpMsg.style.color = "green";
      otpMsg.textContent = "OTP verified successfully! Redirecting...";

      // Redirect to OTP success page
      setTimeout(() => {
        window.location.href = "../../pages/auth/otp-success.html";
      }, 1500);

    } else {
      otpMsg.style.color = "red";
      otpMsg.textContent = result.message || "Invalid OTP. Try again.";
    }

  } catch (error) {
    console.error("OTP verification error:", error);
    otpMsg.style.color = "red";
    otpMsg.textContent = "Network error. Please try again.";
  }
});

// Resend OTP
resendBtn.addEventListener("click", async () => {
  otpMsg.style.color = "black";
  otpMsg.textContent = "Resending OTP...";

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      otpMsg.style.color = "green";
      otpMsg.textContent = "OTP resent successfully!";
    } else {
      const data = await res.json();
      otpMsg.style.color = "red";
      otpMsg.textContent = data.message || "Failed to resend OTP";
    }

  } catch (error) {
    console.error("Resend OTP error:", error);
    otpMsg.style.color = "red";
    otpMsg.textContent = "Network error. Try again.";
  }
});
