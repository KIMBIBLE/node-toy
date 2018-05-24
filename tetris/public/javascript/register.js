var socket = io.connect('http://localhost:3000');

var userId = document.getElementById('inputID'),
    email = document.getElementById('inputEmail'),
    password = document.getElementById('inputPassword'),
    btn = document.getElementById('send');

btn.addEventListener('click', () => {
    socket.emit('registerData', {
        userId: userId.value,
        email: email.value,
        password: password.value
    });
});
