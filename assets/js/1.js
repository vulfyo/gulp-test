"use strict";

function js_1(){
    alert("Hello 1");
    alert("Hello 1");
    alert("Hello 1");
    alert("Hello Javatpoint");
    alert("Hello Javatpoint");
}

var num = prompt("What number do you want to find the factorial of?")

var factorial = function(n) {
    if(n == 0) {
        return 1
    } else {
        var product = 1;
        for(i = 1; i <= n; i++) {
            product *= i;
        }
        return product;
    }
}

console.log(factorial(num));

//prompt user to enter a number to calculate the factorial
var num = prompt("What number do you want to find the factorial of?")

//recursive
var factorial = function(n) {
    if(n == 0) {
        return 1
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(num));

