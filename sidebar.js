document.addEventListener('DOMContentLoaded', onLoadSidebar, false);

function onLoadSidebar() {

    var sidebar = document.createElement('div');
    sidebar.id = "sidebar"
    sidebar.className = "sidebar";

    var tech = ['Html', 'CSS', 'JavaScript'];

    for (i=0; i<3; i++) {
    var p = document.createElement('p');
    var body = document.getElementById('body')

    p.innerHTML = tech[i];
    p.id = 'tech' + i;
    sidebar.appendChild(p);
    }

    body.appendChild(sidebar);
}