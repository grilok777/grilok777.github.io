
document.getElementById("regBtn").addEventListener("click", Login);

function Login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('psw').value;
    
    const user = {
        email: email,
        password: password
    };

    fetch('https://snake1gamestax.web.app/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error) });
        }
        return response.json();
    })
    .then(data => {
        if (data.user) {
            sessionStorage.setItem("email", data.user.email);
            sessionStorage.setItem("nickname", data.user.nickname);
            sessionStorage.setItem("imagePath", data.user.imagePath);
            sessionStorage.setItem("record", data.user.record);
            sessionStorage.setItem("registrationDate", data.user.registrationDate);
            alert("Log in completed!"); 
            window.location.replace("index.html");
        } else {
            console.error('User data is missing in the response');
        }
    })
    .catch(error => {
        alert(`Помилка: ${error.message}`);
        console.error('Error:', error);
    });
}
