let i = Math.floor(Math.random() * 11);
if (i > 5) {
    document.getElementById("supportImg").src = './img/Patreon.png';
    document.getElementById("support").classList.remove("reg-btn-yellow");
    document.getElementById("supportSrc").href ="https://www.patreon.com/";
} else {
    document.getElementById("support").classList.add("reg-btn-yellow");
    document.getElementById("supportImg").src = './img/BuyMeACofee.png';
    document.getElementById("supportSrc").href = "https://buymeacoffee.com/";

}