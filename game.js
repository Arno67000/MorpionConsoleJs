const readline = require('readline-sync');
const Game = require('./model/Game.js');

let alertInput = false;

let scoreBoard = {
    playerCount : 0,
    computerCount : 0
};

function render(myBoard) {
    console.clear();
    myBoard.forEach(line => {
        console.log(line);
    });
};

function newGame() {
    const game = new Game();
    while(game.win === false) {
        if(game.turn % 2 === 0) {
            render(game.board);
            if(alertInput) {
                console.log('Play on NUMPAD : from 1 to 9 !! Try again.');
            };
            console.log('Your numPad represents the board.');
            var input = readline.question('Choose the key (from 1 to 9) you wanna play  :');
            if(parseInt(input) > 0 && parseInt(input) < 10) {
                alertInput = false;
                var {x , y} = game.coordinates[parseInt(input)];
                if(game.board[x][y] !== ' ') {
                    console.log("Already played !! Pick another key");
                } else {
                    game.board[x][y] = game.player;
                    game.win = game.testEndGameConditions('You');
                    game.incrTurn();
                };
            } else {
                alertInput = true;
            };                  
        } else {
            let {x, y} = game.ia();
            if(game.board[x][y] === ' ') {
                game.board[x][y] = game.computer;
                game.win = game.testEndGameConditions('Computer');
                game.incrTurn();
            }
        }

    }; 
    render(game.board);
    console.log(game.win,' won this game !!');
    switch(game.win){
        case 'You':
            scoreBoard.playerCount++;
            break
        case 'Computer':
            scoreBoard.computerCount++;
            break
    }
    console.log('Your score : '+scoreBoard.playerCount);
    console.log("Computer's score : "+scoreBoard.computerCount);
    if (readline.keyInYN('Play again ?')) {
        // 'Y' key was pressed.
        newGame();
      } else {
        // Another key was pressed.
        console.log('See you soon ! Bye :-)');
      }
    
};

newGame();

