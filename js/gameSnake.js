let apiKey = "b2332355c34dc13f007f1d47ec73c17f";//Enter your API key here
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image(), foodImg = new Image(), foodSuper = new Image();
ground.src = "img/groundDefault.png";
foodImg.src = "img/food3.png";
foodSuper.src = "img/foodS.png";
let skin = "green";
let box = 32, score = 0, time = 400, game, specialFood = null;
let touchStartX = null, touchStartY = null, dir, gamePaused = false;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

function spawnSpecialFood(chance) {
    let randNum = Math.floor(Math.random() * 100) + 1;

    if (randNum <= chance) {
        specialFood = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    }
}

document.addEventListener("keydown", direction);
//-------------------------------------------------------
canvas.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, false);

canvas.addEventListener('touchmove', function (e) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    let xUp = e.touches[0].clientX, yUp = e.touches[0].clientY;

    let xDiff = touchStartX - xUp, yDiff = touchStartY - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && dir != "right") {
            dir = "left";
        } else if (dir != "left") {
            dir = "right";
        }
    } else {
        if (yDiff > 0 && dir != "down") {
            dir = "up";
        } else if (dir != "up") {
            dir = "down";
        }
    }

    touchStartX = null;
    touchStartY = null;
}, false);


async function checkWeather(city) {
    console.log(city);
    try {
        // Make API call to fetch weather data
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        // Parse the response JSON
        const data = await response.json();
        if (data.weather[0].main === "Clouds") {
            ground.src = "img/groundCloudly2.png";
            document.getElementById("bg").style.backgroundColor = "white";
            console.log("img/groundCloudly2.png")

        } else if (data.weather[0].main === "Clear") {
            ground.src = "img/ground-fixed.png";
            console.log("img/ground-fixed.png")
            document.getElementById("bg").style.backgroundColor = "#578a34";
        } else if (data.weather[0].main === "Rain") {
            ground.src = "img/groundRainy2.png";
            console.log("img/groundRainy2.png")
            document.getElementById("bg").style.backgroundColor = "#5f5f5f";
        } else if (data.weather[0].main === "Drizzle") {
            ground.src = "img/groundCloudly.png";
            document.getElementById("bg").style.backgroundColor = "#848484";

        } else if (data.weather[0].main === "Mist") {
            ground.src = "img/mist.png";
            console.log("img/mist.png")
            document.getElementById("bg").style.backgroundColor = "white";
        }

    } catch (error) {
        ground.src = "img/ground-fixed.png";
        document.getElementById("bg").style.backgroundColor = "#578a34";
        console.error(error);
    }

}

function geoFindMe() {
    return new Promise((resolve, reject) => {
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(data => {
                    const city = data.address.city || data.address.town || data.address.village || "Алжир";
                    resolve(city);
                })
                .catch(error => {
                    reject("Алжир");
                });
        }

        function error() {
            reject("Алжир");
        }

        if (!navigator.geolocation) {
            reject("Алжир");
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    });
}

async function main() {
    try {
        const city = await geoFindMe();
        await checkWeather(city);
    } catch (error) {
        console.error(error);
    }
}



//-------------------------------------------------------

function direction(event) {
    if (event.keyCode == 37 && dir != "right" || event.keyCode == 65 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down" || event.keyCode == 87 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left" || event.keyCode == 68 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up" || event.keyCode == 83 && dir != "up")
        dir = "down";
    else if (event.keyCode == 80)
        togglePause();
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            gameOver();
        }
    }
}

function drawGame() {
    if (gamePaused) {
        return;
    }
    if (score == 255) {
        alert("Congratulation!!!");
    }
    ctx.clearRect(0, 0, 609, 609);
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);
    if (specialFood) {
        ctx.drawImage(foodSuper, specialFood.x, specialFood.y);
    }

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? skin : skin;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (specialFood && snakeX == specialFood.x && snakeY == specialFood.y) {
        score += 5;
        specialFood = null;
    }
    let x = Math.random();
    if (x < 0.8 && x > 0.76) {
        spawnSpecialFood(5);
    }
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        timeLess();
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        gameOver();
    }


    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

function stopScroll() {
    window.removeEventListener('touchmove', preventScroll, { passive: false });
}

function preventScroll(e) {
    e.preventDefault();
}

function togglePause() {
    if (document.getElementById("button-pause").classList.contains("reg-btn-red")) {
        document.getElementById("button-pause").classList.remove("reg-btn-red");
    } else {
        document.getElementById("button-pause").classList.add("reg-btn-red");
    }


    gamePaused = !gamePaused;
    stopScroll();
}

function startGame() {
    window.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, { passive: false });
    game = setInterval(drawGame, time);
}

function starting() {
    if (sessionStorage.getItem("foodSkin") !== null) {
        foodImg.src = sessionStorage.getItem("foodSkin");
    }
    if (sessionStorage.getItem("colorSkin") !== null) {
        skin = sessionStorage.getItem("colorSkin");
    }
    if (sessionStorage.getItem("foodSSkin") !== null) {
        foodSuper.src = sessionStorage.getItem("foodSSkin");
    }
    var city = geoFindMe();

    main();

    startGame();

    document.getElementById("button-start").style.display = "none";
}


function gameOver() {
    stopScroll();
    clearInterval(game);
    document.getElementById("finalScore").innerText = "Ваш результат: " + score;
    document.getElementById("exitWindow").style.visibility = "visible";

    tempNickname = sessionStorage.getItem("nickname")
    if (tempNickname != null) {
        const gameHistory = {
            nickname: tempNickname,
            date: new Date(),
            score: score,
            version: sessionStorage.getItem("version")
        };
        fetch('https://snake1gamestax.web.app/gameHistory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameHistory)
        })
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(error => console.error('Error:', error));

        fetch(`https://snake1gamestax.web.app/getUserRecord/${sessionStorage.getItem("nickname")}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                if (score > data.record) {
                    sessionStorage.setItem("record", score);
                    fetch(`https://snake1gamestax.web.app/updateUserRecord/${sessionStorage.getItem("nickname")}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ record: score, version: sessionStorage.getItem("version") })
                    })
                        .then(response => response.json())
                        .then(data => console.log(data.message))
                        .catch(error => console.error('Error:', error));
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

function timeLess() {
    if (time > 150) {
        time = time - 10;
        clearInterval(game);
        startGame();
    }
}

document.getElementById("button-pause").addEventListener("click", togglePause);
document.getElementById("button-start").addEventListener("click", starting);

//startGame(); 
// Завершення гри
let modal = document.getElementById("exitWindow");

document.getElementById("restart").addEventListener("click", function () {
    modal.style.display = "none";
    location.reload();
});

document.getElementById("mainMenu").addEventListener("click", function () {
    modal.style.display = "none";
});




