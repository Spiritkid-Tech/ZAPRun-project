const signupBtn = document.getElementById('signupBtn');

if (signupBtn) {
    signupBtn.addEventListener("submit", async (e) => {
            e.preventDefault();
            window.location.href = 'otp.html';
        });
        }