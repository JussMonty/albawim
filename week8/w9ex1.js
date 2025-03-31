console.log("Hello");

function showGreetingMessage(){
    let name = window.prompt("What is your name?");
    window.alert("Hello " + name);
}

//showGreetingMessage();

document.querySelector('#btn').addEventListener('click' , showGreetingMessage);