# Tic Tac Toe!
## a CLI App

`npm i tictactoe-cli-game`

I took an object-oriented design approach to implment the classic game using node.js and readline-sync. 

A couple features of note:

- Matches, Games, Players, The Board, and Squares have been organized as classes.

- Each class is designed to track relevant state and provide relevant methods. For eaxample,  The Square class has a **marker** property that is set to "unused" by default but can also be marked as "human" or "computer". Another example of state is the **score** property which tracks computer wins and human wins.

- The computer's behavior has been programmed to choose a square based on the following rules:
  1) If there is an opportunity to win, take it
  2) If there is a threat, defend against it
  3) If the center square is available, take it
  4) If none of the above rules apply, choose a random available square

- Match play is set to best of 3 games

- The human player and the computer will take turns going first

Hope you enjoy!