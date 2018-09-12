document.addEventListener('DOMContentLoaded', readyGo, false);

function readyGo() {

    var footer = document.getElementById('footerText');
    footer.innerHTML = 'by Malgo Block - July 2018';

    var menu = document.getElementById('menuBooking');
    menu.style.fontWeight = 'bold';

    var submit = document.getElementById('submit');
    submit.addEventListener('click', onPress);

    var bookingChart = document.getElementById('bookingChart');

    //fall-back option for browsers not supporting date type
    var typeCheck = document.getElementById('date');

    if (typeCheck.type === 'date') {
        setConstraint();
    } else { //replace unsupported 'date' type with a drop down list of dates
        var newSelect = document.createElement('select');
        newSelect.id = 'date';
        newSelect.required = true;
        //add options
        var defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.innerHTML = '--Please select--';
        newSelect.appendChild(defaultOption);

        for (i = 0; i < 7; i++) {
            var option = document.createElement('option');
            var date = new Date();
            date.setDate(date.getDate() + i);
            var displayDate = returnDate(date); 
            option.value = displayDate;
            option.innerHTML = displayDate;
            newSelect.appendChild(option);
        }

        typeCheck.parentNode.replaceChild(newSelect, typeCheck);
    }

    //set correct time constraint for date picker - from current date
    function setConstraint() {
        var today = new Date();
        var endDay = new Date();
        var addDays = 6; // to set end day in 6 days time
        endDay.setDate(today.getDate() + addDays);

        document.getElementById('date').setAttribute('min', returnDate(today));
        document.getElementById('date').setAttribute('max', returnDate(endDay));
    }

    createTable(); //create booking table

}

function createTable() {
    var head = document.getElementById('bookingChartHead');


    for (var i = 0; i < 8; i++) {
        var heading = document.createElement('th');
        head.appendChild(heading);
    };

    for (var j = 1; j < 8; j++) {
        var date = new Date();
        var newDate = new Date();
        var k = j - 1;
        newDate.setDate(date.getDate() + k);
        var displayDate = returnDate(newDate); 
        bookingChart.rows[0].cells[j].innerHTML = displayDate;
    };

    var body = document.getElementById('bookingChartBody');

    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        var heading = document.createElement('th');

        var meals = ['Breakfast', 'Lunch', 'Dinner'];

        heading.innerHTML = meals[i];

        row.appendChild(heading);
        
        for (var j = 0; j < 7; j++) {
            var cell = document.createElement('td');
            row.appendChild(cell);
        }

        body.appendChild(row);

    }


    //check the time of the day to determine if bookings for breakfast and lunch can still be taken

    var currentTime = date.getHours();

    if (currentTime > 10) {
        bookingChart.rows[1].cells[1].innerHTML = 'finished';
    }

    if (currentTime > 15) {
        bookingChart.rows[2].cells[1].innerHTML = 'finished';
    }

}

function returnDate(someDate) {
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var yyyy = someDate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    someDate = yyyy + '-' + mm + '-' + dd;

    return someDate;
}

 
function onPress() {

    var name = document.getElementById('name');
    var name_value = '';
    var date = document.getElementById('date');
    var date_value;
    var display = document.getElementById('display');
    var menuType = document.getElementsByName('menuType'); //returns array
    var menuType_value = '';
    var mealSelect = document.getElementById('mealSelect');
    var meal = '';


    //establish selected menu type (not required)
    for (var i = 0; i < menuType.length; i++) {
        if (menuType[i].checked) {
            menuType_value = ' Customer requested ' + menuType[i].value + ' menu';
        }
    }

    //check if the name is provided (not required):
    name_value = name.value;

    if (name_value === 'Aa' || name_value === '') {
        name_value = 'Customer';
    }


    //check if date is provided and meal is selected (both required):
    if (date.validity.valid === true && mealSelect.validity.valid === true) {
        date_value = date.value;
        meal = mealSelect.value;
        displayInformation();
    } else if (date.validity.valid === true && mealSelect.validity.valid === false) {
        displayMessage('Please select a meal');
    } else if (date.validity.valid === false && mealSelect.validity.valid === true) {
        displayMessage('Please provide desired date');
    } else {
        displayMessage('Please provide desired date and select a meal');
    }


    function displayInformation() {

        var bookingDetails = name_value + ' requested booking for ' + meal + ' on: ' + date_value + '.' + menuType_value;
        display.innerHTML = bookingDetails;

        for (i = 1; i < 8; i++) {
            var checkDate = document.getElementById('bookingChart').rows[0].cells[i].innerHTML;
            var meals = ['breakfast', 'lunch', 'dinner'];

            if (date_value === checkDate) {
                for (j = 0; j < 3; j++) {
                    if (meals[j] === meal) {
                        if (bookingChart.rows[j + 1].cells[i].innerHTML === '') {

                            bookingChart.rows[j + 1].cells[i].innerHTML = name_value;

                        } else if (i === 1 && bookingChart.rows[j + 1].cells[i].innerHTML === 'finished') {

                            displayMessage('Unfortunately the meal you are wanting to book is already finished for today. Please change your booking request.');
                            display.innerHTML = bookingDetails + ' - unfortunately the booking has been rejected.';

                        } else {

                            displayMessage('Unfortunately this slot is already taken. Please change your booking request.');
                            display.innerHTML = bookingDetails + ' - unfortunately the booking has been rejected.';

                        }

                    }
                }
            }
        }
    }
}