document.getElementById("statName").textContent = sessionStorage.getItem("nickname");
document.getElementById("statEmail").textContent = sessionStorage.getItem("email");
document.getElementById("statRecord").textContent = sessionStorage.getItem("record");
document.getElementById("statReg").textContent = new Date(sessionStorage.getItem("registrationDate")).toLocaleDateString();

let apple = 0;

fetch(`https://snake1gamestax.web.app/userGames/${sessionStorage.getItem("nickname")}`)
.then(response => response.json())
.then(games => {
    document.getElementById("statMatch").textContent = games.length;
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        apple += game.score;
    }
    document.getElementById("statApple").textContent = apple;
})
.catch(error => console.error('Error:', error));
