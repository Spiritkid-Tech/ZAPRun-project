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

if (response.ok) {}