const gameBoard = (function() {
    let board;
    const resetBoard = () => {
        board = Array(9).fill(0);
    }
    resetBoard();
    const getBoard = () => board;

    const markSquare = (index, playerNum) => {
        if (board[i] === 0) {
            board[i] += playerNum;
        }
    }

    const checkWin = () => {
        const endGame = false;
        let winnerId = 0;

        // Check all winning combinations
        for (let i = 0; i < 3; i++) {
            if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
                endGame = true;
                winnerId = board[i];
            }
        }
        for (let i = 0; i < 9; i += 3) {
            if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
                endGame = true;
                winnerId = board[i];
            }
        }
        if (board[0] === board[4] && board[0] === board[8] ||
                board[2] === board[4] && board[2] === board[6]) {
            endGame = true;
            winnerId = board[4];   // Index 4 in common for diagonal wins
        }

        // Check for tie
        if (!endGame && board.indexOf(0) < 0) {
            endGame = true;
        }

        if (endGame) {
            if (winnerId === 0) {
                console.log("Tie!");
            } else {
                console.log(`Player ${winnerId} wins!`)
            }
        } else {
            console
        }
    }

    return {
        getBoard,
        resetBoard
    };
})();

function createPlayer(name, marker) {
    const name = name;
    const marker = marker;
    const numWins = 0;
    const getWins = () => numWins;
    const awardWin = () => numWins++;

    return {
        name,
        getWins,
        awardWin
    }
}

const gameController = (function() {
    const playerOne = createPlayer(prompt("Enter name for Player 1: "), "X");
    const playerTwo = createPlayer(prompt("Enter name for Player 2: "), "O");
    let playerOneTurn = true;

    while (true) {
        let playIndex = prompt(`Player ${turn}`)
        if (playerOneTurn) {

        }
        playerOneTurn = !playerOneTurn;
    }
})