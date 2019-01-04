document.addEventListener('DOMContentLoaded', onLoadHeader, false);

function onLoadHeader() {

    var header = document.createElement('header');
    var h1 = document.createElement('h1');
    var container = document.getElementById('container')
    var body = document.getElementById('body');
    var span1 = document.createElement('span');
    span1.className = 'heading-main';
    var span2 = document.createElement('span');
    span2.className = 'heading-sub';
    span1.innerHTML = 'Malgo Block ';
    span2.innerHTML = '- programming journey';
    h1.appendChild(span1);
    h1.appendChild(span2);

    container.insertBefore(header, body);
    header.appendChild(h1);

 
    var main = document.createElement('a')
    main.innerHTML = "Intro"
    main.href = "./index.html";
 

    var example1 = document.createElement('a')
    example1.innerHTML = "Booking form";
    example1.id = 'menuBooking';
    example1.href = "./example1.html";

    var example2 = document.createElement('a')
    example2.innerHTML = "Ordering form";
    example2.id = 'menuOrdering';
    example2.href = "./example2.html";

    var example3 = document.createElement('a')
    example3.innerHTML = "Mastermind";
    example3.id = 'menuMastermind';
    example3.href = "./example3.html";

    var example4 = document.createElement('a')
    example4.innerHTML = "Bomb disposal";
    example4.id = 'menuBomb';
    example4.href = "./example4.html";

    var example5 = document.createElement('a')
    example5.innerHTML = 'CSS Animation';
    example5.id = 'animation';
    example5.href = "./example5.html";

    var demo2 = document.createElement('a')
    demo2.innerHTML = 'DEMO2 - CSS';
    demo2.id = 'demo2';
    demo2.href = "./demo2-index.html";

    header.appendChild(main);
    header.appendChild(example1);
    header.appendChild(example2);
    header.appendChild(example3);
    header.appendChild(example4);
    header.appendChild(example5);
    header.appendChild(demo2);
}