class Game {
  constructor() {
    this.IA = "Computer";
    this.PLAYER = "You";
    this.NOONE = "Nobody";
    this.FREE_SLOT = " ";
    this.board = [
      [this.FREE_SLOT, this.FREE_SLOT, this.FREE_SLOT],
      [this.FREE_SLOT, this.FREE_SLOT, this.FREE_SLOT],
      [this.FREE_SLOT, this.FREE_SLOT, this.FREE_SLOT],
    ];
    this.coordinates = {
      1: { x: 2, y: 0 },
      2: { x: 2, y: 1 },
      3: { x: 2, y: 2 },
      4: { x: 1, y: 0 },
      5: { x: 1, y: 1 },
      6: { x: 1, y: 2 },
      7: { x: 0, y: 0 },
      8: { x: 0, y: 1 },
      9: { x: 0, y: 2 },
    };
    this.player = "X";
    this.computer = "O";
    this.win = false;
    this.turn = 0;
    this.victoryConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  getBoard() {
    return this.board;
  }

  testEndGameConditions(currentPlayer) {
    const currentResult = this.board.flat();
    const gameEnd = this.victoryConditions.find(
      (condition) =>
        condition.every((i) => currentResult[i] === this.computer) ||
        condition.every((i) => currentResult[i] === this.player)
    );
    if (gameEnd) {
      return currentPlayer;
    }
    if (this.turn === 8) {
      return this.NOONE;
    }
    return false;
  }

  incrTurn() {
    this.turn++;
  }

  ia() {
    //Strategic opening
    if (this.board[1][1] === this.FREE_SLOT) {
      return { x: 1, y: 1 };
    }
    if (
      this.board[1][1] === this.player &&
      this.board[2][2] === this.FREE_SLOT
    ) {
      return { x: 2, y: 2 };
    }
    if (
      this.board[1][1] === this.player &&
      this.board[2][2] === this.computer
    ) {
      if (
        this.board[0][2] === this.player &&
        this.board[2][0] === this.FREE_SLOT
      ) {
        return { x: 2, y: 0 };
      } else if (
        this.board[2][0] === this.player &&
        this.board[0][2] === this.FREE_SLOT
      ) {
        return { x: 0, y: 2 };
      }
    }

    //Check for player's chances
    let rawDanger = [];
    let colDanger = [];

    for (let x = 0; x < this.board.length; x++) {
      let raw = 0;
      for (let y = 0; y < this.board.length; y++) {
        if (this.board[x][y] === this.player) {
          raw++;
        }
      }
      rawDanger.push(raw);
    }
    for (let y = 0; y < this.board.length; y++) {
      let col = 0;
      for (let x = 0; x < this.board.length; x++) {
        if (this.board[x][y] === this.player) {
          col++;
        }
      }
      colDanger.push(col);
    }

    //Check for computer's chances
    let myRaws = [];
    let myCols = [];
    for (let x = 0; x < this.board.length; x++) {
      let raw = 0;
      for (let y = 0; y < this.board.length; y++) {
        if (this.board[x][y] === this.computer) {
          raw++;
        }
      }
      myRaws.push(raw);
    }
    for (let y = 0; y < this.board.length; y++) {
      let col = 0;
      for (let x = 0; x < this.board.length; x++) {
        if (this.board[x][y] === this.computer) {
          col++;
        }
      }
      myCols.push(col);
    }

    //Manage computer ATTACKS
    let winX = myRaws.indexOf(2);
    var xNb;
    if (winX !== -1) {
      xNb = winX;
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[xNb][i] === this.FREE_SLOT) {
          return { x: xNb, y: i };
        }
      }
    }

    let winY = myCols.indexOf(2);
    var yNb;
    if (winY !== -1) {
      yNb = winY;
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[i][yNb] === this.FREE_SLOT) {
          return { x: i, y: yNb };
        }
      }
    }

    //Manage computer DEFENDS
    let looseX = rawDanger.indexOf(2);
    if (looseX !== -1) {
      xNb = looseX;
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[xNb][i] === this.FREE_SLOT) {
          return { x: xNb, y: i };
        }
      }
    }
    let looseY = colDanger.indexOf(2);
    if (looseY !== -1) {
      yNb = looseY;
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[i][yNb] === this.FREE_SLOT) {
          return { x: i, y: yNb };
        }
      }
    }

    //If no-one is winning => randomPlay !!
    let xRand = Math.round(Math.random() * 2);
    let yRand = Math.round(Math.random() * 2);
    return { x: xRand, y: yRand };
  }
}

module.exports = Game;
