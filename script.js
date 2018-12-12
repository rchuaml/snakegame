gameBoard = document.querySelector("#gameCanvas");

//images
var img = new Image();
img.src = "image/grass.png";

var snakeRight = new Image();
snakeRight.src = "image/snakeRight.png";

var snakeLeft = new Image();
snakeLeft.src = "image/snakeLeft.png";

var snakeUp = new Image();
snakeUp.src = "image/snakeUp.png";

var snakeDown = new Image();
snakeDown.src = "image/snakeDown.png";

var mouse = new Image();
mouse.src = "image/mouse.gif";

var snakebody = new Image();
snakebody.src = "image/snakebody.png";

var pokeball = new Image();
pokeball.src = "image/pokeball.png"

var seconds = 10;

//access Powerup Through dom
var powerlog = document.querySelector("h2");

var ticker;

var interval;

var snakeHeadSize = 30;

var changingDirection = false;

var context = gameCanvas.getContext("2d");
//Natural direction from left to right
var dx = 30;
var dy = 0;

//log the number of mouse eaten
var score = 0;

//access score through dom
var scoreLog= document.querySelector("h1");

// //access Powerup Through dom
// var powerlog = document.querySelector("h2")

//coordinates of the food
var mouseX = 0;
var mouseY = 0;

//coordinates of the power-up
var runeX = -100;
var runeY = -100;

//speed of the game(timeout)
var speed = 130;

// Starting snake coordinates (3 parts)
var snake = [
    //head (first object in array)
    {x: 300, y: 300},
    {x: 270, y: 300},
    //tail (last object in array)
    {x: 240, y: 300},
]
// Head of snake
var head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
};

//Functions
var clearCanvas = function(){

    context.lineWidth = 3;
    context.clearRect(0,0, gameCanvas.width, gameCanvas.height);
    context.drawImage(img, gameCanvas.width, gameCanvas.height);
}

//takes in one set of coordinates for one part of snake and prints it on the board
var drawSnakePart = function(snakePart){
    context.fillStyle="rgb(148,67,143)";
    context.fillRect(snakePart.x, snakePart.y, 30, 30);

}

//draws the snake using the previous function and a loop
var drawSnake = function(){
    for(var i=0; i<snake.length; i++){
    drawSnakePart(snake[i]);
    }
    if(dx===30){
        context.clearRect(snake[0].x,snake[0].y, snakeHeadSize, snakeHeadSize);
        context.drawImage(snakeRight, snake[0].x, snake[0].y, snakeHeadSize, snakeHeadSize);
    }else if(dx===-30){
        context.clearRect(snake[0].x,snake[0].y, snakeHeadSize, snakeHeadSize);
        context.drawImage(snakeLeft,snake[0].x, snake[0].y, snakeHeadSize, snakeHeadSize);
    }else if(dy===-30){
        context.clearRect(snake[0].x,snake[0].y, snakeHeadSize, snakeHeadSize);
        context.drawImage(snakeUp,snake[0].x, snake[0].y, snakeHeadSize, snakeHeadSize);
    }else if(dy===30){
        context.clearRect(snake[0].x,snake[0].y, snakeHeadSize, snakeHeadSize);
        context.drawImage(snakeDown,snake[0].x, snake[0].y, snakeHeadSize, snakeHeadSize);
    }
}

var shorten = function(){
    var random = Math.random();
    if(random<0.333){
        powerlog.innerHTML = "Power Up!<br>Length shorten by 1<br>"
        snake.pop();
        setTimeout(function(){powerlog.innerHTML = "";}
            , 3000);
    }else if(random>0.666){
        powerlog.innerHTML = "Power Up!<br>Length shorten by 2<br>"
        snake.pop();
        snake.pop();
        setTimeout(function(){powerlog.innerHTML = "";}
            ,3000);

    }else{
        powerlog.innerHTML = "Power Up!<br>Length shorten by 3<br>"
        snake.pop();
        snake.pop();
        snake.pop();
        setTimeout(function(){powerlog.innerHTML = "";}
            ,3000);

    }
}


var moveSnake = function(){
    head = {
        x: snake[0].x + dx, y: snake[0].y + dy
    };
    snake.unshift(head);
    if(head.x==runeX&&head.y == runeY){
        var random = Math.random();
        if(random <=0.5){
            runeX = -100;
            runeY = -100;
            clearInterval(interval);
            speed = 220;
            movement();
            tickRune();
        }else{
            runeX = -100;
            runeY = -100;
            shorten();
        }
    }

    if(head.x==mouseX&&head.y == mouseY){
        score++;
        scoreLog.innerHTML = "Score: " + score;
        if(score%5===0){
            spawnRune();
            drawRune();
        }
generateFood();
    }else
    {
        snake.pop();
    }
}

var changeDirection = function(event) {
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    if(changingDirection == true){
        return;
    };
    changingDirection = true;
    //access the key that is pressed
    var keyPressed = event.keyCode;
    var goingUp = dy === -30;
    var goingDown = dy === 30;
    var goingRight = dx === 30;
    var goingLeft = dx === -30;

//Prevent the snake from reversing
    if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -30;
    dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -30;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 30;
    dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingDown) {
    dx = 0;
    dy = 30;
    }
}

var generateFood = function(){
    //generate a food coordinates x and y between 0 and 580 (multiples of 30).
    mouseX = Math.floor(Math.random()*20)*30;
    mouseY = Math.floor(Math.random()*20)*30;
    //to ensure that the food does not land in the snake
    for(var i = 0; i < snake.length ;i++){
        //if the coordinates of the food lands in the snake coordinates restart generate food
        if(mouseX === snake[i].x){
            generateFood();
        }else if (mouseY === snake[i].y){
            generateFood();
        }
    }
}

var spawnRune = function(){
    //generate a food coordinates x and y between 0 and 580 (multiples of 30).
    runeX = Math.floor(Math.random()*20)*30;
    runeY = Math.floor(Math.random()*20)*30;
    //to ensure that the food does not land in the snake
    for(var i = 0; i < snake.length ;i++){
        //if the coordinates of the powerup lands in the snake coordinates restart generate food
        if(runeX === snake[i].x||runeX===mouseX){
            spawnRune();
        }else if (runeY === snake[i].y||runeY===mouseY){
            spawnRune();
        }
    }
}

var gameOver = function(){
       var gameOverBox = document.createElement('div');
       gameOverBox.setAttribute("class", "endgame-lose");
       gameOverBox.innerHTML = "<br><br><br>Game Over!<br> Your Score is " +score +"<br> Click to restart!";
       document.body.appendChild(gameOverBox);
       document.querySelector('.endgame-lose').addEventListener("click", function(){
           document.location.reload();
       });
   }

//draw the powerup at rune coordinates
var drawRune = function(){
    context.drawImage(pokeball, runeX,runeY, 30, 30);
}


var drawMouse = function(){
    context.drawImage(mouse, mouseX, mouseY, 34, 34);
}

//check for endgame condition
var endGame = function(){
    //check if snake collide with itself
for(i=1;i<snake.length; i++){
if(head.x===snake[i].x&&head.y===snake[i].y){
        return true;
                }
    //check if snake collide on wall
else if(snake[0].x===0&&dx===-30||snake[0].x===570&&dx===30||snake[0].y===0&&dy===-30||snake[0].y===570&&dy===30){
            return true;
        }
    }
}

var tickRune = function(){
    seconds = 10;
ticker = setInterval(function(){
        powerlog.innerHTML = "Power Up!<br>Time slowdown<br>"+ seconds +"s left";
        seconds--;
        if(seconds ===-1){clearInterval(ticker);
            powerlog.innerHTML = "";
        }
},1000);
setTimeout(function(){
            clearInterval(interval);
            speed = 130;
            movement();
        }, 11000);
};

var movement = function(){
    interval = setInterval(function(){
        changingDirection = false;
        if(endGame() === true){
            document.removeEventListener("keydown", changeDirection);
            gameOver();
            clearInterval(interval);
            return;
        }
        clearCanvas();
        drawRune();
        drawMouse();
        moveSnake();
        drawSnake();
    }, speed);

}


//Movement

window.onload = function(){
    generateFood();
    movement();
    document.addEventListener("keydown", changeDirection);
}
