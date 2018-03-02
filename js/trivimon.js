export class Trivimon {
    constructor(pokemon) {
        if (pokemon === 'charmander') {
            this.type = 'fire'
        }
        this.position = 'pokeball';
        this.evolution = 'charmander';
        this.health = 10;
        this.potions = 3;

    }

    trivimonAtZero() {
        return this.health < 1;
    }

    checkEvolution() {
        if (this.health < 11) {
            this.evolution = 'charmander';
        } else if (this.health < 21) {
            this.evolution = 'charmeleon';
        } else {
            this.evolution = 'charzard';

        }
    }

    startAttacks() {

        //Use fat arrow function so that this still refers to trivimon class and not sethealth()
        const wellBeingInterval = setInterval(() => {
            if (this.trivimonAtZero() === true) {
                console.log('CAPTURED!')
                this.capture();
            } else if (this.position === 'world') {
                this.health --;
                this.checkEvolution();
            } else if (this.position === 'pokeball') {
                clearInterval(wellBeingInterval);
                console.log('returned safely to pokeball');
            }
        }, 8000);
    }

    sethealth(startingLevel) {
        this.health = startingLevel;

    }

    cast() {
        if (this.trivimonAtZero()) {
            return 'Already at zero!';
        }
        this.position = 'world';
        this.startAttacks();
    }

    capture() {
        this.position = 'pokeball';
    }

    givePotion() {
        if (this.potions > 0) {
            if (this.health < 26) {
                this.health += 5;
                this.potions --;
            } else {
                this.health = 30;
            }
        } else {
            console.log('YOU ARE OUT OF POTIONS');
        }
        
    }
}