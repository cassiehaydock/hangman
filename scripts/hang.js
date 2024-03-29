document.addEventListener("DOMContentLoaded", function () {
    //get canvas 
    const canvas = document.getElementById("gameCanvas");

    //draw the outline
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;

    ctx.beginPath();
    //big hoizontal
    ctx.moveTo(80, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
    //big vertical
    ctx.moveTo(80, 100);
    ctx.lineTo(80, 350);
    ctx.stroke();
    //small horizontal
    ctx.moveTo(50, 350);
    ctx.lineTo(120, 350);
    ctx.stroke();
    //small vertical
    ctx.moveTo(250, 100);
    ctx.lineTo(250, 120);
    ctx.stroke();

    //Generate word for hangman
    var category = document.getElementById("category");
    var words = new Array;
    const selection = Math.floor(Math.random() * 4);

    //animals
    if(selection == 0)
    {
        words = ['tiger', 'cat', 'dog', 'elephant', 'cheetah', 'lion', 'mouse', 'bird', 'platypus', 'alligator', 'crocodile', 'zebra', 'bear', 'mongoose'];
        category.innerHTML = "animals";
    }
    //objects
    else if(selection == 1)
    {
        words = ['glass', 'computer', 'blanket', 'remote', 'fork', 'television', 'desk', 'keyboard', 'retainer', 'umbrella', 'pillow', 'fan'];
        category.innerHTML = "objects";
    }//actions
    else if(selection == 2)
    {
        words = ['run', 'levitate', 'smile', 'cry', 'walk', 'jump', 'speak', 'fetch', 'teach', 'push', 'pull', 'study', 'sing'];
        category.innerHTML = "actions";
    }
    //countries
    else{
        words = ['canada', 'usa', 'syria', 'egypt', 'mexico', 'russia', 'portugal', 'england', 'turkey', 'australia', 'algeria', 'hungary', 'bahamas', 'argentina', 'bangladesh'];
        category.innerHTML = "countries";
    }

    const index = Math.floor(Math.random() * words.length);
    var chosen = words[index];

    //count number of letters correct
    let solved = 0;
    //count numbers of letters wrong
    let missed = 0;
    //create an array to hold the wrong guesses
    var allWrong = new Array;

    //slpit the chosen word into an array for each character
    var letters = chosen.split("");

    //create the lines for each letter
    const spaces = chosen.length;
    var lines = document.getElementById("lines");
    for (i = 0; i < spaces; i++) {
        const space = document.createElement("span");
        space.innerHTML = "___  ";
        space.id = i;
        lines.appendChild(space);
    }

    //get the letter guess
    let guessButton = document.getElementById("letter");

    //when the user click guess
    guessButton.onclick = function () {
        //get the letter guessed
        var guessedString = document.getElementById("guess").value;
        //get the error for if the user inputs more then one letter
        var error = document.getElementById("errorLetter");
        //get the erroe for if the letter is already guessed
        var alreadyGuessed = document.getElementById("alreadyGuessed");
        //get the container for all the letteres guessed
        var guessed = document.getElementById("guessed");
        //get the container which prompts to play again
        var done = document.getElementById("again");
        //get the container for the input
        var input = document.getElementById("input");

        //if only one letter is entered
        if (guessedString.length == 1) 
        {
            error.style.display = "none";

            //make the input lowercase
            var letter = guessedString.toLowerCase();

            //search for letter in array of letters
            var found = false;
            for (i = 0; i < spaces; i++) {
                //if the guessed letter is found in the array
                if (letters[i] == letter) {
                    //word has been found
                    found = true;
                    //don't display the alreadyGuessed error
                    alreadyGuessed.style.display = "none";
                    //get the correct space to put the letter
                    var temp = document.getElementById(i);
                    //if there isn't alreadya a letter there
                    if (temp.innerHTML != letter) {
                        //put the letter in the html
                        temp.innerHTML = letter;
                        //add to count for solved
                        solved += 1;
                    }

                    //if all letters are correctly guessed prompt to play again
                    if (solved == spaces) {
                        Solved();
                    }
                }
            }

            //wrong guesses
            if (found == false) {
                //if the letter hasn't already been guessed add it to wrong guesses container
                if (allWrong.indexOf(letter) == -1) {
                    //add letter to array for wrong guesses
                    allWrong.push(letter);
                    wrongLetter = letter + " ";
                    guessed.innerHTML += wrongLetter;
                    missed += 1;
                    alreadyGuessed.style.display = "none";
                }
                else {
                    alreadyGuessed.style.display = "block";
                }

                DrawMan(missed);
            }

        }
        //if its a word
        else if(guessedString.length > 1){

            error.style.display = "none";

            //make the input lowercase
            var word = guessedString.toLowerCase();

            //if the guessed word is the same as the chosen word
            if(word == chosen){
                //display the correct word
                for (i = 0; i < spaces; i++) {
                    var temp = document.getElementById(i);
                    temp.innerHTML = word[i];
                }
                Solved();
            }
            //if the word was wrong
            else{

                //if the word hasn't already been guessed add it to wrong guesses container
                if (allWrong.indexOf(word) == -1) {
                    //add word to array for wrong guesses
                    allWrong.push(word);
                    wrongWord = word + " ";
                    guessed.innerHTML += wrongWord;
                    missed += 1;
                    alreadyGuessed.style.display = "none";
                }
                else {
                    alreadyGuessed.style.display = "block";
                }

                DrawMan(missed);
            }
        }
        else {
            error.style.display = "block";
        }
    
        //function to deal with when the word is correctly solved
        function Solved(){
            var winner = document.getElementById("winner");
            input.style.display = "none";
            done.style.display = "block";
            winner.style.display = "block";
        }

        //function to draw the stick man for every wrong guess
        function DrawMan(missed){
            //add to the hangman
            switch (missed) {
                //head
                case 1:
                    ctx.moveTo(250, 170);
                    ctx.arc(250, 150, 30, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                    break;
                //body
                case 2:
                    ctx.moveTo(250, 100);
                    ctx.lineTo(250, 280);
                    ctx.stroke();
                    break;
                //left arm
                case 3:
                    ctx.moveTo(250, 200);
                    ctx.lineTo(220, 250);
                    ctx.stroke();
                    break;
                //right arm
                case 4:
                    ctx.moveTo(250, 200);
                    ctx.lineTo(280, 250);
                    ctx.stroke();
                    break;
                //left leg
                case 5:
                    ctx.moveTo(250, 280);
                    ctx.lineTo(240, 330);
                    ctx.stroke();
                    break;
                //right leg
                case 6:
                    ctx.moveTo(250, 280);
                    ctx.lineTo(270, 330);
                    ctx.stroke();
                    ctx.closePath();
                    break;
                //left eye
                case 7:
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(240, 150);
                    ctx.lineTo(230, 140);
                    ctx.stroke();
                    ctx.moveTo(240, 140);
                    ctx.lineTo(230, 150);
                    ctx.stroke();
                    break;
                //right eye
                case 8:
                    ctx.moveTo(270, 150);
                    ctx.lineTo(260, 140);
                    ctx.stroke();
                    ctx.moveTo(270, 140);
                    ctx.lineTo(260, 150);
                    ctx.stroke();
                    break;
                //mouth
                case 9:
                    ctx.moveTo(260, 170);
                    ctx.lineTo(240, 170);
                    ctx.stroke();
                    ctx.closePath();
                    break;
            }

            //if hangman is complete
            if (missed == 9) {
                //display the correct word
                for (i = 0; i < spaces; i++) {
                    var temp = document.getElementById(i);
                    temp.innerHTML = letters[i];
                }
                //prompt to play again
                var loser = document.getElementById("loser");
                input.style.display = "none";
                done.style.display = "block";
                loser.style.display = "block";
            }

        }

    }

    //when play again is pressed reload the screen
    var refresh = document.getElementById("refresh");
    refresh.onclick = function () {
        location.reload();
    }
});
