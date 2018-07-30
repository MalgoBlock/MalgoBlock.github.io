document.addEventListener('DOMContentLoaded', onLoadFooter, false);

function onLoadFooter() {

    var footer = document.createElement('footer');
    var p = document.createElement('p');
    var container = document.getElementById('container')
    
    p.innerHTML = "@ Malgo Block";

    container.appendChild(footer);
    footer.appendChild(p);

}