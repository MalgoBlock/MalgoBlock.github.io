document.addEventListener('DOMContentLoaded', onLoadSidebar, false);

function onLoadSidebar() {

    var sidebar = document.createElement('div');
    sidebar.id = "sidebar"
    var p = document.createElement('p');
    var body = document.getElementById('body')

    p.innerHTML = "html css JavaScript";

    body.appendChild(sidebar);
    sidebar.appendChild(p);

}