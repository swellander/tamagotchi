import { Trivimon } from './../js/trivimon.js';

describe("Trivimon", function() {
    let trivimon = new Trivimon('charmander');

    beforeEach(function() {
        trivimon = new Trivimon('charmander');
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it ('Should be initialized with a type, an evolution, a position of pokeball and a WBL of 10', function() {
        expect(trivimon.type).toEqual('fire');
        expect(trivimon.wellBeingLevel).toEqual(10);
        expect(trivimon.position).toEqual('pokeball');
        expect(trivimon.evolution).toEqual('charmander');
    });

    it ('should recognize when trivimon wellBeingLevel is at zero', function() {
        expect(trivimon.trivimonAtZero()).toBe(false);
        
        trivimon.wellBeingLevel = 0;
        expect(trivimon.trivimonAtZero()).toBe(true);
    })

    it ("should change to appropriate position when cast out of pokeball", function() {
        trivimon.cast();
        expect(trivimon.position).toEqual('world');
    });

    it ('should change back to position: pokeball when captured', function() {
        trivimon.cast();
        trivimon.capture();

        expect(trivimon.position).toEqual('pokeball');
    })

    it ('WBL should drop by 1 every 8 seconds if not in pokeball', function() {
        trivimon.cast();
        jasmine.clock().tick(8001);
        expect(trivimon.wellBeingLevel).toEqual(9);
    });

    it ("WBL should not decrease if in pokeball", function() {
        trivimon.position = 'pokeball';
        jasmine.clock().tick(16001);
        trivimon.wellBeingLevel = 10;
    });

    it ("should change evolution according to WBL", function() {
        trivimon.wellBeingLevel = 10;
        trivimon.checkEvolution();
        expect(trivimon.evolution).toEqual('charmander');
        trivimon.wellBeingLevel = 15;
        trivimon.checkEvolution();
        expect(trivimon.evolution).toEqual('charmeleon');
        trivimon.wellBeingLevel = 28;
        trivimon.checkEvolution();
        expect(trivimon.evolution).toEqual('charzard');
    });

    it ("WBL should increase by 5 when given a potion", function() {
        trivimon.givePotion();
        expect(trivimon.wellBeingLevel).toEqual(15);
    });

    it ('WBL should cap at 30', function() {
        trivimon.wellBeingLevel = 30;
        trivimon.givePotion();
        expect(trivimon.wellBeingLevel).toEqual(30);
    });

    //still need to fix this :/
    it ('Should return to pokeball when WBL drops to 0', function() {
        trivimon.cast();
        expect(trivimon.position).toEqual('world');

        trivimon.wellBeingLevel = 0;
        jasmine.clock().tick(8001);
        expect(trivimon.position).toEqual('pokeball');
    })

    it ('should prevent a trivimon from being cast when WBL is already at 0', function() {
        trivimon.wellBeingLevel = 0;
        expect(trivimon.cast()).toEqual('Already at zero!');
    })

})