//Variable declaration======================================================================

//Button click sound
var bleep = new Audio();
bleep.src = "sounds/audi.mp3"

//Number of dates in months
var totalDates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//Names of Months
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


//Validation Part======================================================================
function resultDisplay() {

    //Get the user input NIC card number
    var idNumber = document.getElementById("idnum").value;

    //Check the 3 digits for use month & day
    var checkThreeOld = idNumber.substring(2, 5);
    var checkThreeNew = idNumber.substring(4, 7);

    //Check the last digit of the OLD NIC
    var checkV = idNumber.endsWith('V');
    var checkv = idNumber.endsWith('v');

    //Check the first digit of the NEW NIC
    var checkOne = idNumber.startsWith('1');
    var checkTow = idNumber.startsWith('2');

    //(idNumber.length == 10 && (checkV == true || checkv == true) && (checkThreeOld <= 866))

    //update(idNumber.length == 10 && (checkV == true || checkv == true) && (checkThreeOld <= 366 && checkThreeOld >= 501 || checkThreeOld <= 866))

    //Limits (366 <= y <= 501)  &&  (501 >= y <= 866)
    //Limits 366>=checkThreeOld && (501<=checkThreeOld && 866>=checkThreeOld)


    //Validation start here
    if (idNumber.length == 10 && (checkV == true || checkv == true) && checkThreeOld <= 866) {
        document.getElementById("errorId").innerHTML = "This is a OLD NIC";
        oldNIC(idNumber);
    } else if (idNumber.length == 12 && (checkOne == true || checkTow == true) && checkThreeNew <= 866) {
        document.getElementById("errorId").innerHTML = "This is a NEW NIC";
        newNIC(idNumber);
    } else {
        document.getElementById("errorId").innerHTML = "Please enter valid NIC number";
        document.getElementById("results").style.display = "none";
    }

}


//OLD NIC Functionality=================================================================
function oldNIC(idNumber) {

    //Get the First 2 digits(Birth year)
    var str = idNumber;
    var year = str.substring(0, 2);

    //Get the Next 3 digits in NIC(Birth month & day)
    var nextThreeDigits = parseInt(str.substring(2, 5));

    //Validate gender
    var gender = "Male";
    if (nextThreeDigits > 500) {
        nextThreeDigits -= 500;
        gender = "Female"; //If day value > 500 it means NIC owner is a female.
    }

    //Extract Birth month & day
    var total = 0;
    for (var i = 0; i <= totalDates.length; i++) {
        total += totalDates[i];
        if (nextThreeDigits <= total) {
            var month = months[i]; //Get the month
            var date = nextThreeDigits - (total - totalDates[i]); //Get the day
            break;
        }
    }

    //Start displaying values in form
    document.getElementById("results").style.display = "block";
    document.getElementById("birthday").innerHTML = '<i class="fas fa-birthday-cake"></i>' + ' ' + "19" + year + "/" + month + "/" + date;

    if (gender == "Male") {
        document.getElementById("gender").innerHTML = '<i class="fas fa-male"></i>' + ' ' + gender;
    } else {
        document.getElementById("gender").innerHTML = '<i class="fas fa-female"></i>' + ' ' + gender;
    }

}


//NEW NIC Functionality=================================================================
function newNIC(idNumber) {

    //Get the First 4 digits(Birth year)
    var str = idNumber;
    var year = str.substring(0, 4);

    //Get the Next 3 digits in NIC(Birth month & day)
    var nextThreeDigits = parseInt(str.substring(4, 7));

    //Validate gender
    var gender = "Male";
    if (nextThreeDigits > 500) {
        nextThreeDigits -= 500;
        gender = "Female"; //If day value > 500 it means NIC owner is a female.
    }

    //Extract Birth month & day
    var total = 0;
    for (var i = 0; i <= totalDates.length; i++) {
        total += totalDates[i];
        if (nextThreeDigits <= total) {
            var month = months[i]; //Get the month
            var date = nextThreeDigits - (total - totalDates[i]); //Get the day
            break;
        }
    }

    //Start displaying values in form
    document.getElementById("results").style.display = "block";
    document.getElementById("birthday").innerHTML = '<i class="fas fa-birthday-cake"></i>' + ' ' + year + "/" + month + "/" + date;

    if (gender == "Male") {
        document.getElementById("gender").innerHTML = '<i class="fas fa-male"></i>' + ' ' + gender;
    } else {
        document.getElementById("gender").innerHTML = '<i class="fas fa-female"></i>' + ' ' + gender;
    }

}

//Disabled Right Click=====================================================================
document.addEventListener('contextmenu', event => event.preventDefault());