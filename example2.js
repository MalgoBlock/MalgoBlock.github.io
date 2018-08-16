document.addEventListener('DOMContentLoaded', readyGo, false);
var currentOrder = [];

function readyGo() {
    createCakeTable();
}

function createCakeTable() {
    var table = document.getElementById('cakeList');
    //create head
    var head = document.createElement('thead');
    
    for (var i = 0; i < 3; i++) {
        var heading = document.createElement('th');
        var titles = ['cake description', 'quantity', 'add'];
        heading.className = 'cakeList';
        heading.innerHTML = titles[i];
        head.appendChild(heading);
    }

    table.appendChild(head);

    var body = document.createElement('tbody');
    var cakeSelection = ['Blueberry cheesecake', 'Chocolate torte', 'Lemon tart'];

    for (var j = 0; j < cakeSelection.length; j++) {
        var row = document.createElement('tr');
        for (var k = 0; k < 3; k++) {
            var cell = document.createElement('td');
            cell.className = 'cakeList';
            row.appendChild(cell);
        }
        body.appendChild(row);
    }

    table.appendChild(body);

    for (var l = 0; l < cakeSelection.length; l++) {
        table.rows[l].cells[0].innerHTML = cakeSelection[l];

        var quantity = document.createElement('input');
        quantity.type = 'number';
        quantity.value = '0';
        quantity.min = '0';
        quantity.max = '12';
        quantity.id = 'cake' + l;

        table.rows[l].cells[1].appendChild(quantity);

        var add = document.createElement('button');
        add.className = 'cakeButton';
        add.innerHTML = 'add';
        add.value = l;
        
        add.addEventListener('click', onPressAdd);

        table.rows[l].cells[2].appendChild(add);    
    }

    

}

function onPressAdd(event) {
    var cakeList = document.getElementById('cakeList');
    var row = event.path[0].value;
    var cakeType = cakeList.rows[row].cells[0].innerHTML;
    var quantityId = 'cake' + row;
    var amount = document.getElementById(quantityId).value;

    var details = document.getElementById('orderDetails');

    if (amount === 1) {
        var toAdd = 'Added ' + amount + ' piece of ' + cakeType;
    } else {
        var toAdd = 'Added ' + amount + ' pieces of ' + cakeType;
    }
    

    details.innerHTML = toAdd;


    addToOrder(cakeType, amount);
}

function addToOrder(cake, quantity) {
    var count = 0;
    var orderedCake = {
        name: cake,
        quantity: parseInt(quantity, 10)
    }

    if (currentOrder.length === 0) { // first item of the order

        currentOrder.push(orderedCake);

    } else {

        for (var i = 0; i < currentOrder.length; i++) {
            if (currentOrder[i].name === cake) { // if cake type already on the list then add quantity
                var currentQuantity = parseInt(currentOrder[i].quantity, 10);
                var addedQuantity = parseInt(quantity, 10);
                var newQuantity = currentQuantity + addedQuantity;
                currentOrder[i].quantity = newQuantity;

            } else { // if cake not on the list add 1 to the counter

                count += 1;

            }
        }
    }

    if (currentOrder.length === count) {
        currentOrder.push(orderedCake);
    }

    var summary = document.getElementById('orderSummary');
    var totalCake = 0;
    //display order summary

    summary.innerHTML = ''; //clear current text

    for (var j = 0; j < currentOrder.length; j++) { //add new / revised order
        var newP = document.createElement('p');
        var name = currentOrder[j].name;
        var quantity = currentOrder[j].quantity;
        totalCake = totalCake + quantity;
        newP.innerHTML = name + ' - ' + quantity
        summary.appendChild(newP);
    }

    var cakeTotal = document.createElement('p');
    if (totalCake === 0) {
        cakeTotal.innerHTML = 'You have not ordered any cake...'
    } else if (totalCake === 1) {
        cakeTotal.innerHTML = 'You have ordered only one piece of cake.'
    } else {
        cakeTotal.innerHTML = 'You have ordered a total of ' + totalCake + ' pieces of cake.'
    }
    
    summary.appendChild(cakeTotal);
}