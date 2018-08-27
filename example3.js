document.addEventListener('DOMContentLoaded', readyGo, false);
var selectedColor = 'rgba(255, 255, 255, 0.1)';
var colorList = ['red', 'green', 'blue', 'orange', 'yellow', 'black'];
var activeRow;
var activeRowColor = 'white';
var inactiveRowColor = 'grey';
var activeSolution = [];

function readyGo() {
    drawElements();
    createActiveSolution();
}

function drawElements() {
    // display color picker
    var picker = document.getElementById('colorPicker');
    for (i = 0; i < 6; i++) {
        var newPicker = document.createElement('canvas');
        newPicker.width = 40;
        newPicker.height = 40;
        newPicker.id = 'colorPick' + i;
        newPicker.className = 'colorPicker';

        var colorId = colorList[i];
        drawFilledCircle(newPicker, colorId, 40, 15)
        
        picker.appendChild(newPicker);
        newPicker.addEventListener('click', pickColor);
    }

    // create game board
    var board = document.getElementById('gameBoard');

    for (k = 12; k > 0; k--) {
        var newRow = document.createElement('div');
        var rowNr = document.createElement('p');

        newRow.id = 'row' + k;
        newRow.className = 'gameRow';
        newRow.style.backgroundColor = inactiveRowColor;

        rowNr.innerHTML = k;
        rowNr.className = 'gameField';

 
        newRow.appendChild(rowNr);
        board.appendChild(newRow);
    
    for (j = 0; j < 6; j++) {
        var newField = document.createElement('canvas');
        newField.width = 40;
        newField.height = 40;
        newField.id = newRow.id + 'field' + j;
        newField.className = 'gameField';

        drawCircle(newField, 40, 15);

        newRow.appendChild(newField);
        }
        
        var button = document.createElement('button');
        button.innerHTML = 'check';
        button.id = newRow.id + 'button';
        newRow.appendChild(button);

        for (l = 0; l < 6; l++) {
            var newClue = document.createElement('canvas');
            newClue.width = 30;
            newClue.height = 30;
            newClue.id = newRow.id + 'clue' + l;
            newClue.className = 'gameField';

            drawCircle(newClue, 30, 10);

            newRow.appendChild(newClue);
        }
    } 

    setActiveRow('row1');

    var solution = document.getElementById('solution');
    var emptyP = document.createElement('p');
    emptyP.innerHTML = '00';
    emptyP.className = 'gameField';
    solution.appendChild(emptyP);

    for (m = 0; m < 6; m++) {
        var solutionField = document.createElement('canvas');
        solutionField.width = 40;
        solutionField.height = 40;
        solutionField.id = 'solutionField' + m;
        solutionField.className = 'gameField';

        drawCircle(solutionField, 40, 15);
        solution.appendChild(solutionField);
    }

    var button2 = document.createElement('button');
    button2.innerHTML = 'reveal';
    button2.id = 'reveal';
    solution.appendChild(button2);
    button2.addEventListener('click', revealSolution);
    
}

function createActiveSolution() {
    for (i = 0; i < 6; i++) {
        var number = Math.floor(Math.random() * 6);
        var color = colorList[number];
        activeSolution.push(color);
    }

    console.log(activeSolution);
}


function drawCircle(canvasId, canvasWidth, radius) {
    var ctx = canvasId.getContext('2d');
    var center = canvasWidth / 2;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawFilledCircle(canvasId, color, canvasWidth, radius) {
    var ctx = canvasId.getContext('2d');
    var center = canvasWidth / 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    canvasId.colorValue = color;
}

function fillCircle(event) {
    var id = event.currentTarget.id;
    var target = document.getElementById(id);
    var width = target.width;
    var radius = (width / 2) - 5;
    drawFilledCircle(target, selectedColor, width, radius);
}

function pickColor(event) {
    var color = event.currentTarget.colorValue;
    selectedColor = color;
}

function setActiveRow(rowId) {
    activeRow = rowId;
    var row = document.getElementById(rowId);
    row.style.backgroundColor = activeRowColor;

    for (i = 0; i < 6; i++) {
        var field = document.getElementById(rowId + 'field' + i);
        field.addEventListener('click', fillCircle);
    }

    var button = document.getElementById(rowId + 'button');
    button.addEventListener('click', checkRow);
   
}

function checkRow() { 

    //compare activeRow with activeSolution
    var correctPosition = 0;
    var correctColor = 0;

    var currentRow = [];
    var colorQuantitySolution = [];
    var colorQuantityCurrent = [];
    var count = 0;

    for (i = 0; i < 6; i++) {
        var field = document.getElementById(activeRow + 'field' + i);
        var fieldColor = field.colorValue;
        currentRow.push(fieldColor);
        }

    for (j = 0; j < 6; j++) {
        if (activeSolution[j] === currentRow[j]) {
            correctPosition += 1;
        }       
    }

    for (k = 0; k < 6; k++) {
        count = 0;
        activeSolution.forEach(function (element) {
            if (element === colorList[k]) {
                count += 1;
            }
        });
        colorQuantitySolution.push(count);
    }

    for (l = 0; l < 6; l++) {
        count = 0;
        currentRow.forEach(function (element) {
            if (element === colorList[l]) {
                count += 1;
            }
        });
        colorQuantityCurrent.push(count);
    }

    for (m = 0; m < 6; m++) {
        if (colorQuantitySolution[m] <= colorQuantityCurrent[m]) {
            correctColor += colorQuantitySolution[m];
        } else {
            correctColor += colorQuantityCurrent[m];
        }   
    }

    correctColor -= correctPosition;
    var clues = [];
    var countBlack = 0;

    for (n = 0; n < correctPosition; n++) {
        clues.push('black');
        countBlack += 1;
    }

    for (o = 0; o < correctColor; o++) {
        clues.push('white');
    }

    var checkIfFull = 0; //check if all the fields are filled
    

    for (u = 0; u < 6; u++) {
        checkIfFull += colorQuantityCurrent[u];
    }

    

    if (checkIfFull == 6) {

        for (p = 0; p < clues.length; p++) {
            var canvasId = activeRow + 'clue' + p;
            var canvas = document.getElementById(canvasId);
            drawFilledCircle(canvas, clues[p], 30, 10);
        }

        if (countBlack == 6) {
            deactivateRow();
            var row = document.getElementById(activeRow);
            row.style.backgroundColor = 'purple';

            var solutionRow = document.getElementById('solution');

            var message = document.createElement('p');
            message.innerHTML = 'Congratulation, you have found a correct solution!';
            message.className = 'gameField';
            message.id = 'winner';

            solution.appendChild(message);
            revealSolution();

        } else {
            deactivateRow();

            var rowNr = parseInt(activeRow.slice(3), 10);

            rowNr += 1;
            setActiveRow('row' + rowNr);
        }

    } else {
        alert('Please fill all the fields');
    }
}

function deactivateRow() {
    var row = document.getElementById(activeRow);
    row.style.backgroundColor = inactiveRowColor;

    for (i = 0; i < 6; i++) {
        var field = document.getElementById(activeRow + 'field' + i);
        field.removeEventListener('click', fillCircle);
    }

    var button = document.getElementById(activeRow + 'button');
    button.removeEventListener('click', checkRow);
}

function revealSolution() {
    for (i = 0; i < 6; i++) {
        var targetId = 'solutionField' + i;
        var target = document.getElementById(targetId);
        drawFilledCircle(target, activeSolution[i], 40, 15);
    }
}