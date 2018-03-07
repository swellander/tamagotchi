(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _trivimon = require('./../js/trivimon.js');

$(document).ready(function () {
    var castBtn = $('#cast-btn');
    var captureBtn = $('#capture-btn');
    var hpCount = $('#health-count');
    var potionsCount = $('#potions-count');
    var position = $('#position-indicator');
    var healthNotification = $('#health-notification');
    var trivia;
    var triviaQuestionIndex = 0;

    var nextQuestion = function nextQuestion() {
        triviaQuestionIndex++;
        $('#question-list li').remove();
        reloadQuestions(trivia[triviaQuestionIndex]);
    };

    var reloadQuestions = function reloadQuestions(trivia) {
        //randomize option order
        var nums = [0, 1, 2, 3],
            ranNums = [],
            i = nums.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(nums[j]);
            nums.splice(j, 1);
        }

        $('#question').html(trivia.question);
        var options = [];
        trivia.incorrect_answers.forEach(function (option) {
            options.push('<li class="option">' + option + '</li>');
        });
        options.push('<li class="option">' + trivia.correct_answer + '</li>');

        options.forEach(function (liQuestion, index) {
            $('#question-list').append(options[ranNums[index]]);
        });
    };

    //trivia api call
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple',
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function success(response) {
            trivia = response.results;
            reloadQuestions(trivia[triviaQuestionIndex]);
        },
        error: function error() {
            console.log('THERE WAS AN ERROR WITH AJAX REQUEST');
        }
    });

    var trivimon = new _trivimon.Trivimon('charmander');

    //render potion images
    for (var i = 0; i < trivimon.potions; i++) {
        potionsCount.prepend('<img style="width: 50px" class="potion" src="https://pro-rankedboost.netdna-ssl.com/wp-content/uploads/2016/08/Potion-Pokemon-Go.png" alt="">');
    }

    $('#type-selector').click(function () {
        trivimon.type = this.value;
        hpCount.text('HP: ' + trivimon.health);
        position.html('<img src="https://cdn3.iconfinder.com/data/icons/universal-icons-3/1000/pokeball_A-128.png" alt="">');
    });

    castBtn.click(function () {
        trivimon.cast();

        var healthInterval = setInterval(function () {
            if (trivimon.trivimonAtZero() === true) {
                trivimon.capture();
            } else if (trivimon.position === 'world') {
                trivimon.health--;
                hpCount.text('HP: ' + trivimon.health);
                healthNotification.html('<p style="color: red">-1</p>');
                trivimon.checkEvolution();

                setTimeout(function () {
                    healthNotification.html('');
                }, 1000);
            } else if (trivimon.position === 'pokeball') {
                clearInterval(healthInterval);
            }
        }, 6000);

        position.html('<img src="https://img.pokemondb.net/sprites/x-y/normal/squirtle.png" alt="">');
        castBtn.attr('disabled', true);
        captureBtn.attr('disabled', false);
    });

    captureBtn.click(function () {
        trivimon.capture();
        captureBtn.attr('disabled', true);
        castBtn.attr('disabled', false);
        position.html('<img src="https://cdn3.iconfinder.com/data/icons/universal-icons-3/1000/pokeball_A-128.png" alt="">');
    });

    $(document).on('click', 'img.potion', function () {
        trivimon.givePotion();
        hpCount.text('HP: ' + trivimon.health);
        healthNotification.html('<p style="color: green">+ potion</p>');
        setTimeout(function () {
            healthNotification.html('');
        }, 2000);

        this.remove();
    });

    //trivia question interfcace stuff
    $(document).on('click', '.option', function () {
        //if user clicks on correct answer:
        if ($(this).text() === trivia[triviaQuestionIndex].correct_answer) {
            //turn answer green
            $(this).addClass('correct');
            trivimon.potions++;
            //add another potion img
            potionsCount.prepend('<img style="width: 50px" class="potion" src="https://pro-rankedboost.netdna-ssl.com/wp-content/uploads/2016/08/Potion-Pokemon-Go.png" alt="">');
            $('#new-potion-indicator').text('+1');
            setTimeout(function () {
                $('#new-potion-indicator').text('');
            }, 1000);
        } else {
            $(this).addClass('red');
            setTimeout(function () {
                nextQuestion();
            }, 500);
        }
    });

    $('#next').click(function () {
        nextQuestion();
    });
});

},{"./../js/trivimon.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trivimon = exports.Trivimon = function () {
    function Trivimon(pokemon) {
        _classCallCheck(this, Trivimon);

        if (pokemon === 'charmander') {
            this.type = 'fire';
        }
        if (pokemon === 'squirtle') {
            this.type = 'water';
        }
        if (pokemon === 'bulbasaur') {
            this.type = 'grass';
        }
        this.position = 'pokeball';
        this.evolution = pokemon;
        this.health = 10;
        this.potions = 3;
    }

    _createClass(Trivimon, [{
        key: 'trivimonAtZero',
        value: function trivimonAtZero() {
            return this.health < 1;
        }
    }, {
        key: 'checkEvolution',
        value: function checkEvolution() {
            if (this.health < 11) {
                this.evolution = 'charmander';
            } else if (this.health < 21) {
                this.evolution = 'charmeleon';
            } else {
                this.evolution = 'charzard';
            }
        }

        // startAttacks() {

        //     //Use fat arrow function so that this still refers to trivimon class and not sethealth()
        //     const healthInterval = setInterval(() => {
        //         if (this.trivimonAtZero() === true) {
        //             this.capture();
        //         } else if (this.position === 'world') {
        //             this.health --;
        //             this.checkEvolution();
        //         } else if (this.position === 'pokeball') {
        //             clearInterval(healthInterval);
        //         }
        //     }, 8000);
        // }

    }, {
        key: 'sethealth',
        value: function sethealth(startingLevel) {
            this.health = startingLevel;
        }
    }, {
        key: 'cast',
        value: function cast() {
            if (this.trivimonAtZero()) {
                return 'Already at zero!';
            }
            this.position = 'world';
            // this.startAttacks()
        }
    }, {
        key: 'capture',
        value: function capture() {
            this.position = 'pokeball';
        }
    }, {
        key: 'givePotion',
        value: function givePotion() {
            if (this.potions > 0) {
                if (this.health < 26) {
                    this.health += 5;
                    this.potions--;
                } else {
                    this.health = 30;
                }
            } else {}
        }
    }]);

    return Trivimon;
}();

},{}]},{},[1]);
