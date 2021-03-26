const readline = require('readline-sync');

let board = [
    [' ',' ',' '],
    [' ',' ',' '],
    [' ',' ',' '],
];

const xy = {
    1: '20',
    2: '21',
    3: '22',
    4: '10',
    5: '11',
    6: '12',
    7: '00',
    8: '01',
    9: '02'
}
const player = "X";
const computer = "O";
let playerCount = 0;
let computerCount = 0;
let win = false;
let turn = 0;

function render(myBoard) {
    console.clear();
    myBoard.forEach(line => {
        console.log(line);
    });
};

function gameOver(myBoard, currentPlayer) {
    for(let line of myBoard) {
        if(
            line[0] === line[1] && 
            line[1] === line[2] && 
            line[1] !== ' ' 
        ) {
            return currentPlayer;
        };
    };

    for(let i = 0; i < myBoard.length; i++) {
        if(
            myBoard[0][i] === myBoard[1][i] && 
            myBoard[1][i] === myBoard[2][i] && 
            myBoard[1][i] !== ' '
        ) {
            return currentPlayer;
        }
    };

    if(
        (
            (myBoard[0][0] === myBoard[1][1] && myBoard[1][1] === myBoard[2][2]) ||
            (myBoard[1][1] === myBoard[0][2] && myBoard[1][1] === myBoard[2][0])
        ) &&
        myBoard[1][1] !== ' '
    ) {
        return currentPlayer;
    };

    if(turn === 8) {
        return 'NoOne';
    };
    return false;
}

function game() {
    while(win === false) {
        if(turn % 2 === 0) {
            render(board);
            console.log('Your numPad represents the board.');
            var input = readline.question('Choose the key (from 1 to 9) you wanna play  :');
            let coord = xy[input].split('');
            if(board[coord[0]][coord[1]] === player || board[coord[0]][coord[1]] === computer) {
                console.log("Already played !! Pick another key");
            } else {
                board[coord[0]][coord[1]] = player;
                win = gameOver(board, 'You');
                turn++;
            }
                      
        } else {
            let choice = ia(board);
            let x = choice[0];
            let y = choice[1];
            if(board[x][y] !== player && board[x][y] !== computer) {
                board[x][y] = computer;
                win = gameOver(board, 'Computer');
                turn++;
            }
        }

    }; 
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
    console.log(win,' won the game !!');
    switch(win){
        case 'You':
            playerCount++;
            break
        case 'Computer':
            computerCount++;
            break
    }
    console.log('Your score : '+playerCount);
    console.log("Computer's score : "+computerCount);
    if (readline.keyInYN('Do you want this module?')) {
        // 'Y' key was pressed.
        board = [
            [' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' '],
        ];
        win = false;
        turn = 0;
        game();
      } else {
        // Another key was pressed.
        console.log('See you soon ! Bye :-)');
        playerCount = 0;
        computerCount = 0;
      }
    
};

game();

function ia(myBoard) {
    if(myBoard[1][1] === ' ') {
        return [1,1];
    }
    if(myBoard[1][1] === player && myBoard[2][2] === ' ') {
        return [2,2];
    }
    if(myBoard[1][1] === player && myBoard[2][2] === computer) {
        if(myBoard[0][2] === player && myBoard[2][0] === ' ') {
            return [2,0];
        }else if(myBoard[2][0] === player && myBoard[0][2] === ' ') {
            return [0,2];
        }
    }
    let rawDanger = [];
    let colDanger = [];
    
    for(let x = 0; x < myBoard.length; x++) {
        let raw = 0;
        for(let y = 0; y < myBoard.length; y++) {
            if(myBoard[x][y] === player) {
                raw++;
            }
        }
        rawDanger.push(raw);
    };
    for(let y = 0; y < myBoard.length; y++) {
        let col = 0;
        for(let x = 0; x < myBoard.length; x++) {
            if(myBoard[x][y] === player) {
                col++;
            }
        }
        colDanger.push(col);
    }

    let myRaws = [];
    let myCols = [];
    for(let x = 0; x < myBoard.length; x++) {
        let raw = 0;
        for(let y = 0; y < myBoard.length; y++) {
            if(myBoard[x][y] === computer) {
                raw++;
            }
        }
        myRaws.push(raw);
    };
    for(let y = 0; y < myBoard.length; y++) {
        for(let x = 0; x < myBoard.length; x++) {
            let col = 0;
            if(myBoard[x][y] === computer) {
                col++;
            }
            myCols.push(col);
        }
    }

    let winX = myRaws.indexOf(2);
    var xNb;
    if(winX !== -1) {
        xNb = winX;
        for(let i = 0; i<myBoard.length; i++) {
            if(myBoard[xNb][i] === ' ') {
                return [xNb,i];
            }
        }
        xNb = -1;
    }

    let winY = myCols.indexOf(2);
    var yNb;
    if(winY !== -1) {
        yNb = winY;
        for(let i = 0; i<myBoard.length; i++) {
            if(myBoard[i][yNb] === ' ') {
                return [i,yNb];
            }
        }
        yNb = -1;
    }

    let looseX = rawDanger.indexOf(2);
    if(looseX !== -1) {
        xNb = looseX;
        for(let i = 0; i<myBoard.length; i++) {
            if(myBoard[xNb][i] === ' ') {
                return [xNb,i];
            }
        }
    }
    let looseY = colDanger.indexOf(2);
    if(looseY !== -1) {
        yNb = looseY;
        for(let i = 0; i<myBoard.length; i++) {
            if(myBoard[i][yNb] === ' ') {
                return [i,yNb];
            }
        }
    }
    let xRand = Math.round(Math.random() * 2);
    let yRand = Math.round(Math.random() * 2);
    return [xRand, yRand];
} 