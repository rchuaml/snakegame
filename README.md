#snakegame

Steps for my base game 1.) I used Canvas for HTML to do this snake program

2.) I built a 600 x 600 canvas for the borders of the game

3.) I added snake array and added a seperate snake head variable

4.) I iterated the snake array and a draw array function to draw the snake 

5.) Used a combination of unshifting the head and pop() for the snake for the movement

6.) Used an interval of 100ms to simulate the movement 

7.) I used a math.Random variable to generate the location of the food 

8.) Used a function to determine whether the game has ended by two scenerios(First is via head collision and second is collision with wall) 

9.) If the game has ended the whole movement sequence will end.

Additional stuff added to the game:

End game screen where you can click to restart the game.

Further 1: Create a powerup system that generates at set intervals 

Further 2: Generate a random powerup each time the user touches the powerup Add additional seconds to the interval and clearinterval() to simulate the slowdown of the snake movement 

Further 3: Create an additional powerup such that when the user picks up the powerup, it will remove a random number between 1-3 parts from the body, leaving the score unchanged
