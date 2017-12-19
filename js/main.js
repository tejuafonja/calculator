function fitAnswerToScreen (input) {
    let inputText = input.innerHTML;
    const inputFontSize = 60;
    if (inputText.length > 10 && inputText.length <= 30) {
        let newFont = String((inputFontSize * 10) / inputText.length + 'px');
        input.style.fontSize = newFont ;
    } else  if (inputText.length > 30) {
        input.style.fontSize = '23px' ;
    } else  {
        input.style.fontSize = inputFontSize;
    }
}


const keys = document.querySelectorAll('#calculator button');
const operators = ['+', '-', 'x', '÷', '%'];
let decimalAdded = false;
let evalClicked = false;



for(var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {

        // Get the input and button values
        let input = document.querySelector('#answer');
        let inputVal = input.innerHTML;
        let btnVal = this.innerHTML;

        fitAnswerToScreen(input);

        if (operators.indexOf(btnVal) === -1 && btnVal !== 'AC' && inputVal === '0') {
            input.innerHTML = btnVal;

        } else if(btnVal === 'AC') {
            input.innerHTML = '0';
            decimalAdded = false;
        }

        else if(btnVal === '=') {
            let equation = inputVal;
            let lastChar = equation[equation.length - 1];

            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

            if(operators.indexOf(lastChar) > -1 || lastChar === '.')
                equation = equation.replace(/.$/, '');

            if(equation) {
                input.innerHTML = eval(equation);
                evalClicked = true;
            }

            decimalAdded = false;
        }

        // indexOf works only in IE9+
        else if(operators.indexOf(btnVal) > -1) {
            // Operator is clicked
            // Get the last character from the equation
            let lastChar = inputVal[inputVal.length - 1];

            // Only add operator if input is not empty and there is no operator at the last
            if(inputVal !== '' && operators.indexOf(lastChar) === -1)
                input.innerHTML += btnVal;

            // Allow minus if the string is empty
            else if(inputVal === '' && btnVal === '-')
                input.innerHTML += btnVal;

            // Replace the last operator (if exists) with the newly pressed operator
            if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }
            decimalAdded =false;
            evalClicked = false;
        }

        else if(btnVal === '.') {
            if(!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        }

        else {
            if (btnVal && evalClicked && operators.indexOf(btnVal) === -1 && btnVal !== 'AC') {
                input.innerHTML = btnVal;
                decimalAdded = false;
                evalClicked = false;

            } else if (operators.indexOf(btnVal) > -1) {
                input.innerHTML += btnVal;decimalAdded = false;
                evalClicked = false;

            } else {
                input.innerHTML += btnVal;
            }

        }

        // prevent page jumps
        e.preventDefault();
    }
}

