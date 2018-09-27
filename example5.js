document.addEventListener('DOMContentLoaded', readyGo, false);

function readyGo() {
    var menu = document.getElementById('animation');
    menu.style.fontWeight = 'bold';

    var footer = document.getElementById('footerText');
    footer.innerHTML = 'by Malgo Block - September 2018';

    var java = document.getElementById('tech2');
    var sidebar = document.getElementById('sidebar');

    sidebar.removeChild(java);
}
