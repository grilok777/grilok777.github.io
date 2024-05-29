document.getElementById("accountExit").addEventListener("click", Exit);


if (sessionStorage.getItem("email") !== null) {
    document.getElementById("no-account").style.position = "absolute";
    document.getElementById("no-account").style.visibility = "hidden";
    document.getElementById("account").style.position = "inherit";
    document.getElementById("account").style.visibility = "visible";
    document.getElementById("accountName").textContent = sessionStorage.getItem("nickname");
    document.getElementById("accountImg").src = sessionStorage.getItem("imagePath");
    if (sessionStorage.getItem("supporter") !== null) {
        document.getElementById("addBlock").style.display="none";
        }
    else {
        document.getElementById("addBlock").style.display="block";
    }    
} else {
    document.getElementById("no-account").style.position = "inherit";
    document.getElementById("no-account").style.visibility = "visible";
    document.getElementById("account").style.position = "absolute";
    document.getElementById("account").style.visibility = "hidden"; 
}
function Exit() {
    if (confirm("Do you confirm log out?") == true) {
        sessionStorage.clear();
        location.reload();
        window.location.replace("index.html");
    } 

}