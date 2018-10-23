# Connect Four

## Playing the game 
A conect four game created using react. To start the game, run the command `npm start` in the connect-four folder. 

The game starts off as a blank grid. Clicking on a board location will place a piece on the lowest available circle in that column.
![Blank Board](screenshots/blank.png)


The game alternates between placing red and blue circles. 	
![Red and Blue pieces](screenshots/redblue.png)

A player wins upon placing 4 consecutive pieces of the same color in either the same
* Row
* Column
* Diagonal 

The game will also display a message at the bottom saying that the winner is either red or blue. 
![The game ends](screenshots/endgame.png "Blue wins the game")

## Customizing the game

To change the size of the board, set the value of the boardSize variable in App.js. By default boardSize is 8, but if `var boardSize = 4` then the board will look like 

![4x4 grid](screenshots/4.png)

and if `var boardSize = 12` then the board will look like 

![16x16 grid](screenshots/16.png)
