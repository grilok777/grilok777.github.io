document.getElementById("crossBtnSnake2").addEventListener("click", CustomUnPop);
document.getElementById("button-custom").addEventListener("click", CustomPop);

function CustomUnPop() {
    document.getElementById("customWindow").style.visibility = "visible";
}
function CustomPop() {
    document.getElementById("customWindow").style.visibility = "hidden";
}