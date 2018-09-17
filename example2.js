document.addEventListener('DOMContentLoaded', readyGo, false);
var currentOrder = [];
var cakeSelection = ['Blueberry cheesecake', 'Chocolate torte', 'Lemon tart', 'Pumpkin pie'];
var cakeColors = ['#582A72', '#802B15', '#FEA11D', '#F07D16'];
var maximumCake = '96';
var cakeAlert = 'The maximum order of any type of cake is 96 pieces or 16 whole cakes. Please adjust your quantity.';

function readyGo() {

    var footer = document.getElementById('footerText');
    footer.innerHTML = 'by Malgo Block - August 2018';

    createCakeTable();
    var clearOrder = document.getElementById('clearOrder');
    clearOrder.addEventListener('click', onPressClear);
}

function createCakeTable() {
    var table = document.getElementById('cakeList');
    //create head
    var head = document.createElement('thead');
    
    for (var i = 0; i < 4; i++) {
        var heading = document.createElement('th');
        var titles = [' ', 'whole cakes', 'cake pieces', ' '];

        if (i === 1 || i === 2) {
            heading.className = 'cakeQuantity';
        } else {
            heading.className = 'cakeList';
        }

        heading.innerHTML = titles[i];
        head.appendChild(heading);
    }

    table.appendChild(head);

    // add cake types from the list

    var body = document.createElement('tbody');
    
    for (var j = 0; j < cakeSelection.length; j++) {
        var row = document.createElement('tr');
        row.className = 'cakeList';
        for (var k = 0; k < 4; k++) {
            var cell = document.createElement('td');
            if (k === 1 || k === 2) {
                cell.className = 'cakeQuantity';
            } else {
                cell.className = 'cakeList';
            }
            
            row.appendChild(cell);
        }
        body.appendChild(row);
    }

    table.appendChild(body);

    // create two quantity selectors

    for (var l = 0; l < cakeSelection.length; l++) {
        table.rows[l].cells[0].innerHTML = cakeSelection[l];

        var quantityWhole = document.createElement('input');
        quantityWhole.type = 'number';
        quantityWhole.value = '0';
        quantityWhole.min = '0';
        quantityWhole.max = '3';
        quantityWhole.id = 'wholeCake' + l;

        table.rows[l].cells[1].appendChild(quantityWhole);

        var quantityPiece = document.createElement('input');
        quantityPiece.type = 'number';
        quantityPiece.value = '0';
        quantityPiece.min = '0';
        quantityPiece.max = '5';
        quantityPiece.id = 'cakePiece' + l;

        table.rows[l].cells[2].appendChild(quantityPiece);



        var add = document.createElement('button');
        add.className = 'cakeButton';
        add.innerHTML = 'add';
        add.value = l;
        
        add.addEventListener('click', onPressAdd);

        table.rows[l].cells[3].appendChild(add);    
    }

    

}

function onPressAdd(event) {
    var cakeList = document.getElementById('cakeList');
    
    var row = event.currentTarget.value;
     
    var cakeType = cakeList.rows[row].cells[0].innerHTML;
    // whole cakes quantity

    var quantityIdWhole = 'wholeCake' + row;
    var amountWhole = document.getElementById(quantityIdWhole).value;
        if (amountWhole === '') {
        amountWhole = 0;
    }

    // cake pieces quantity

    var quantityIdPiece = 'cakePiece' + row;
    var amountPiece = document.getElementById(quantityIdPiece).value;
    if (amountPiece === '') {
        amountPiece = 0;
    }

    // order details

    if ((amountWhole >= '0' && amountPiece >= '0') && (amountWhole != '0' || amountPiece != '0')) {
        var totalOrder = (parseInt(amountWhole, 10) * 6) + parseInt(amountPiece, 10);

        if (totalOrder > maximumCake) {
            displayMessage(cakeAlert);
        } else {
            addToOrder(cakeType, amountWhole, amountPiece);
        }
        
    } else {
        displayMessage('Please select desired quantity.')
    }
    
}

function addToOrder(cake, quantityWhole, quantityPiece) {
    var count = 0;

    var orderedCake = {
        name: cake,
        quantityWhole: parseInt(quantityWhole, 10),
        quantityPiece: parseInt(quantityPiece, 10)
    }

    if (currentOrder.length === 0) { // first item of the order

        currentOrder.push(orderedCake);

    } else {

        for (var i = 0; i < currentOrder.length; i++) {
            if (currentOrder[i].name === cake) { // if cake type already on the list then add quantity
                
                // cake pieces
                var currentQuantityPiece = parseInt(currentOrder[i].quantityPiece, 10);
                var addedQuantityPiece = parseInt(quantityPiece, 10);
                var newQuantity = currentQuantityPiece + addedQuantityPiece;
                // whole cakes
                var currentQuantityWhole = parseInt(currentOrder[i].quantityWhole, 10);
                var addedQuantityWhole = parseInt(quantityWhole, 10);

                var newTotalAmount = newQuantity + ((currentQuantityWhole + addedQuantityWhole) * 6);

                //check if adding more cake will result in going over maximum cake limit

                if (newTotalAmount > maximumCake) {
                    displayMessage(cakeAlert);
                } else {
                    // check if adding pieces will result in a whole cake
                    var newWholeCake = 0;

                    if (newQuantity > 5) {
                        newWholeCake = 1;
                        newQuantity = newQuantity - 6; //this can be 0
                    }

                    currentOrder[i].quantityPiece = newQuantity;

                    // add whole cakes
                    var newQuantityWhole = currentQuantityWhole + addedQuantityWhole + newWholeCake;
                    currentOrder[i].quantityWhole = newQuantityWhole;
                }

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
        var quantityWhole = currentOrder[j].quantityWhole;
        var quantityPiece = currentOrder[j].quantityPiece;
        var newPieces = quantityWhole * 6;
        totalCake = totalCake + newPieces + quantityPiece;
        newP.innerHTML = name + ' - ' + quantityWhole + ' whole cakes and ' + quantityPiece + ' cake pieces.'
        summary.appendChild(newP);
    }

    // total amount of ordered cake pieces
    var cakeTotal = document.createElement('p');
    if (totalCake === 0) {
        cakeTotal.innerHTML = 'You have not ordered any cake...'
    } else if (totalCake === 1) {
        cakeTotal.innerHTML = 'You have ordered only one piece of cake.'
    } else {
        cakeTotal.innerHTML = 'You have ordered a total of ' + totalCake + ' pieces of cake.'
        if (totalCake > 100) {
            cakeTotal.innerHTML = 'You have ordered a total of ' + totalCake + ' pieces of cake. That is a lot of cake! Yum!'
        }
    }
    
    summary.appendChild(cakeTotal);
    displayOrder(currentOrder, totalCake);
        
}

// display order as pie (cake) charts

function displayOrder(currentOrder, totalCake) { //currentOrder is an array containing cake types and quantities, totalCake is a sum of cake pieces in order

    clearCanvas();

    //divide currentOrder into individual cakes
    var wholeCakes = [];
    var remainingPieces = [];

    for (m = 0; m < currentOrder.length; m++) {
        var extractWhole = currentOrder[m].quantityWhole;
        if (extractWhole != '0') {
            for (n = 0; n < extractWhole; n++) {
                wholeCakes.push(currentOrder[m].name);
            }
        }
        var extractPieces = currentOrder[m].quantityPiece;
        if (extractPieces != '0') {
            for (o = 0; o < extractPieces; o++) {
                remainingPieces.push(currentOrder[m].name);
            }
        }
    }
    // draw whole cakes
    var cakeDisplay = document.getElementById('cakeDisplay');

    for (i = 0; i < wholeCakes.length; i++) {
        var cakeName = wholeCakes[i];
        for (j = 0; j < cakeSelection.length; j++) {
            if (cakeName === cakeSelection[j]) {
                var cakeColor = cakeColors[j];
            }
        }
        var cakeChart = document.createElement('canvas');
        cakeChart.id = 'cakeChart' + i;
        cakeChart.className = 'cakeCharts';
        cakeChart.width = 180;
        cakeChart.height = 180;
        var ctx = cakeChart.getContext('2d');
        cakeDisplay.appendChild(cakeChart);

        drawCakeSlice(ctx, 90, 90, 80, 0, 7, cakeColor);
    }

    // draw cake pieces
    var remainingAmount = Math.floor(remainingPieces.length / 6);
    var remainder = remainingPieces.length % 6
    if (remainder != '0') {
        remainingAmount += 1;
    }

    for (k = 0; k < remainingAmount; k++) {
        var start = k * 6;
        var end = start + 6;
        var pieces = remainingPieces.slice(start, end);

        var newChart = document.createElement('canvas');
        var newId = wholeCakes.length + k;
        newChart.id = 'cakeChart' + newId;
        newChart.className = 'cakeCharts';
        newChart.width = 180;
        newChart.height = 180;
        var ctx = newChart.getContext('2d');
        cakeDisplay.appendChild(newChart);

        for (l = 0; l < pieces.length; l++) {
            var cakeName = pieces[l];
            for (m = 0; m < cakeSelection.length; m++) {
                if (cakeName === cakeSelection[m]) {
                    var cakeColor = cakeColors[m];
                }
            }
            var startAngle = (Math.PI * 2 / 360) * l * 60;
            var endAngle = (Math.PI * 2 / 360) * (l + 1) * 60;
            drawCakeSlice(ctx, 90, 90, 80, startAngle, endAngle, cakeColor);

        }
    }



    
    function drawCakeSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }

  
}

function clearCanvas() {
    var cakeDisplay = document.getElementById('cakeDisplay');
    var canvasNumber = document.getElementsByClassName('cakeCharts'); //returns array
    var iterate = canvasNumber.length;

    for (i = 0; i < iterate; i++) {
        var canvasId = 'cakeChart' + i;
        var removeCanvas = document.getElementById(canvasId);
        cakeDisplay.removeChild(removeCanvas); // using .removeChild as IE doesn't support .remove
    }
}

function onPressClear() {
    currentOrder = [];
    clearCanvas();
    document.getElementById('orderSummary').innerHTML = '';
}