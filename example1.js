document.addEventListener('DOMContentLoaded', readyGo, false);

function readyGo() {

    var submit = document.getElementById('submit');
    submit.addEventListener('click', onPress);

    //set correct time constraint for date picker - from current date
    var today = new Date();
    var endDay = new Date();
    var addDays = 6; // to set end day in 6 days time
    endDay.setDate(today.getDate() + addDays);

    document.getElementById('date').setAttribute('min', returnDate(today));
    document.getElementById('date').setAttribute('max', returnDate(endDay));

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
        document.getElementById('bookingChart').rows[0].cells[j].innerHTML = displayDate;
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
    var gender = document.getElementsByName('gender'); //returns array
    var gender_value = '';
    var title = '';
    var mealSelect = document.getElementById('mealSelect');
    var meal = '';

    //establish gender (not required) and set title if gender provided:
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            gender_value = gender[i].value;
        }

        if (gender_value === 'male') {
            title = 'Mr'
        } else if (gender_value === 'female') {
            title = 'Mrs'
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
        alert('Please select a meal');
    } else if (date.validity.valid === false && mealSelect.validity.valid === true) {
        alert('Please provide desired date');
    } else {
        alert('Please provide desired date and select a meal');
    }  


    function displayInformation() {

        var bookingDetails = title + ' ' + name_value + ' requested booking for ' + meal + ' on: ' + date_value; 

        display.innerHTML = bookingDetails; 
        
        for (i = 1; i < 8; i++) {
            var checkDate = document.getElementById('bookingChart').rows[0].cells[i].innerHTML;
            var meals = ['breakfast', 'lunch', 'dinner'];

            if (date_value === checkDate) {
                for (j = 0; j < 3; j++) {
                    if (meals[j] === meal) {
                        if (document.getElementById('bookingChart').rows[j + 1].cells[i].innerHTML !== '') {
                            alert('Unfortunately this slot is already taken. Please change your booking request.');
                            display.innerHTML = bookingDetails + ' - unfortunately the booking has been rejected.';
                        } else {
                            document.getElementById('bookingChart').rows[j + 1].cells[i].innerHTML = name_value;
                        }

                    }
                }
            }
        }
    }
}
