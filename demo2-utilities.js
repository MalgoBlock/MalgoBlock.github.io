function setBackground() {
    var direction = localStorage.getItem('backgroundDirection');

    if(direction == null) {direction = 'horizontal'};
    
    var background = document.getElementById('background');
    background.className = 'body-wrap ' + direction;
}

function setColor() {
    var newColor = localStorage.getItem('mainColor');

    if(newColor == null) {newColor = 'purple'};

    var oldLink = document.getElementById('color-link');
    var newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = 'css/style-' + newColor + '.css';
    newLink.id = 'color-link'; 

    document.getElementsByTagName('head').item(0).replaceChild(newLink, oldLink);

}

// when loading menu dynamically the svg icons don't show at all.. looking for a solution...
// function createMenu() {
//         getSprite();
    
//         var container = document.getElementById('background');
//         var main = document.getElementsByTagName('main');
    
//         var menu = document.createElement('nav');
//         menu.className = 'menu';
    
//         var input = document.createElement('input');
//         input.type = 'checkbox';
//         input.className = 'menu__checkbox';
//         input.id = 'menu-toggle';
    
//         var label = document.createElement('label');
//         label.setAttribute('for', 'menu-toggle');
//         label.className = 'menu__button';
    
//         var svg1 = document.createElement('svg');
//         svg1.className = 'menu__icon menu__icon--visible';
//         // svg1.setAttribute('viewBox', '0 0 24 24');
//         var use1 = document.createElement('use');
//         use1.setAttribute("xlink:href", "#icon-menu");
        
//         var svg2 = document.createElement('svg');
//         svg2.className = 'menu__icon menu__icon--invisible';
//         var use2 = document.createElement('use');
//         use2.setAttribute('xlink:href', '#icon-x');
    
//         menu.appendChild(input);
//         svg1.appendChild(use1);
//         label.appendChild(svg1);
//         svg2.appendChild(use2);
//         label.appendChild(svg2);
//         menu.appendChild(label);
//         container.insertBefore(menu, main.item(0))
//     }
    
//     function getSprite() {
//         var ajax = new XMLHttpRequest();
//         ajax.open('GET', 'image/sprite.svg', true);
//         ajax.send();
//         ajax.onload = function(e) {
//             var div = document.createElement('div');
//             div.innerHTML = ajax.responseText;
//             document.body.insertBefore(div, document.body.childNodes[0]);
//         }
//     }