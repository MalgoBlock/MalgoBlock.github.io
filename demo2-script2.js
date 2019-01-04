document.addEventListener('DOMContentLoaded', readyGo, false);

function readyGo() {

    // createMenu(); 

    //event listeners and value for background selector
    var background = document.getElementsByName('background-direction');

    for(var i=0; i<background.length; i++) {
        background[i].addEventListener('change', changeBackground);
    }

    setBackground();
    setRadio();

    //event listener and value for color selector
    var color = document.getElementById('colors');

    color.addEventListener('change', changeColor);

    setColor();
    setColorList();

}

function setRadio() {
    var direction = localStorage.getItem('backgroundDirection');

    if(direction == 'vertical') {
        var radio2 = document.getElementById('radio-vertical');
        radio2.checked = true;
    }
}


function changeBackground(event) {
    if (event.target.id == 'radio-vertical') {
        // set as vertical     
        localStorage.setItem('backgroundDirection', 'vertical');
    } else {
        // set as horizontal  
        localStorage.setItem('backgroundDirection', 'horizontal');    
    }

    setBackground();
}

function changeColor(event) {
    var color = document.getElementById('colors');
    
    for (var i=0; i<color.options.length; i++) {
        if (color.options[i].selected == true) {
            var newColor = color.options[i].value;
            localStorage.setItem('mainColor', newColor);
        }
    }

    setColor();
}

function setColorList() {
    var newColor = localStorage.getItem('mainColor');
    var color = document.getElementById('colors');
    
    for (var i=0; i<color.options.length; i++) {
        if (color.options[i].value == newColor) {
            color.options[i].selected = true;
        }
    }
}