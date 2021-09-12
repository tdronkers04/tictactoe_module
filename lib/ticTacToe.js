const emoji = require('node-emoji');
const rlSync = require('readline-sync');

function prompt(msg) {
  console.log(`=> ${msg}`);
}

class Square {
  static UNUSED_SQAURE = '  ';
  static HUMAN_MARKER = emoji.get('man');
  static COMPUTER_MARKER = emoji.get('robot_face');

  constructor(marker = Square.UNUSED_SQAURE) {
    this.marker = marker;
  }
  toString() {
    return this.marker;
  }
  setMarker(marker) {
    this.marker = marker;
  }
  isUnused() {
    return this.marker === Square.UNUSED_SQAURE;
  }
  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let idx = 1; idx < 10; idx++) {
      this.squares[String(idx)] = new Square();
    }
  }
  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]} |  ${this.squares["2"]} |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]} |  ${this.squares["5"]} |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]} |  ${this.squares["8"]} |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }
  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused()).map(key => {
      return parseInt(key, 10);
    });
  }
  isFull() {
    return this.unusedSquares().length === 0;
  }
  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }
  resetSquares() {
    for (let prop in this.squares) {
      this.squares[prop] = new Square();
    }
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }
  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]
  ];

  static joinOr(array, delimiter = ", ", conjunction = "or") {
    let arrayCopy = array.slice();

    switch (arrayCopy.length) {
      case 1:
        return String(arrayCopy[0]);
      case 2:
        return `${arrayCopy[0]} ${conjunction} ${arrayCopy[1]}`;
      default: {
        let lastChar = arrayCopy.pop();
        let newArr = arrayCopy.map(elem => `${elem}${delimiter}`);
        return newArr.join("").concat(conjunction, " ", lastChar);
      }
    }
  }

  constructor(numberGamesPlayed) {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.numberGamesPlayed = numberGamesPlayed;
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      prompt(`Choose a square: ${TTTGame.joinOr(validChoices)}`);

      choice = parseInt(rlSync.question().trim(), 10);

      if (validChoices.includes(choice)) break;
      prompt(`Sorry, that is not a valid choice.`);
    }
    this.board.markSquareAt(choice, this.human.getMarker());
    console.clear();
  }

  randomComputerMove(availableMoves) {
    let randomNumber;

    do {
      randomNumber = Math.floor((9 * Math.random()) + 1);
    } while (!availableMoves.includes(randomNumber));

    return randomNumber;
  }

  countPieces(row) {
    let sum = 0;
    row.forEach(element => {
      if (element === Square.HUMAN_MARKER) {
        sum += 1;
      } else if (element === Square.COMPUTER_MARKER) {
        sum -= 1;
      }
    });
    return sum;
  }

  identifyEmptySquare(row) {
    let emptySquare = null;

    row.forEach(element => {
      if (this.board.squares[element].getMarker() === Square.UNUSED_SQAURE) {
        emptySquare = element;
      }
    });
    return emptySquare;
  }

  identifyStateOfPlay() {
    let stateOfPlay = {
      opportunties: [],
      threats: [],
    };

    TTTGame.POSSIBLE_WINNING_ROWS.forEach(row => {
      const HUMAN_THREAT = 2;
      const COMPUTER_OPPORTUNITY = -2;
      let rowInSquaresObj = [];

      row.forEach(element => rowInSquaresObj.push(
        this.board.squares[element].getMarker()));

      if (this.countPieces(rowInSquaresObj) === HUMAN_THREAT) {
        stateOfPlay.threats.push(this.identifyEmptySquare(row));
      }

      if (this.countPieces(rowInSquaresObj) === COMPUTER_OPPORTUNITY) {
        stateOfPlay.opportunties.push(this.identifyEmptySquare(row));
      }
    });
    return stateOfPlay;
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let currentStateOfPlay = this.identifyStateOfPlay();
    let choice = null;

    if (currentStateOfPlay.opportunties.length >= 1) {
      choice = parseInt(currentStateOfPlay.opportunties[0], 10);
    } else if (currentStateOfPlay.threats.length >= 1) {
      choice = parseInt(currentStateOfPlay.threats[0], 10);
    } else if (validChoices.includes(5)) {
      choice = 5;
    } else {
      choice = this.randomComputerMove(validChoices);
    }

    return this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayResults() {
    this.board.display();

    if (this.isWinner(this.human)) {
      prompt(`You won the game! ${emoji.get('clap').repeat(3)}`);
    } else if (this.isWinner(this.computer)) {
      prompt(`Computer won the game, better luck next time ${emoji.get('disappointed')}`);
    } else {
      prompt(`Tie Game ${emoji.get('sleeping')}`);
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  returnWinner() {
    let gameWinner = null;

    if (this.isWinner(this.human)) {
      gameWinner = this.human.constructor.name;
    } else if (this.isWinner(this.computer)) {
      gameWinner = this.computer.constructor.name;
    }
    return gameWinner;
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  playComputerFirst() {
    while (true) {
      this.computerMoves();
      if (this.gameOver()) break;

      this.board.display();
      this.humanMoves();
      if (this.gameOver()) break;
    }
  }

  playHumanfirst() {
    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;
    }
  }

  playGame() {
    if (this.numberGamesPlayed % 2 === 0) {
      this.playHumanfirst();
    } else if (this.numberGamesPlayed % 2 !== 0) {
      this.playComputerFirst();
    }

    this.displayResults();
    return this.returnWinner();
  }
}

class TTTMatch {
  static WIN_SCORE = 3;
  static displayMatchWelcome() {
    console.clear();
    prompt(`Welcome to Tic Tac Toe. First to ${TTTMatch.WIN_SCORE} wins the match.`);
    prompt(`PLAYER will go first on even-numbered games. COMPUTER will go first on odd-numbered games.`);
  }
  static displayMatchGoodbye() {
    prompt('Thanks for playing Tic Tac toe!');
  }

  constructor() {
    this.score = {
      Human: 0,
      Computer: 0
    };
    this.numberGamesPlayed = 0;
  }

  keepScore(winner) {
    this.score[winner] += 1;
    this.numberGamesPlayed += 1;
  }

  resetScore() {
    this.score.Human = 0;
    this.score.Computer = 0;
    this.numberGamesPlayed = 0;
  }

  detectMatchWinner() {
    if (this.score.Human === TTTMatch.WIN_SCORE ||
      this.score.Computer === TTTMatch.WIN_SCORE) {
      return true;
    } else {
      return false;
    }
  }

  displayMatchScore() {
    console.log('');
    prompt(`MATCH SCORE is PLAYER: ${this.score.Human}, COMPUTER: ${this.score.Computer}`);
  }

  displayMatchWinner() {
    if (this.score.Human === TTTMatch.WIN_SCORE) {
      prompt(`YOU WON THE MATCH! ${emoji.get('tada').repeat(3)}`);
    } else if (this.score.Computer === TTTMatch.WIN_SCORE) {
      prompt(`Computer won the match ${emoji.get('sob')}`);
    }
  }

  continueMatch() {
    const VALID_ANSWERS = ['y', 'n'];
    let answer;

    while (true) {
      prompt('Are you ready to continue?: Enter "y" or "n"');
      answer = rlSync.question().trim().toLowerCase();

      if (answer === VALID_ANSWERS[0]) {
        console.clear();
        break;
      }
      prompt("Whenever you're ready...");
    }
  }

  repeat() {
    const VALID_ANSWERS = ['y', 'n'];
    let answer;

    while (true) {
      prompt('Would you like to play again?: Enter "y" or "n"');
      answer = rlSync.question().trim().toLowerCase();

      if (VALID_ANSWERS.includes(answer)) break;
      prompt('Sorry, that is not a valid choice.');
    }
    if (answer === VALID_ANSWERS[0]) {
      this.resetScore();
      this.playMatch();
    } else {
      TTTMatch.displayMatchGoodbye();
    }
  }

  playMatch() {
    TTTMatch.displayMatchWelcome();
    while (true) {
      this.displayMatchScore();
      let game = new TTTGame(this.numberGamesPlayed);
      this.keepScore(game.playGame());
      if (this.detectMatchWinner()) break;
      this.continueMatch();
    }
    this.displayMatchWinner();
    this.repeat();
  }
}

module.exports = TTTMatch;