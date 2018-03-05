import { Trivimon } from './../js/trivimon.js';

$(document).ready(function() {
    const castBtn = $('#cast-btn');
    const captureBtn = $('#capture-btn');
    const hpCount = $('#health-count');
    const potionsCount = $('#potions-count');
    const position = $('#position-indicator');
    const healthNotification = $('#health-notification');
    var trivia;
    let triviaQuestionIndex = 0;

    const reloadQuestions = function(trivia) {
        //randomize option order
        var nums = [0, 1, 2, 3],
            ranNums = [],
            i = nums.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            ranNums.push(nums[j]);
            nums.splice(j,1);
        }

        $('#question').html(trivia.question);
        let options = [];
        trivia.incorrect_answers.forEach(function(option) {
            options.push(`<li class="option">${option}</li>`);
        })
        options.push(`<li class="option">${trivia.correct_answer}</li>`);

        options.forEach(function(liQuestion, index) {
            $('#question-list').append(options[ranNums[index]])
        }) 

    }

//trivia api call
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple',
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
            trivia = response.results;
            reloadQuestions(trivia[triviaQuestionIndex]);
        },
        error: function() {
            console.log('THERE WAS AN ERROR WITH AJAX REQUEST');
        }
    })



    const trivimon = new Trivimon('charmander');

    //render potion images
    for (let i = 0; i < trivimon.potions; i ++) {
        potionsCount.append('<img style="width: 50px" class="potion" src="https://pro-rankedboost.netdna-ssl.com/wp-content/uploads/2016/08/Potion-Pokemon-Go.png" alt="">')
    }
    
    $('#type-selector').click(function() {
        trivimon.type = this.value;
        hpCount.text('HP: ' + trivimon.health);
        position.html('<img src="https://cdn3.iconfinder.com/data/icons/universal-icons-3/1000/pokeball_A-128.png" alt="">');
    });

    castBtn.click(function() {
        trivimon.cast();


        const healthInterval = setInterval(() => {
            if (trivimon.trivimonAtZero() === true) {
                trivimon.capture();
            } else if (trivimon.position === 'world') {
                trivimon.health --;
                hpCount.text(trivimon.health);
                healthNotification.html('<p style="color: red">HP down by 1!</p>');
                trivimon.checkEvolution();

                setTimeout(function() {
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

    captureBtn.click(function() {
        trivimon.capture();
        captureBtn.attr('disabled', true);
        castBtn.attr('disabled', false);
        position.html('<img src="https://cdn3.iconfinder.com/data/icons/universal-icons-3/1000/pokeball_A-128.png" alt="">'); 
    })



    $('img.potion').click(function() {
        trivimon.givePotion();
        hpCount.text('HP: ' + trivimon.health);
        healthNotification.html('<p style="color: green">+ potion</p>');
        setTimeout(function() {
            healthNotification.html('');
        }, 2000);
        
        this.remove();
    })

        //trivia question interfcace stuff
    $(document).on('click', '.option', function() {
        if($(this).text() === trivia[triviaQuestionIndex].correct_answer) {
            $(this).addClass('correct');
        }

        else {
            console.log('WRONG');
        }
    });

    $('#next').click(function() {
        triviaQuestionIndex ++;
        $('#question-list li').remove();

        reloadQuestions(trivia[triviaQuestionIndex]);
    })


    
})


