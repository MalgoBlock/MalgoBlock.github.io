document.addEventListener('DOMContentLoaded', readyGo, false);

function readyGo() {

    // createMenu();

    var radios = document.getElementsByName('ball-number');

    for(var i=0; i<radios.length; i++) {
        radios[i].addEventListener('change', changeBall);
    }

    setBackground();
    setColor();
}

function changeBall(event) {
    
    if (event.target.id == 'radio-2') {
        removeBalls();
        addBalls(2);      
    } else {
        removeBalls();
        addBalls(3);      
    }

}

function removeBalls() {
    var juggle = document.getElementById('juggle');
    var balls = document.getElementsByClassName('juggle__ball');
    var ballsAmount = balls.length;

    for(var i=0; i<ballsAmount; i++) {      
        var ballId = 'ball-' + (i+1);
        var ball = document.getElementById(ballId);
        juggle.removeChild(ball);
    }
}

function addBalls(ballNumber) {
    var juggle = document.getElementById('juggle');

    for(var i=0; i<ballNumber; i++) {
        var newBall = document.createElement('div');
        newBall.id = 'ball-' + (i+1);
        newBall.className = 'juggle__ball juggle__ball--' + (i+1);
        
        if (ballNumber == 2 && i == 1) {
            newBall.className = 'juggle__ball juggle__ball--2 ball2';
        }

        juggle.appendChild(newBall);
    }
}