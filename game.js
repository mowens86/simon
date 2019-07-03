
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern =[];
let userClickedPattern = [];
let level = 1;


// Random # function
const random = () => {
    return Math.floor(Math.random() * 4);
};

// Random color function
const randomColor = (e) => {
    return buttonColors[e];
};

//Fade in function
const fade = (e) => {
    let op = 1;  // initial opacity
    let timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
        }
        e.style.opacity = op;
        e.style.filter = `alpha(opacity=${op} * 100 )`;
    }, 50);
};

//Fade out function
const unfade = (e) => {
    let op = 0.1;  // initial opacity
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        e.style.opacity = op;
        e.style.filter = `alpha(opacity=${op} * 100 )`;
        op += op * 0.1;
    }, 10);
};

// Check which button was clicked
const buttonCheck = document.querySelectorAll( "#green, #red, #yellow, #blue" );

// Iterate through the buttons
for ( let i = 0 ; i < buttonCheck.length; i++ ) {
    
    // Check for a click in the buttons
    buttonCheck[i].addEventListener('click', function() {
        
        // Push the clicked buttons id into userClickedButton array
        userClickedPattern.push(buttonCheck[i].classList[1]);
        
        // Animate the button by adding "pressed" class
        buttonCheck[i].classList.add("pressed");
        
        // Create a function to remove the "pressed" class and make it last 100/1000 of a second to complete animation
        const animatePress = () => {
            buttonCheck[i].classList.remove("pressed");  
        };
        setTimeout(animatePress, 100);

        // Play audio sound for button pressed
        let audio = new Audio(`sounds/${buttonCheck[i].classList[1]}.mp3`);
        audio.play();

        // Check if the last item in the userClickedPattern array is correct
        checkAnswer(userClickedPattern.length - 1);
    });
}

// Start the game
document.onkeydown = function() {
    
    //Check if game has already started with Ternary Operator or switch statement
    //gamePattern.length === 0 ?  nextSequence() : ""; // --> Ternary Operator also works but switch statement is ideal
    switch (gamePattern.length === 0) {
        case true:
            
            // Call beginner count
            beginnerCount();

            // Wait for beginner countdown
            setTimeout(function() {
                nextSequence();
            }, 6000);
            break;
        default:
    }
    
};

// Create a checkAnswer function with an input of currentLevel
const checkAnswer = (currentLevel) => {

    // Create a nested if statement to check if the case is true for the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        // TESTING LOG
        //console.log("right");

        // Create if statement to check above steps answer and compare it to the patterns
        if (userClickedPattern.length === gamePattern.length) {

            // Set timer to call the next sequence after 1 second
            setTimeout(function() {
    
                // Call the next sequence
                nextSequence();
                }, 1000);
        }
    } else {
        // Play wrong.mp3 sound
        let audio = new Audio(`sounds/wrong.mp3`);
        audio.play(); 

        // Add game over class to the body of the document
        document.body.classList.add("game-over");

        // Create a function to remove the game over class to the body of the document
        const removeGameOver = () => {
            document.body.classList.remove("game-over");
        };

        // Set timer to remove gameover class after .2 seconds
        setTimeout(removeGameOver, 200);

        // Change H1 to Hit Any Key to Restart
        document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";

        // Restart game
        startOver();

        // TESTING LOG
        //console.log("wrong");
    }
    
    // TESTING LOGS
    //console.log(userClickedPattern);
    //console.log(gamePattern);   
};

// Initialize game
const nextSequence = () => {
    userClickedPattern = [];
    let randomNumber = random();
    let randomChosenColor = randomColor(randomNumber);
    let selectedColor = document.getElementById(randomChosenColor);
    
    // Push randomChosenColor to gamePattern array
    gamePattern.push(randomChosenColor);
    
    // Fade the block
    fade(selectedColor);
    unfade(selectedColor);

    // Play audio of selected color
    let audio = new Audio(`sounds/${randomChosenColor}.mp3`);
    audio.play();

    // Change h1 to level 1 and increment by 1 every time nextSequence is called
    document.getElementById("level-title").innerHTML = `Level ${level}`;
    level++;

    // TESTING LOGS
    //console.log(userClickedPattern);
    //console.log(gamePattern);
};

const startOver = () => {
    level = 1;
    gamePattern = [];
};

const beginnerCount = () => {
    // create a variable for time
    let timeLeft = 3;

    // create a setInterval function to countdown every 1000ms
    let downloadTimer = setInterval(function() {
        document.getElementById("level-title").innerHTML = `Start in ${timeLeft}!`;
        timeLeft--;

        // create an if statement to stop time if its less than zero
        if ( timeLeft < 0 ) {
            clearInterval(downloadTimer);
            document.getElementById("level-title").innerHTML = "Go!!!";
        }
    }, 1000);
};







