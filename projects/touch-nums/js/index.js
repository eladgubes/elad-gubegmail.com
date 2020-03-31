'use strict'

var gModel = [];
var gCounter;
var gClockManager;
var gInGame = true;
var strClock;
var firstDigits;




function init(elLevel) {
    if (gInGame) {
        var numbersOfCubes = elLevel;
        gModel = buildNumbers(numbersOfCubes);
        gCounter = 0;
        var boardNumbers = buildBoard(numbersOfCubes);
        renderNumbers(boardNumbers);
    }
}




// build random numbers array


function renderNumbers(numbers) {
    var strHTML = '<table><tbody>';
    var tableLong = Math.sqrt(numbers.length);

    for (var i = 0; i < tableLong; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < tableLong; j++) {
            var index = j + i * tableLong;
            strHTML += `<td class = "number" onclick = "checkNumber(this)" >${numbers[index]}</td> `
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.gameBoard');
    elBoard.innerHTML = strHTML;
}


function buildBoard(num) {

    var numbersToBoard = [];
    var numbers = buildNumbers(num);

    for (var i = 0; i < num; i++) {
        var index = getRandomInt(0, numbers.length);
        var randomNumber = parseInt(numbers.splice(index, 1));
        numbersToBoard.push(randomNumber);
    }
    return numbersToBoard;
}


// build array of strait numbers

function buildNumbers(num) {

    var gameNumbers = [];
    for (var i = 0; i < num; i++) {
        gameNumbers.push(i + 1);
    }
    return (gameNumbers);
}


function checkNumber(elNumber) {
    var number = parseInt(elNumber.innerHTML);

    if (number === 1) {
        gInGame = false;
        clock();
    }

    if (number === gModel[gCounter]) {
        //update model
        gCounter++
        //update dom
        elNumber.classList.remove(number)
        elNumber.classList.add("touchNumber")
        if (number === gModel.length) {
            stopClock()
            endGame()
        }
    }


}


function clock() {
    var timeRange = 25
    var startClock = Date.now()
    gClockManager = setInterval(function () { renderClock(startClock); }, timeRange);

}


function renderClock(startClock) {

    var time = Date.now() - startClock;
    firstDigits = parseInt(time / 1000)
    var afterPointDigits = time % 1000

    strClock = `${firstDigits}:${afterPointDigits}`
    var elClock = document.querySelector('.clock')
    elClock.innerHTML = strClock

}

function stopClock() {
    clearInterval(gClockManager)
}



function endGame() {
    var endingMassage = '';

    if (firstDigits / gModel.length > 3) {
        endingMassage = `<div class = "level" >your time is ${strClock} nice work!</div>`
    } else if (firstDigits / gModel.length > 2) {
        endingMassage = `<div class = "level" >your time is ${strClock} very good!</div>`
    } else {
        endingMassage = `<div class = "level" >WOW! your time is ${strClock} that's AMAZING!</div>`
    }


    gInGame = true;
    endingMassage += '<div class = "level" >to start again press the level</div> '
    var elBoard = document.querySelector('.gameBoard')
    elBoard.innerHTML = endingMassage


}

// helpers

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}