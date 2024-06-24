const gameBoard = (function() {
    let board;
    const resetBoard = () => {
        board = Array(9).fill(0);
    }
    resetBoard();

    const getBoard = () => board;

    const fillCell = (index, playerNum) => {
        if (board[index] === 0) {
            board[index] += playerNum;
        }
    }

    const checkWin = () => {
        let endGame = false;
        let winnerId = -1;

        // Check all winning combinations (simplify)
        for (let i = 0; i < 3; i++) {
            if (board[i] === 0) {
                break;
            }
            if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
                endGame = true;
                winnerId = board[i];
            }
        }

        for (let i = 0; i < 9; i += 3) {
            if (board[i] === 0) {
                break;
            }
            if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
                endGame = true;
                winnerId = board[i];
            }
        }

        if (board[4] !== 0 && (board[0] === board[4] && board[0] === board[8] ||
                board[2] === board[4] && board[2] === board[6])) {
            endGame = true;
            winnerId = board[4];   // Index 4 in common for diagonal wins
        }

        // Check for tie
        if (!endGame && board.indexOf(0) < 0) {
            endGame = true;
            winnerId = 0;
        }

        return winnerId;
    }

    const printBoard = () => {
        const symbolArray = board.map((element) => {
            if (element === 0) {
                return "_";
            } else if (element === 1) {
                return "X";
            } else {
                return "O";
            }
        });
        console.log(symbolArray);
    }

    return {
        getBoard,
        resetBoard,
        fillCell,
        checkWin,
        printBoard
    };
})();

function createPlayer(name, number) {
    const numWins = 0;

    const getNumber = () => number;
    const getWins = () => numWins;
    const awardWin = () => numWins++;

    return {
        name,
        getNumber,
        getWins,
        awardWin
    }
}

const gameController = (function() {
    const playerOne = createPlayer(prompt("Enter name for Player 1: "), 1);
    const playerTwo = createPlayer(prompt("Enter name for Player 2: "), 2);
    let playerOneTurn = true;

    while (true) {
        const activePlayer = playerOneTurn ? playerOne : playerTwo;
        let cellIndex = prompt(`${activePlayer.name}, enter a cell (0-8):`);
        gameBoard.fillCell(cellIndex, activePlayer.getNumber());
        gameBoard.printBoard();
        const winner = gameBoard.checkWin();
        if (winner === 0) {
            console.log("Tie!");
            break;
        } else if (winner > 0) {
            console.log(`${activePlayer.name} wins!`);
            break;
        }
        playerOneTurn = !playerOneTurn;
    }
});

gameController();