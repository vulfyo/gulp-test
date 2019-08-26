"use strict";

function js_2(){
    var cities = ["Sydney", "London", "Auckland", "Tokyo", "Bangkok"];
    document.getElementById("msg").innerHTML = cities;
    var cities =  ["Sydney", "Tokyo", "Brisbane", "Auckland", "London", "Cairns"];
    cities.reverse();
    document.getElementById("msg").innerHTML = cities;
}
js_2();
