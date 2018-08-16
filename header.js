document.addEventListener('DOMContentLoaded', onLoadHeader, false);

function onLoadHeader() {

    var header = document.createElement('header');
    var h1 = document.createElement('h1');
    var container = document.getElementById('container')
    var body = document.getElementById('body');

    h1.innerHTML = "MB Demo website";
   
    container.insertBefore(header, body);
    header.appendChild(h1);

 
    var main = document.createElement('a')
    main.innerHTML = "Intro"
    main.href = "./index.html";
 

    var example1 = document.createElement('a')
    example1.innerHTML = "Booking form"
    example1.href = "./example1.html";

    var example2 = document.createElement('a')
    example2.innerHTML = "Ordering form"
    example2.href = "./example2.html";
   

    header.appendChild(main);
    header.appendChild(example1);
    header.appendChild(example2);
}