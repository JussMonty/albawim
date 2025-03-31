console.log("Hello")

function multiplicationOutput(){
    let number1 = document.querySelector("#firstNumber").value;
    let number2 = document.querySelector("#secondNumber").value;
    let number3 = number1 * number2
    document.querySelector("#output").textContent = "The multiplication of " 
    + number1 + " and " + number2 + " is " + number3;
}

document.querySelector("#btn").addEventListener("click", multiplicationOutput);