//import "@components/Helpers/Wdyr/wdyr";
import React from "react";
import * as ReactDOM from "react-dom";



for (let i = 1; i <= 4; i++) {


    //console.log('inside loop');

    setTimeout(function () {

        console.log("there's i value - ", i)
    }, 100);
}



//
// function f1() {
//     let i = 12;
//
//     function f2() {
//         i--;
//     }
//     f2();
//     console.log(i);
//
// }
//
// f1();


// (function timer() {
//     var _loop = function (i) {
//         setTimeout(function clog() {
//             console.log(i.v);
//         }, i * 1000);
//     };
//
//     for (var i = { v: 1}; i.v <= 5; i.v++) {
//         _loop(i);
//     }
// })();


//import {HookTest} from "@components/T_Not Project Files/Hook/HookTest/HookTest";
import App from "@components/App/App";
import "animate.css";

ReactDOM.render(<App/>, document.getElementById("root"));
