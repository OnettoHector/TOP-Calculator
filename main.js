/* 13/09 00:38:20 HS 
-PARECE QUE LA PARTE FUNCIONAL YA FUNCA DE MARAVILLA HURRA!!!
-Lo proximo es arreglar la parte estética, y fijate que no se desborden los numeros del display cuando sean demasiados
Que cuando lleguen al borde vayan para abajo y estiren el display
 */

function add(numberOne,numberTwo){
    return numberOne+numberTwo;
}
function substract(numberOne,numberTwo){
    return numberOne-numberTwo;
}
function multiply(numberOne,numberTwo){
    return numberOne*numberTwo;
}
function divide(numberOne,numberTwo){
    return numberOne/numberTwo;
}
function operate(numberOne,numberTwo,operator){
    switch(operator){
        case '+':
            return add(numberOne,numberTwo);
            break;
        case '-':
            return substract(numberOne,numberTwo);
            break;
        case '*':
            return multiply(numberOne,numberTwo);
            break;
        case '/':
            return divide(numberOne,numberTwo);
            break;
    }
}
const calcDisplay = document.getElementById("calc-display-bottom");
const calcDisplayUpper = document.getElementById("calc-display-upper");
const calcNumberOperators = document.getElementsByClassName("calc-operator-number");
const calcOperators = document.getElementsByClassName("calc-operator");
const calcFunctionButtons = document.getElementsByClassName("function-buttons");
let firstNumber='';
let secondNumber='';
let result;
let selectedOperator;
let isFirstNumberSelected = false;
let isDisplayZero = true;

//Numbers mapping
for (i=0;i<10;i++){
    calcNumberOperators[i].addEventListener("click",(e) => {
        if (e.target.id === '0' && firstNumber != '' && selectedOperator === undefined)
        {
            firstNumber += '0'
        }
        else if (!isFirstNumberSelected && e.target.id != '0'){
        firstNumber += e.target.id;
        console.log("Primer numero: "+firstNumber);
    }
    if (isFirstNumberSelected && e.target.id === '0' && secondNumber === '')
    {
        console.log("Segundo numero es 0 al principio");
        secondNumber = '0'
        calcDisplay.textContent = secondNumber;
    }
            else if (isFirstNumberSelected && e.target.id === '0' && secondNumber != '')
        {
            secondNumber += '0'
            calcDisplay.textContent = secondNumber;
        }
        else if (isFirstNumberSelected && e.target.id != '0'){
            if (secondNumber === '0'){
                secondNumber = ''}
            secondNumber += e.target.id;
            calcDisplay.textContent = secondNumber;
            console.log("Segundo numero: "+secondNumber);
        }

        if (isDisplayZero && firstNumber != ''){
            calcDisplay.textContent = e.target.id;
            isDisplayZero = false;
            }
        else if (!isFirstNumberSelected && firstNumber != ''){
        calcDisplay.textContent = firstNumber;
        }
})
}

//Operators mapping
for (i=0;i<6;i++){
    calcOperators[i].addEventListener("click",(e) => {
        if (e.target.id === '=' && secondNumber != '' && selectedOperator != undefined && (secondNumber !='0' || selectedOperator != '/')){
            console.log("Resultado");
            calcDisplayUpper.textContent = parseFloat(parseFloat(firstNumber).toFixed(4))+selectedOperator+parseFloat(parseFloat(secondNumber).toFixed(4))+'=';
            result = operate(parseFloat(firstNumber,10),parseFloat(secondNumber,10),selectedOperator);
            console.log(result);
            calcDisplay.textContent = parseFloat(result.toFixed(4));
            firstNumber = result.toString();//Convierto a string para que funcionen las comparaciones de otras funciones
            secondNumber = '';
            selectedOperator = undefined;
        }
        else if (firstNumber != '' && e.target.id != '='  && e.target.id != '.'){
            if (selectedOperator != undefined && secondNumber != ''){
            firstNumber = operate(parseFloat(firstNumber,10),parseFloat(secondNumber,10),selectedOperator);
                calcDisplay.textContent = parseFloat(firstNumber.toFixed(4));
                firstNumber = firstNumber.toString();//Convierto a string para que funcionen las comparaciones de otras funciones
                secondNumber = '';}

        isFirstNumberSelected = true;
        selectedOperator = e.target.id;
        console.log(selectedOperator);
        calcDisplayUpper.textContent = parseFloat(parseFloat(firstNumber).toFixed(4))+selectedOperator;
    }
        if (e.target.id === '.' && firstNumber === ''){
        isDisplayZero = false;
        firstNumber += '0.'
        calcDisplay.textContent = firstNumber;
        }   
        else if (e.target.id === '.' && !firstNumber.includes('.') && firstNumber != '' && isFirstNumberSelected === false){
        console.log("emmmmm")
        firstNumber += '.'
        calcDisplay.textContent = firstNumber;
    }   
        if (e.target.id === '.' && secondNumber === '' && isFirstNumberSelected){
        isDisplayZero = false;
        secondNumber += '0.'
        calcDisplay.textContent = secondNumber;}
        else if (e.target.id === '.' && !secondNumber.includes('.') && secondNumber != '' && isFirstNumberSelected === true){
            console.log("emmmmm")
            secondNumber += '.'
            calcDisplay.textContent = secondNumber;
        }   

        
    })
    }

//Function buttons mapping
for (i=0;i<2;i++){
    calcFunctionButtons[i].addEventListener("click",(e) => {
        if(e.target.id === 'clear'){
            calcDisplay.textContent = '0';
            calcDisplayUpper.textContent = '';
            isDisplayZero = true;
            firstNumber = '';
            secondNumber = '';
            selectedOperator = undefined;
            isFirstNumberSelected = false;
        }
        else{
                if (!isFirstNumberSelected || selectedOperator === undefined || secondNumber === ''){
                if (firstNumber.length >= 1){
                console.log("entré aca!!! 1111")
                firstNumber = firstNumber.slice(0,-1);
                console.log(firstNumber);
                calcDisplay.textContent = firstNumber;
                }
                if (firstNumber === '' && (selectedOperator === undefined || isDisplayZero === false)){
                console.log("entré aca!!! 2222")
                calcDisplay.textContent = '0'
                firstNumber = '';
                isFirstNumberSelected = false;
                isDisplayZero = true;}
            }
                else{
                    if (secondNumber.length >= 1){
                        console.log("entré aca!!! 3333")
                        console.log(secondNumber.length);
                        secondNumber = secondNumber.slice(0,-1);
                        calcDisplay.textContent = secondNumber;
                        console.log(secondNumber);
                        }
                        else if (secondNumber === '')
                        console.log("entré aca!!! 4444")
                        calcDisplay.textContent = '0'
                        secondNumber = '';
                        isDisplayZero = true;
                }

            
        }
        })
    }