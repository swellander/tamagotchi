# Planning

1. ## Configuration/dependencies

    **gulp** - managing development tasks
    **browserify** - allow use of import/require statements
    **vinyl-source-stream** - mediate between Gulp and Browserify
    **gulp-concat** - concatenate files
    **gulp-uglify** - minify code for increased efficiency
    **gulp-util** - utility functions for gulp plugins
    **del** - help keep directories clean during development
    **gulp-jshint** keep me on my toes  

1. ## Specs

    1. _description_: should have a type, a health and an evolution on creation
    _input_: tammy.type
    _output_: "Ocelot"
    _input_: tammy.health
    _output_: 10

    2. _description_: health drops by 1 every 10 seconds
    (after 3 seconds)
    _input_: tammy.health
    _output_: 7

    3. Should change evolution to stage 2 if health drops below 7
        tammy.health = 6;

        expect: tammy.stage = 2;

    4. Evolution should change to stage 1 if health drops below 4
        tammy.health = 3

        expect: tammy.stage = 1;

    5. health should increase by 2 when given potions
        tammy.health = 5;
        tammy.givePotion()

        expect: tammy.health = 7

    6. health should cap at 10
        tammy.health = 9
        tammy.givePotion()

        expect: tammy.health = 10

    7. Should return to pokeball when health drops to 0
        tammy.health = 0

        expect: tammy.stage = "pokeball"

3. Integration

    List of HTML parts:
        - drop down menu to choose type of trivimon
        - health indicator
            - notification everytime trivimon health drops
        - # of potions indicator
        - position indicator
        - space for trivia questions
        - cast btn
        - capture btn
  * Initial routes or index pages with all dependencies in Controller/index.html head
  * Template/html page for ...
  * Template/html page for ...
  * Template/html page for ... (one for each route/integrated user story)
  * Display...
  * Integrate feature that... 

4. UX/UI
  * Include and modify bootstrap/materialize/Sass etc.
  * Develop custom style

5. Polish
  * Refactor minor portion of...
  * Delete unused...
  * Make README awesome
