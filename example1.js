document.addEventListener('DOMContentLoaded', readyGo, false);

function readyGo() {

    var submit = document.getElementById('submit');
    submit.addEventListener('click', onPress);
    

    }


 
function onPress() {
    
    var name = document.getElementById('name');
    var date = document.getElementById('date');
    var display = document.getElementById('display');

    if (name.validity.valid === true) {
        display.innerHTML = 'Name: ' + name.value + ' , date of birth: ' + date.value;
    } else {
        alert('Please provide your information');
                }
    
}

