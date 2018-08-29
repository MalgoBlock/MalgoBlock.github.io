function displayMessage(content) {
    var body = document.getElementById('body');
    var messageBox = document.createElement('div');
    var span = document.createElement('span');
    var text = document.createElement('p');

    messageBox.id = 'messageBox';
    span.id = 'closeButton';

    span.innerHTML = '&times;'
    text.innerHTML = content;

    
    messageBox.appendChild(span);
    messageBox.appendChild(text);
    body.appendChild(messageBox);

    span.addEventListener('click', removeBox);
}

function removeBox() {
    var body = document.getElementById('body');
    var box = document.getElementById('messageBox');
    body.removeChild(box);
}

