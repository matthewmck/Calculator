var screen = document.getElementById("screen");
var clear = document.getElementById("clear");
var keys = document.getElementsByClassName('keys');

var str = '';
var num = '';
var operators = ['+', 'x', '/'];
var decimal = false;

Array.prototype.forEach.call(keys, function(e){
	e.addEventListener('click', function(){
	
		num = e.innerHTML;

		//If str is empty then prevent operators to be used.
		initialCheck();

		//If last and current character is an operator, delete last character.
		operatorCheck();
		
		//Prevent a number from having multiple decimals. 
		decimalCheck();

		//Perfrom calculation or append to str.
		displayResult();
	});
});

clear.addEventListener('click', function(){
	str = '';
	screen.innerHTML = str;
})

function initialCheck () {
	if (str.length == 0 && operators.indexOf(num) > -1) {
		num = '';
	}
}

function operatorCheck () {
	if (operators.indexOf(num) > -1 && str.slice(-1) == '-') {
		str = str.slice(0, -1);
	} else if (operators.indexOf(num) > -1 && operators.indexOf(str.slice(-1)) > -1) {
		str = str.slice(0, -1);
	}

	//Only allow one minus to be used for each number.
	if (num == '-' && str.slice(-1) == '-') {
		num = '';
	}
}

function decimalCheck () {
	//If an operator has been added to str allow the user to add a decimal.
	if (operators.indexOf(num) > -1 || num == '-') {
		decimal = false;
	}

	//one decimal per number.
	if (num == '.' && decimal == true) {
		num = '';
	} else if (num == '.') {
		decimal = true;
	}

}

function displayResult () {
	//If equal btn is pressed then preform calculation and display result.
	if (num == '=') {
		//If last character is an operator then delete it.
		if (operators.indexOf(str.slice(-1)) > -1 || str.slice(-1) == '-') {
			str = str.slice(0, -1);
		}
		str = str.replace(/x/g, '*');
		screen.innerHTML = eval(str);
	//If equal btn was not pressed then append num to str and display result.
	} else {
		str += num;
		screen.innerHTML = str;
	}
}
