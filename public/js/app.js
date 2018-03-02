(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _trivimon = require('./../js/trivimon.js');

$(document).ready(function () {
    $('#type-selector').click(function () {
        console.log(this.value);
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
        this.position = 'pokeball';
        this.evolution = 'charmander';
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
    }, {
        key: 'startAttacks',
        value: function startAttacks() {
            var _this = this;

            //Use fat arrow function so that this still refers to trivimon class and not sethealth()
            var wellBeingInterval = setInterval(function () {
                if (_this.trivimonAtZero() === true) {
                    console.log('CAPTURED!');
                    _this.capture();
                } else if (_this.position === 'world') {
                    _this.health--;
                    _this.checkEvolution();
                } else if (_this.position === 'pokeball') {
                    clearInterval(wellBeingInterval);
                    console.log('returned safely to pokeball');
                }
            }, 8000);
        }
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
            this.startAttacks();
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
            } else {
                console.log('YOU ARE OUT OF POTIONS');
            }
        }
    }]);

    return Trivimon;
}();

},{}]},{},[1]);
