document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;

    // Simulate a login process
    if (fullname && password) {
        alert('Login successful');
        // Here you can add your logic for handling the login
    } else {
        alert('Please fill in all fields');
    }
});

document.getElementById('forgotPassword').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Redirect to reset password page');
});
});