export class Trivimon {
    constructor(pokemon) {
        if (pokemon === 'charmander') {
            this.type = 'fire'
        }
        this.position = 'pokeball';
        this.evolution = 'charmander';
        this.wellBeingLevel = 10;

    }

    trivimonAtZero() {
        return this.wellBeingLevel < 1;
    }

    checkEvolution() {
        if (this.wellBeingLevel < 11) {
            this.evolution = 'charmander';
        } else if (this.wellBeingLevel < 21) {
            this.evolution = 'charmeleon';
        } else {
            this.evolution = 'charzard';

        }
    }

    startAttacks() {
        //Use fat arrow function so that this still refers to trivimon class and not setWellBeingLevel()
        const wellBeingInterval = setInterval(() => {
            console.log(this.wellBeingLevel);
            console.log('Timer is running!');
            if (this.trivimonAtZero()) {
                this.capture();
            } else if (this.position === 'world') {
                this.wellBeingLevel --;
                this.checkEvolution();
            } else if (this.position === 'pokeball') {
                clearInterval(wellBeingInterval);
                console.log('returned safely to pokeball');
            }
        }, 8000);
    }

    setWellBeingLevel(startingLevel) {
        this.wellBeingLevel = startingLevel;

    }

    cast() {
        this.position = 'world';
        this.startAttacks();
    }

    capture() {
        this.position = 'pokeball';
    }

    givePotion() {
        if (this.wellBeingLevel < 26) {
            this.wellBeingLevel += 5;
        } else {
            this.wellBeingLevel = 30;
        }
    }
}