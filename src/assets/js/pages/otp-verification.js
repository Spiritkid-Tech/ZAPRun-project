const inputs = document.querySelectorAll('inputs');
const otpMsg = document.getElementById('otpMsg');

if (inputs) {
    inputs.addEventListener('submit',async (e) => {
        e.preventDefault();

        const otp = 
document.getElementById('input').value;

         try {
            const response = await
fetch("https://backend-api/verify-otp", {
    method:"POST",
    headers: {
        "content-Type": "application/Json"
    },
    body: JSON.stringify({ otp })
});

const result = await response.json();

if (response.ok) {
        otpMessage.style.color = "green";
        otpMessage.textContent = "OTP verified successfully";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        otpMessage.style.color = "red";
        otpMessage.textContent = result.message || "Invalid OTP";
      }

    } catch (error) {
      otpMessage.style.color = "red";
      otpMessage.textContent = "Network error. Try again.";
    }
  });
}