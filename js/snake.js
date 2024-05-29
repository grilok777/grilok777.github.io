document.getElementById("instructionBtn").addEventListener("click", InstructionPop);

document.getElementById("button-custom").addEventListener("click", CustomPop);

const foodMenu = ["img/food3.png", "img/food.png", "img/food2.png", "img/food4.png", "img/food5.png", "img/food6.png", "img/food7.png", "img/food8.png", "img/food9.png"];
let n = 0;
const colorMenu = ["green", "red", "blue", "magenta", "crimson", "white", "yellow", "orange", "purple", "pink"];
let k = 0;

const foodSMenu = ["img/foodS.png", "img/foodS2.png", "img/foodS3.png", "img/foodS4.png", "img/foodS5.png", "img/foodS6.png", "img/foodS7.png"];
let l = 0;

function InstructionPop() {
    document.getElementById("instructionText").style.visibility = "visible";
    document.getElementById("crossBtnSnake").addEventListener("click", InstructionUnPop);
}
function InstructionUnPop() {
    document.getElementById("instructionText").style.visibility = "hidden";
}

function CustomPop() {
    document.getElementById("customWindow").style.visibility = "visible";
    document.getElementById("crossBtnSnake2").addEventListener("click", CustomUnPop);

    document.getElementById("buttonLeft3").addEventListener("click", MenuLeft3);
    document.getElementById("buttonRight3").addEventListener("click", MenuRight3);

    document.getElementById("buttonLeft2").addEventListener("click", MenuLeft2);
    document.getElementById("buttonRight2").addEventListener("click", MenuRight2);

    document.getElementById("buttonLeft1").addEventListener("click", MenuLeft1);
    document.getElementById("buttonRight1").addEventListener("click", MenuRight1);

    if (sessionStorage.getItem("foodSkin") !== null) {
        document.getElementById("foodBox").src = sessionStorage.getItem("foodSkin");
        n = foodMenu.indexOf(sessionStorage.getItem("foodSkin"))
    }
    if (sessionStorage.getItem("colorSkin") !== null) {
        document.getElementById("colorBox").style.background = sessionStorage.getItem("colorSkin");
        k = colorMenu.indexOf(sessionStorage.getItem("colorSkin"))
    }
    if (sessionStorage.getItem("foodSSkin") !== null) {
        document.getElementById("foodSBox").src = sessionStorage.getItem("foodSSkin");
        l = foodSMenu.indexOf(sessionStorage.getItem("foodSSkin"))
    }
    
}

function MenuRight3() {
    if (l === foodSMenu.length - 1) {
        l = 0;
    } else {
        l++;
    }
    document.getElementById("foodSBox").src = foodSMenu[l]
    sessionStorage.setItem("foodSSkin", foodSMenu[l]);
}

function MenuLeft3() {
    if (l === 0) {
        l = foodSMenu.length - 1;
    } else {
        l--;
    }
    document.getElementById("foodSBox").src = foodSMenu[l]
    sessionStorage.setItem("foodSSkin", foodSMenu[l]);

}

function MenuRight2() {
    if (n === foodMenu.length - 1) {
        n = 0;
    } else {
        n++;
    }
    document.getElementById("foodBox").src = foodMenu[n]
    sessionStorage.setItem("foodSkin", foodMenu[n]);
}

function MenuLeft2() {
    if (n === 0) {
        n = foodMenu.length - 1;
    } else {
        n--;
    }
    document.getElementById("foodBox").src = foodMenu[n]
    sessionStorage.setItem("foodSkin", foodMenu[n]);

}

function MenuRight1() {
    if (k === colorMenu.length - 1) {
        k = 0;
    } else {
        k++;
    }
    document.getElementById("colorBox").style.background = colorMenu[k]
    sessionStorage.setItem("colorSkin", colorMenu[k]);
}

function MenuLeft1() {
    if (k === 0) {
        k = colorMenu.length - 1;
    } else {
        k--;
    }
    document.getElementById("colorBox").style.background = colorMenu[k]
    sessionStorage.setItem("colorSkin", colorMenu[k]);

}

function CustomUnPop() {
    document.getElementById("customWindow").style.visibility = "hidden";
}


function outlineOn(element) {

    element.querySelector('.account-btn-start img').src = './img/play-gray.png';
}

function touchOn(element) {
    element.querySelector('.account-btn-start img').src = './img/play-gray.png';
}

function outlineOff(element) {
    element.querySelector('.account-btn-start img').src = './img/play.png';

}

function touchOff(element) {
    element.querySelector('.account-btn-start img').src = './img/play.png';
}






