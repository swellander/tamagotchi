import { Trivimon } from './../js/trivimon.js'

$(document).ready(function() {
    const castBtn = $('#cast-btn');
    const captureBtn = $('#capture-btn');
    const hpCount = $('#health-count');
    const potionsCount = $('#potions-count');
    const position = $('#position-indicator');


    const trivimon = new Trivimon('charmander');
    $('#type-selector').click(function() {
        trivimon.type = this.value;
        hpCount.text('HP: ' + trivimon.health);
        potionsCount.text('Potions: ' + trivimon.potions)
        position.html('<img src="https://cdn3.iconfinder.com/data/icons/universal-icons-3/1000/pokeball_A-128.png" alt="">');
    });

    castBtn.click(function() {
        trivimon.cast();
        position.html('<img src="https://img.pokemondb.net/sprites/x-y/normal/squirtle.png" alt="">');
        castBtn.attr('disabled', true);
        captureBtn.attr('disabled', false);

    });

    captureBtn.click(function() {
        trivimon.capture();
        captureBtn.attr('disabled', true);
        castBtn.attr('disabled', false);
        position.html('<img src="https://cdn3.iconfinder.com/data/icons/universal-icons-3/1000/pokeball_A-128.png" alt="">');
        
    })

})