'use strict';
console.log('traffic light');

var backGroundColor = function(color){
    return {'backgroundColor':color};
}
var simonSezConfig = (function(){
    var clickedColor = 'black';
    var simonSpeed = 1000;
    var simonNumberOfMoves = 5;
    var simonStarted = false;
    return {
        getClickedColor: function() { return clickedColor; },
        setClickedColor: function( val ) { clickedColor = val; },
        getSpeed: function() { return simonSpeed; },
        getMoves: function() { return simonNumberOfMoves; },
        hasSimonStarted: function() { return simonStarted; },
        setSimonStarted: function(val) { simonStarted = val },
        increaseSpeed: function() {
            simonSpeed = simonSpeed - 50;
            if (simonSpeed < 250){
                simonSpeed = 250;
            }
        },
        decreaseSpeed: function() {
            simonSpeed = simonSpeed + 50;
            if (simonSpeed > 1500){
                simonSpeed = 1500;
            }
        },
        increaseMoves: function() {
            simonNumberOfMoves = simonNumberOfMoves + 3;
        },
        decreaseMoves: function() {
            simonNumberOfMoves = simonNumberOfMoves - 3;
            if (simonNumberOfMoves < 1){
                simonNumberOfMoves = 1;
            }
        }
    };
}());
var timeOutLater = function(lightStr, i){
    function timeout(){
        console.log("In timeout with lightStr "+lightStr);
        $(lightStr).trigger( "click" );
    }
    return setTimeout(timeout,i * 1000);
}

var counter = (function() {
    var i = 0;
    return {
        get: function() { return i; },
        set: function( val ) { i = val; },
        increment: function() {
            return ++i;
        }
    };
}());

var lightArray = ["#redLight","#blueLight","#greenLight","#yellowLight"];
var clickedLight = 'black';

var simonMoves = new Array();
var playerMoves = new Array();

function turnLightsOff() {
    $('#stopLight').css(backGroundColor('black'));
    $('#slowLight').css(backGroundColor('black'));
    $('#goLight').css(backGroundColor('black'));
}

function changeLight(light, color) {
    $(light).css('backgroundColor', color);
}
function turnRed() {
    console.log("redClicked");
    $("#sound-1")[0].play();
    $('#redLight').css(backGroundColor(clickedLight));
    setTimeout(function() { return function() {
        $('#redLight').css(backGroundColor('red'));
    };
    }(),500);
    if (!simonSezConfig.hasSimonStarted()){
        playerMoves.push('#redLight');
        console.log("player moves "+playerMoves);
    }

}

function turnYellow() {
    console.log("yellowClicked");
    $("#sound-2")[0].play();
    $('#yellowLight').css(backGroundColor(clickedLight));
    setTimeout(function() { return function() {
        $('#yellowLight').css(backGroundColor('yellow'));
    };
    }(),500);
    if (!simonSezConfig.hasSimonStarted()){
        playerMoves.push('#yellowLight');
        console.log("player moves "+playerMoves);
    }
}

function turnGreen() {
    console.log("greenClicked");
    $("#sound-3")[0].play();
    $('#greenLight').css(backGroundColor(clickedLight));
    setTimeout(function() { return function() {
        $('#greenLight').css(backGroundColor('green'));
    };
    }(),500);
    if (!simonSezConfig.hasSimonStarted()){
        playerMoves.push('#greenLight');
        console.log("player moves "+playerMoves);
    }
}

function turnBlue() {
    console.log("blueClicked");
    $("#sound-4")[0].play();
    $('#blueLight').css(backGroundColor(clickedLight));
    setTimeout(function() { return function() {
        $('#blueLight').css(backGroundColor('blue'));
    };
    }(),500);
    if (!simonSezConfig.hasSimonStarted()){
        playerMoves.push('#blueLight');
        console.log("player moves "+playerMoves);
    }
}

function startSimon(){
    if (!simonSezConfig.hasSimonStarted()){
        simonSezConfig.setSimonStarted(true);
        playerMoves = new Array();
        for (var i = 1; i <= simonSezConfig.getMoves(); i++){
            var lightStr = _.sample(lightArray);
            setTimeout(function(x,lightStr) { return function() {
                //console.log("lightStr => "+lightStr);
                simonMoves.push(lightStr);
                $(lightStr).trigger( "click" );
            };
            }(i,lightStr), 1000*i);
        }
        setTimeout(function() { return function() {simonSezConfig.setSimonStarted(false);};}(), (simonSezConfig.getMoves()+1)*2000);
    }
}

function checkPlayerMoves(){
    var diff = _.difference(simonMoves, playerMoves);
    if (diff.length > 0){
        console.log(diff);
        console.log("Lose");
        alert('You Lose!');
    } else {
        console.log(diff);
        console.log("Win");
        alert('You Win!');
        simonSezConfig.increaseMoves();
        simonSezConfig.increaseSpeed();
    }
    simonMoves = new Array();
}

$(document).ready(function() {

    $('#redLight').css(backGroundColor('red'));
    $('#redLight').click(turnRed);
    $('#blueLight').css(backGroundColor('blue'));
    $('#blueLight').click(turnBlue);
    $('#greenLight').css(backGroundColor('green'));
    $('#greenLight').click(turnGreen);
    $('#yellowLight').css(backGroundColor('yellow'));
    $('#yellowLight').click(turnYellow);
    $('#startSimon').click(startSimon);
    $('#submitMovesButton').click(checkPlayerMoves);

    setTimeout(function() { return function() {console.log("simon moves "+simonMoves);};}(), (simonSezConfig.getMoves()+1)*1000);


});

