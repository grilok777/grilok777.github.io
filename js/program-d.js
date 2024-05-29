document.getElementById("instructionBtn").addEventListener("click", InstructionPop);
document.getElementById("instructionImg").addEventListener("click", InstructionPop);


function InstructionPop() {
    document.getElementById("crossBtnSnake").addEventListener("click", InstructionUnPop);
    document.getElementById("instructionText").style.display = "block";
}
function InstructionUnPop() {
    document.getElementById("instructionText").style.display = "none";
}



function outlineOn(element) {
    let paragraphs = element.querySelectorAll('.bl-btn-desc p');

    paragraphs.forEach(function (paragraph) {
        paragraph.style.color = 'white';

    });


    if (element.id === 'bl-1') {
        element.querySelector('.bl-btn-icon img').src = './img/controller-white.png';
    } else if (element.id === 'bl-2') {
        element.querySelector('.bl-btn-icon img').src = './img/liderboard-white.png';
    } else if (element.id === 'bl-3') {
        element.querySelector('.bl-btn-icon img').src = './img/history-white.png';
    } else if (element.id === 'bl-4') {
        element.querySelector('.bl-btn-icon img').src = './img/update-white.png';
    } else if (element.id === 'bl-5') {
        element.querySelector('.bl-btn-icon img').src = './img/question-white.png';
    } else if (element.id === 'bl-6') {
        element.querySelector('.bl-btn-icon img').src = './img/dev-white.png';
    }



}

function touchOn(element) {
    let paragraphs = element.querySelectorAll('.bl-btn-desc p');

    paragraphs.forEach(function (paragraph) {
        paragraph.style.color = 'white';

    });


    if (element.id === 'bl-1') {
        element.querySelector('.bl-btn-icon img').src = './img/controller-white.png';
    } else if (element.id === 'bl-2') {
        element.querySelector('.bl-btn-icon img').src = './img/liderboard-white.png';
    } else if (element.id === 'bl-3') {
        element.querySelector('.bl-btn-icon img').src = './img/history-white.png';
    } else if (element.id === 'bl-4') {
        element.querySelector('.bl-btn-icon img').src = './img/update-white.png';
    } else if (element.id === 'bl-5') {
        element.querySelector('.bl-btn-icon img').src = './img/question-white.png';
    } else if (element.id === 'bl-6') {
        element.querySelector('.bl-btn-icon img').src = './img/dev-white.png';
    }
    element.classList.add('active');


}

function outlineOff(element) {
    let paragraphs = element.querySelectorAll('.bl-btn-desc p');

    paragraphs.forEach(function (paragraph) {
        paragraph.style.color = '';
    });

    if (element.id === 'bl-1') {
        element.querySelector('.bl-btn-icon img').src = './img/controller.png';
    } else if (element.id === 'bl-2') {
        element.querySelector('.bl-btn-icon img').src = './img/liderboard.png';
    } else if (element.id === 'bl-3') {
        element.querySelector('.bl-btn-icon img').src = './img/history.png';
    } else if (element.id === 'bl-4') {
        element.querySelector('.bl-btn-icon img').src = './img/update.png';
    } else if (element.id === 'bl-5') {
        element.querySelector('.bl-btn-icon img').src = './img/question.png';
    } else if (element.id === 'bl-6') {
        element.querySelector('.bl-btn-icon img').src = './img/dev.png';
    }

}

function touchOff(element) {
    let paragraphs = element.querySelectorAll('.bl-btn-desc p');

    paragraphs.forEach(function (paragraph) {
        paragraph.style.color = '';
    });

    if (element.id === 'bl-1') {
        element.querySelector('.bl-btn-icon img').src = './img/controller.png';
    } else if (element.id === 'bl-2') {
        element.querySelector('.bl-btn-icon img').src = './img/liderboard.png';
    } else if (element.id === 'bl-3') {
        element.querySelector('.bl-btn-icon img').src = './img/history.png';
    } else if (element.id === 'bl-4') {
        element.querySelector('.bl-btn-icon img').src = './img/update.png';
    } else if (element.id === 'bl-5') {
        element.querySelector('.bl-btn-icon img').src = './img/question.png';
    } else if (element.id === 'bl-6') {
        element.querySelector('.bl-btn-icon img').src = './img/dev.png';
    }
    element.classList.remove('active');
}

document.getElementById("accountLinkCheck").addEventListener('click', function (event) {
    if (sessionStorage.getItem("email") == null) {
        event.preventDefault();
        alert('You have to log in for this feature!');
    }
});

document.getElementById("accountLinkCheck2").addEventListener('click', function (event) {
    if (sessionStorage.getItem("email") == null) {
        event.preventDefault();
        alert('You have to log in for this feature!');
    }
});




