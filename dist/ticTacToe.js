"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emoji = require('node-emoji');

var rlSync = require('readline-sync');

function prompt(msg) {
  console.log("=> ".concat(msg));
}

var Square = /*#__PURE__*/function () {
  function Square() {
    var marker = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Square.UNUSED_SQAURE;

    _classCallCheck(this, Square);

    this.marker = marker;
  }

  _createClass(Square, [{
    key: "toString",
    value: function toString() {
      return this.marker;
    }
  }, {
    key: "setMarker",
    value: function setMarker(marker) {
      this.marker = marker;
    }
  }, {
    key: "isUnused",
    value: function isUnused() {
      return this.marker === Square.UNUSED_SQAURE;
    }
  }, {
    key: "getMarker",
    value: function getMarker() {
      return this.marker;
    }
  }]);

  return Square;
}();

_defineProperty(Square, "UNUSED_SQAURE", '  ');

_defineProperty(Square, "HUMAN_MARKER", emoji.get('man'));

_defineProperty(Square, "COMPUTER_MARKER", emoji.get('robot_face'));

var Board = /*#__PURE__*/function () {
  function Board() {
    _classCallCheck(this, Board);

    this.squares = {};

    for (var idx = 1; idx < 10; idx++) {
      this.squares[String(idx)] = new Square();
    }
  }

  _createClass(Board, [{
    key: "display",
    value: function display() {
      console.log("");
      console.log("     |     |");
      console.log("  ".concat(this.squares["1"], " |  ").concat(this.squares["2"], " |  ").concat(this.squares["3"]));
      console.log("     |     |");
      console.log("-----+-----+-----");
      console.log("     |     |");
      console.log("  ".concat(this.squares["4"], " |  ").concat(this.squares["5"], " |  ").concat(this.squares["6"]));
      console.log("     |     |");
      console.log("-----+-----+-----");
      console.log("     |     |");
      console.log("  ".concat(this.squares["7"], " |  ").concat(this.squares["8"], " |  ").concat(this.squares["9"]));
      console.log("     |     |");
      console.log("");
    }
  }, {
    key: "markSquareAt",
    value: function markSquareAt(key, marker) {
      this.squares[key].setMarker(marker);
    }
  }, {
    key: "unusedSquares",
    value: function unusedSquares() {
      var _this = this;

      var keys = Object.keys(this.squares);
      return keys.filter(function (key) {
        return _this.squares[key].isUnused();
      }).map(function (key) {
        return parseInt(key, 10);
      });
    }
  }, {
    key: "isFull",
    value: function isFull() {
      return this.unusedSquares().length === 0;
    }
  }, {
    key: "countMarkersFor",
    value: function countMarkersFor(player, keys) {
      var _this2 = this;

      var markers = keys.filter(function (key) {
        return _this2.squares[key].getMarker() === player.getMarker();
      });
      return markers.length;
    }
  }, {
    key: "resetSquares",
    value: function resetSquares() {
      for (var prop in this.squares) {
        this.squares[prop] = new Square();
      }
    }
  }]);

  return Board;
}();

var Player = /*#__PURE__*/function () {
  function Player(marker) {
    _classCallCheck(this, Player);

    this.marker = marker;
  }

  _createClass(Player, [{
    key: "getMarker",
    value: function getMarker() {
      return this.marker;
    }
  }]);

  return Player;
}();

var Human = /*#__PURE__*/function (_Player) {
  _inherits(Human, _Player);

  var _super = _createSuper(Human);

  function Human() {
    _classCallCheck(this, Human);

    return _super.call(this, Square.HUMAN_MARKER);
  }

  return Human;
}(Player);

var Computer = /*#__PURE__*/function (_Player2) {
  _inherits(Computer, _Player2);

  var _super2 = _createSuper(Computer);

  function Computer() {
    _classCallCheck(this, Computer);

    return _super2.call(this, Square.COMPUTER_MARKER);
  }

  return Computer;
}(Player);

var TTTGame = /*#__PURE__*/function () {
  function TTTGame(numberGamesPlayed) {
    _classCallCheck(this, TTTGame);

    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.numberGamesPlayed = numberGamesPlayed;
  }

  _createClass(TTTGame, [{
    key: "humanMoves",
    value: function humanMoves() {
      var choice;

      while (true) {
        var validChoices = this.board.unusedSquares();
        prompt("Choose a square: ".concat(TTTGame.joinOr(validChoices)));
        choice = parseInt(rlSync.question().trim(), 10);
        if (validChoices.includes(choice)) break;
        prompt("Sorry, that is not a valid choice.");
      }

      this.board.markSquareAt(choice, this.human.getMarker());
      console.clear();
    }
  }, {
    key: "randomComputerMove",
    value: function randomComputerMove(availableMoves) {
      var randomNumber;

      do {
        randomNumber = Math.floor(9 * Math.random() + 1);
      } while (!availableMoves.includes(randomNumber));

      return randomNumber;
    }
  }, {
    key: "countPieces",
    value: function countPieces(row) {
      var sum = 0;
      row.forEach(function (element) {
        if (element === Square.HUMAN_MARKER) {
          sum += 1;
        } else if (element === Square.COMPUTER_MARKER) {
          sum -= 1;
        }
      });
      return sum;
    }
  }, {
    key: "identifyEmptySquare",
    value: function identifyEmptySquare(row) {
      var _this3 = this;

      var emptySquare = null;
      row.forEach(function (element) {
        if (_this3.board.squares[element].getMarker() === Square.UNUSED_SQAURE) {
          emptySquare = element;
        }
      });
      return emptySquare;
    }
  }, {
    key: "identifyStateOfPlay",
    value: function identifyStateOfPlay() {
      var _this4 = this;

      var stateOfPlay = {
        opportunties: [],
        threats: []
      };
      TTTGame.POSSIBLE_WINNING_ROWS.forEach(function (row) {
        var HUMAN_THREAT = 2;
        var COMPUTER_OPPORTUNITY = -2;
        var rowInSquaresObj = [];
        row.forEach(function (element) {
          return rowInSquaresObj.push(_this4.board.squares[element].getMarker());
        });

        if (_this4.countPieces(rowInSquaresObj) === HUMAN_THREAT) {
          stateOfPlay.threats.push(_this4.identifyEmptySquare(row));
        }

        if (_this4.countPieces(rowInSquaresObj) === COMPUTER_OPPORTUNITY) {
          stateOfPlay.opportunties.push(_this4.identifyEmptySquare(row));
        }
      });
      return stateOfPlay;
    }
  }, {
    key: "computerMoves",
    value: function computerMoves() {
      var validChoices = this.board.unusedSquares();
      var currentStateOfPlay = this.identifyStateOfPlay();
      var choice = null;

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
  }, {
    key: "displayResults",
    value: function displayResults() {
      this.board.display();

      if (this.isWinner(this.human)) {
        prompt("You won the game! ".concat(emoji.get('clap').repeat(3)));
      } else if (this.isWinner(this.computer)) {
        prompt("Computer won the game, better luck next time ".concat(emoji.get('disappointed')));
      } else {
        prompt("Tie Game ".concat(emoji.get('sleeping')));
      }
    }
  }, {
    key: "isWinner",
    value: function isWinner(player) {
      var _this5 = this;

      return TTTGame.POSSIBLE_WINNING_ROWS.some(function (row) {
        return _this5.board.countMarkersFor(player, row) === 3;
      });
    }
  }, {
    key: "returnWinner",
    value: function returnWinner() {
      var gameWinner = null;

      if (this.isWinner(this.human)) {
        gameWinner = this.human.constructor.name;
      } else if (this.isWinner(this.computer)) {
        gameWinner = this.computer.constructor.name;
      }

      return gameWinner;
    }
  }, {
    key: "someoneWon",
    value: function someoneWon() {
      return this.isWinner(this.human) || this.isWinner(this.computer);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      return this.board.isFull() || this.someoneWon();
    }
  }, {
    key: "playComputerFirst",
    value: function playComputerFirst() {
      while (true) {
        this.computerMoves();
        if (this.gameOver()) break;
        this.board.display();
        this.humanMoves();
        if (this.gameOver()) break;
      }
    }
  }, {
    key: "playHumanfirst",
    value: function playHumanfirst() {
      while (true) {
        this.board.display();
        this.humanMoves();
        if (this.gameOver()) break;
        this.computerMoves();
        if (this.gameOver()) break;
      }
    }
  }, {
    key: "playGame",
    value: function playGame() {
      if (this.numberGamesPlayed % 2 === 0) {
        this.playHumanfirst();
      } else if (this.numberGamesPlayed % 2 !== 0) {
        this.playComputerFirst();
      }

      this.displayResults();
      return this.returnWinner();
    }
  }], [{
    key: "joinOr",
    value: function joinOr(array) {
      var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ", ";
      var conjunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "or";
      var arrayCopy = array.slice();

      switch (arrayCopy.length) {
        case 1:
          return String(arrayCopy[0]);

        case 2:
          return "".concat(arrayCopy[0], " ").concat(conjunction, " ").concat(arrayCopy[1]);

        default:
          {
            var lastChar = arrayCopy.pop();
            var newArr = arrayCopy.map(function (elem) {
              return "".concat(elem).concat(delimiter);
            });
            return newArr.join("").concat(conjunction, " ", lastChar);
          }
      }
    }
  }]);

  return TTTGame;
}();

_defineProperty(TTTGame, "POSSIBLE_WINNING_ROWS", [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]]);

var TTTMatch = /*#__PURE__*/function () {
  function TTTMatch() {
    _classCallCheck(this, TTTMatch);

    this.score = {
      Human: 0,
      Computer: 0
    };
    this.numberGamesPlayed = 0;
  }

  _createClass(TTTMatch, [{
    key: "keepScore",
    value: function keepScore(winner) {
      this.score[winner] += 1;
      this.numberGamesPlayed += 1;
    }
  }, {
    key: "resetScore",
    value: function resetScore() {
      this.score.Human = 0;
      this.score.Computer = 0;
      this.numberGamesPlayed = 0;
    }
  }, {
    key: "detectMatchWinner",
    value: function detectMatchWinner() {
      if (this.score.Human === TTTMatch.WIN_SCORE || this.score.Computer === TTTMatch.WIN_SCORE) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "displayMatchScore",
    value: function displayMatchScore() {
      console.log('');
      prompt("MATCH SCORE is PLAYER: ".concat(this.score.Human, ", COMPUTER: ").concat(this.score.Computer));
    }
  }, {
    key: "displayMatchWinner",
    value: function displayMatchWinner() {
      if (this.score.Human === TTTMatch.WIN_SCORE) {
        prompt("YOU WON THE MATCH! ".concat(emoji.get('tada').repeat(3)));
      } else if (this.score.Computer === TTTMatch.WIN_SCORE) {
        prompt("Computer won the match ".concat(emoji.get('sob')));
      }
    }
  }, {
    key: "continueMatch",
    value: function continueMatch() {
      var VALID_ANSWERS = ['y', 'n'];
      var answer;

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
  }, {
    key: "repeat",
    value: function repeat() {
      var VALID_ANSWERS = ['y', 'n'];
      var answer;

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
  }, {
    key: "playMatch",
    value: function playMatch() {
      TTTMatch.displayMatchWelcome();

      while (true) {
        this.displayMatchScore();
        var game = new TTTGame(this.numberGamesPlayed);
        this.keepScore(game.playGame());
        if (this.detectMatchWinner()) break;
        this.continueMatch();
      }

      this.displayMatchWinner();
      this.repeat();
    }
  }], [{
    key: "displayMatchWelcome",
    value: function displayMatchWelcome() {
      console.clear();
      prompt("Welcome to Tic Tac Toe. First to ".concat(TTTMatch.WIN_SCORE, " wins the match."));
      prompt("PLAYER will go first on even-numbered games. COMPUTER will go first on odd-numbered games.");
    }
  }, {
    key: "displayMatchGoodbye",
    value: function displayMatchGoodbye() {
      prompt('Thanks for playing Tic Tac toe!');
    }
  }]);

  return TTTMatch;
}(); 

_defineProperty(TTTMatch, "WIN_SCORE", 3);

module.exports = TTTMatch;