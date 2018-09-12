// utility functions

function createNewElement(elementName, idName, className) {
    var element = document.createElement(elementName);
    element.className = className;
    element.id = idName;

    return element;
}

function clickListener(elementId, callFunction) {
    var element = document.getElementById(elementId);
    element.addEventListener('click', callFunction);
}