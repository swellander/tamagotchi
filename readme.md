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

    1. _description_: should have a type, a wellBeingLevel and an evolution on creation
    _input_: tammy.type
    _output_: "Ocelot"
    _input_: tammy.wellBeingLevel
    _output_: 10

    2. _description_: WBL drops by 1 every 10 seconds
    (after 3 seconds)
    _input_: tammy.wellBeingLevel
    _output_: 7

    3. Should change evolution to stage 2 if WBL drops below 7
        tammy.wellBeingLevel = 6;

        expect: tammy.stage = 2;

    4. Evolution should change to stage 1 if WBL drops below 4
        tammy.wellBeingLevel = 3

        expect: tammy.stage = 1;

    5. WBL should increase by 2 when given potions
        tammy.wellBeingLevel = 5;
        tammy.givePotion()

        expect: tammy.wellBeingLevel = 7

    6. WBL should cap at 10
        tammy.wellBeingLevel = 9
        tammy.givePotion()

        expect: tammy.wellBeingLevel = 10

    7. Should return to pokeball when WBL drops to 0
        tammy.wellBeingLevel = 0

        expect: tammy.stage = "pokeball"

3. Integration
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
