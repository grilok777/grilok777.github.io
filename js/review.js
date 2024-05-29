
document.getElementById("revBtn").addEventListener("click", AddResponse);
function AddResponse() {
    let tempEmail = document.getElementById('email').value;
    let text = document.getElementById('message').value;

    function validateRealisticEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(gmail\.com|yahoo\.com|outlook\.com)$/;
        return re.test(String(email).toLowerCase());
    }

    if (validateRealisticEmail(tempEmail) === false) {
        alert("Error: Email address is invalid!");
        return;
    }

    const response = {
        email: tempEmail,
        text: text
    };
    fetch('https://snake1gamestax.web.app/addResponse', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(response)
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error:', error));
    alert("Feedback submited!");
    window.location.replace("index.html");

}