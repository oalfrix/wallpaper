document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy authentication check
    if (email === 'admin@example.com' && password === 'password') {
        localStorage.setItem('admin', 'true');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid credentials');
    }
});