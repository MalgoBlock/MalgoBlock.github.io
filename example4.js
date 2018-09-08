document.addEventListener('DOMContentLoaded', readyGo, false);
var diceList = ['fas fa-square', 'fas fa-dice-one', 'fas fa-dice-two', 'fas fa-dice-three', 'fas fa-dice-four', 'fas fa-dice-five', 'fas fa-dice-six'];
var diceTop = [0, 0, 0, 0, 0, 0];
var diceBottom = [0, 0, 0, 0, 0, 0];
var correctWires = []; //different numbers between 0 and difficulty level (2 to 6) min. 1, max.3
var difficulty = 4;
var currentBomb = 0;
var countClues = 0; // which wire is to be cut
var seconds = 100;
var countdownId = 0;

function readyGo() {
    var menu = document.getElementById('menuBomb');
    menu.style.fontWeight = 'bold';

    var start = document.getElementById('start');
    start.addEventListener('click', startNewGame);

    var up = document.getElementById('up');
    up.addEventListener('click', panelUp);

    var down = document.getElementById('down');
    down.addEventListener('click', panelDown);

    createBombs();
}

function panelUp() {
    var panel = document.getElementById('instructionsText');
    var rules = document.getElementById('gameRules');

    panel.style.height = '0px';
    rules.hidden = true;
}

function panelDown() {
    var panel = document.getElementById('instructionsText');
    var rules = document.getElementById('gameRules');

    panel.style.height = 'auto';
    rules.hidden = false;

}

function createBombs() {
    var gameArea = document.getElementById('gameArea');

    for (i = 0; i < 4; i++) {
        var wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.id = 'wrapper' + i;

        //create doors
        var doorLeft = document.createElement('div');
        doorLeft.className = 'door doorLeft';
        doorLeft.id = 'doorLeft' + i;

        var doorRight = document.createElement('div');
        doorRight.className = 'door doorRight';
        doorRight.id = 'doorRight' + i;

        //create door lock
        var lock = document.createElement('div');
        lock.id = 'lock' + i;
        lock.className = 'lock';
        var newLock = document.createElement('i');
        newLock.id = 'lockIcon' + i;
        newLock.className = 'fas fa-lock';

        lock.appendChild(newLock);
        wrapper.appendChild(lock);
        wrapper.appendChild(doorLeft);
        wrapper.appendChild(doorRight);
        
        gameArea.appendChild(wrapper);
    }

}

function dice(number, row) {
   
    var newDice = document.createElement('i');
    var nameId = row[number];
    newDice.className = diceList[nameId];
    return newDice;
}

function openDoors(event) {
    var lockId = event.currentTarget.id; //e.g. lock0

    var doorLeftId = 'doorLeft' + currentBomb;
    var doorRightId = 'doorRight' + currentBomb;
    var arrowId = 'arrow' + currentBomb + 0;

    var lock = document.getElementById(lockId);
    var doorLeft = document.getElementById(doorLeftId);
    var doorRight = document.getElementById(doorRightId);
    var arrow = document.getElementById(arrowId);

    doorLeft.style.width = 0;
    doorRight.style.width = 0;

    lock.hidden = true;

    if (difficulty > 1) {
        arrow.style.color = 'yellow';
        arrow.addEventListener('click', displayClue);
    }
}

function displayClue(event) {
    var arrow = event.currentTarget.id;
    var number = arrow.slice(5);
    var clueId = 'clue' + number;
    var clue = document.getElementById(clueId);
    var clueTextId = 'clueText' + number;
    var text = document.getElementById(clueTextId);
    
    clue.style.height = '25px';

    setTimeout(function () {
        text.hidden = false;
    }, 2000);
}

function startNewGame() {
    resetBoard();
    currentBomb = 0;
    countClues = 0;
    createBombs();
    armBomb(currentBomb);
    armBomb(1);
    armBomb(2);
    armBomb(3);
    seconds = 100;
    countdown();
}

function countdown() {
    var text = document.getElementById('timer');
    text.innerHTML = seconds;
    text.style.color = 'red';
    tick();

    function tick() {
        var startTime = new Date().getTime(); //time now in milliseconds
        var endTime = startTime + (1000 * seconds);
        text.innerHTML = seconds;
        start();

        function start() {
            countdownId = setInterval(count, 1000);
        }

        function count() {
            if (seconds > 0) {
                var now = new Date().getTime();
                var distance = endTime - now;
                var inSeconds = Math.floor(distance / 1000);
                seconds = inSeconds;
                text.innerHTML = seconds;
            } else {
                blowUp('Time is up!!!');
                text.style.color = 'forestgreen';
            }
        }
    }

}

function resetBoard() {
    message('Keep going until you manage to disarm all four bombs!', 'white', '1.4em');

    var gameBoard = document.getElementById('gameArea');

    for (i = 0; i < 4; i++) {
        var id = 'wrapper' + i;
        var wrapToGo = document.getElementById(id);
        gameBoard.removeChild(wrapToGo);
    }
}

function armBomb(id) {
    if (id == currentBomb) {
        var lockId = 'lock' + id;
        var lock = document.getElementById(lockId);
        lock.style.backgroundColor = 'green';

        var lockIconId = 'lockIcon' + id;
        var lockIcon = document.getElementById(lockIconId);
        lockIcon.className = 'fas fa-lock-open';

        lock.addEventListener('click', openDoors);
    }

    //create bomb 
    var diceNumber = difficulty;
    diceTop = [0, 0, 0, 0, 0, 0];
    diceBottom = [0, 0, 0, 0, 0, 0];

    for (i = 0; i < diceNumber; i++) {
        var newDiceTop = Math.floor(Math.random() * 6) + 1;
        var newDiceBottom = Math.floor(Math.random() * 6) + 1;

        diceTop.splice(i, 1, newDiceTop);
        diceBottom.splice(i, 1, newDiceBottom);
    }
    
    var wrapperId = 'wrapper' + id;
    var wrapper = document.getElementById(wrapperId);
    var newBomb = document.createElement('div');
    newBomb.id = 'bomb' + id;
    newBomb.className = 'bomb';

    //create first row of dice
    for (j = 0; j < 6; j++) {
        var newCube = document.createElement('div');
        newCube.id = 'cube' + id + j;
        newCube.className = 'dice';
        var newDice = dice(j, diceTop);
        newCube.appendChild(newDice);
        newBomb.appendChild(newCube);
    }
    //create wires
    for (k = 0; k < 6; k++) {
        var newWire = document.createElement('div');
        newWire.id = 'wire' + id + k;
        newWire.className = 'wire';
        if (k >= diceNumber) {
            newWire.className = 'wireHidden';
        } else {
            newWire.addEventListener('click', snapWire);
        }

        newBomb.appendChild(newWire);
    }

    //create second row of dice
    for (l = 0; l < 6; l++) {
        var newCube = document.createElement('div');
        var idNumber = l + 6;
        newCube.id = 'cube' + id + idNumber;
        newCube.className = 'dice';
        var newDice = dice(l, diceBottom);
        newCube.appendChild(newDice);
        newBomb.appendChild(newCube);
    }

    //create arrows
    for (m = 0; m < 3; m++) {
        var newArrow = document.createElement('div');
        newArrow.id = 'arrow' + id + m;
        newArrow.className = 'arrow';
        var newI = document.createElement('i');
        newI.className = 'fas fa-caret-down';
        newArrow.appendChild(newI);
        newBomb.appendChild(newArrow);
    }

    wrapper.appendChild(newBomb);

    //create clues
    if (id == currentBomb) {
        correctWires = [];
        var correctNumber = difficulty - 1;

        if (difficulty > 4) {
            correctNumber = 3;
        }

        for (o = 0; o < correctNumber; o++) {
            var position = Math.floor(Math.random() * difficulty);

            if (correctWires.length === 0) {
                correctWires.push(position);
            } else if (correctWires.length === 1) {
                while (position === correctWires[0]) {
                    position = Math.floor(Math.random() * difficulty);
                }
                correctWires.push(position);
            } else {
                while (position === correctWires[0] || position === correctWires[1]) {
                    position = Math.floor(Math.random() * difficulty);
                }
                correctWires.push(position);
            }
        }

        // correctWires holds between 0 and 3 positions of correct dice sets
        var results = [];

        for (p = 0; p < difficulty; p++) {
            if (difficulty < 5) {
                var result = diceTop[p] + diceBottom[p];
                results.push(result);
            } else {
                var result = diceTop[p] * diceBottom[p];
                results.push(result);
            }
        }

        

        for (n = 0; n < correctWires.length; n++) {
            var clue = document.createElement('div');
            clue.id = 'clue' + id + n;
            clue.className = 'clue';

            var position = correctWires[n];
            var currentResult = results[position];
            var order = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Last'];
            var orderCount = 0; //check for repeating results

            for (r = 0; r < position; r++) {
                if (results[position] == results[r]) {
                    orderCount += 1;
                }
            }

            var clueText = '';

            if (difficulty < 5) {
                clueText = order[orderCount] + ' ' + currentResult;
            } else {
                clueText = order[orderCount] + ' ' + currentResult + '*';
            }
            

            var newP = document.createElement('p');
            newP.innerHTML = clueText;
            newP.id = 'clueText' + id + n;
            newP.hidden = true;

            clue.appendChild(newP);
            wrapper.appendChild(clue);
    }

    }
      
}

function snapWire(event) {
    var wireId = event.currentTarget.id;
    var wire = document.getElementById(wireId);

    var resultId = wireId.slice(5);
   
     //check if the wire is correct;

    if (resultId == correctWires[countClues] || difficulty == 1) {
        wire.style.height = '15px';
        wire.style.backgroundColor = 'forestgreen';

        var currentWrapperId = 'wrapper' + currentBomb;
        var currentWrapper = document.getElementById(currentWrapperId);

        if (difficulty != 1) {
            var currentClueId = 'clue' + currentBomb + countClues;  
            var currentClue = document.getElementById(currentClueId);

            currentWrapper.removeChild(currentClue);

            var arrow1Id = 'arrow' + currentBomb + countClues;
            var arrow1 = document.getElementById(arrow1Id);
            arrow1.style.color = 'forestgreen';
            arrow1.removeEventListener('click', displayClue);

            countClues += 1;

            if (correctWires.length > countClues) {
                var arrow2Id = 'arrow' + currentBomb + countClues;
                var arrow2 = document.getElementById(arrow2Id);
                arrow2.style.color = 'yellow';
                arrow2.addEventListener('click', displayClue);
            }
        }

        if (correctWires.length == countClues || difficulty == 1) {
            currentWrapper.style.backgroundColor = 'forestgreen';
            nextBomb();
        }
    } else {
        blowUp('Wrong wire!!!');
    } 
}

function nextBomb() {
    if (currentBomb == 3) {
        message('Congratulations! You have won!', 'forestgreen', '2em');
        clearInterval(countdownId);
        
    } else {
        currentBomb += 1;
        countClues = 0;

        if ((currentBomb == 1 && seconds >= 75) || (currentBomb == 2 && seconds >= 50) || (currentBomb == 3 && seconds >= 25)) {
            difficulty += 1;
        } else {
            difficulty -= 1;
        }

        var wrapperId = 'wrapper' + currentBomb;
        var bombId = 'bomb' + currentBomb;

        var wrapper = document.getElementById(wrapperId);
        var bombToGo = document.getElementById(bombId);

        wrapper.removeChild(bombToGo);
        armBomb(currentBomb);
    }
}

function blowUp(text) {
    for (z = 0; z < difficulty; z++) {
        var wireNr = 'wire' + currentBomb + z;
        var wire = document.getElementById(wireNr);
        wire.removeEventListener('click', snapWire);
    }

    clearInterval(countdownId);

    for (x = 0; x < 4; x++) {
        var lock = document.getElementById('lock' + x);
        lock.hidden = true;
    }
    
    message('Game over!!! ' + text, 'red', '2em');
    explode('50%', '35%', '20em');
    explode('30%', '40%', '10em');
    explode('40%', '20%', '15em');
    explode('45%', '30%', '12em');
    explode('20%', '45%', '18em');
    explode('35%', '15%', '5em');
}

function message(text, color, fontSize) {
    var message = document.getElementById('message');
    message.innerHTML = text;
    message.style.color = color;
    message.style.fontSize = fontSize;
}

function explode(start, finish, size) {
    var gameArea = document.getElementById('gameArea');
    var explosion = document.createElement('div');
    explosion.className = 'explosion';
    var newI = document.createElement('i');
    newI.className = 'fas fa-haykal';
    explosion.appendChild(newI);
    gameArea.appendChild(explosion);
    explosion.style.color = 'yellow';
    explosion.style.fontSize = '1em';
    explosion.style.left = start;
    explosion.style.top = start;

    setTimeout(function () {
        explosion.style.color = 'red';
        explosion.style.fontSize = size;
        explosion.style.left = finish;
        explosion.style.top = finish;
    }, 100);

    setTimeout(function () {
        gameArea.removeChild(explosion);
    }, 5000);

}