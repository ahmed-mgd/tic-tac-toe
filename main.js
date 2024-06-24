const gameBoard = (function() {
    let board;
    let activePlayer;
    const reset = () => {
        board = Array(9).fill(0);
        activePlayer = 1;
    }
    reset();

    const getBoard = () => board;
    const getActivePlayer = () => activePlayer;

    // Returns true if cell is valid, false otherwise
    const fillCell = (index) => {
        if (board[index] === 0) {
            board[index] += activePlayer;
            return true;
        } else {
            return false;
        }
    }

    const switchTurn = () => {
        activePlayer = activePlayer === 1 ? 2 : 1;
    }

    const checkWin = (lastIndex) => {
        let endGame = false;
        let winnerId = -1;

        // Check all winning combinations (simplify)
        for (let i = 0; i < 3; i++) {
            if (board[i] === 0) {
                continue;
            }
            if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
                endGame = true;
                winnerId = board[i];
            }
        }

        for (let i = 0; i < 9; i += 3) {
            if (board[i] === 0) {
                continue;
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

    return {
        getBoard,
        reset,
        fillCell,
        checkWin,
        getActivePlayer,
        switchTurn
    };
})();

function createPlayer(name, number) {
    const getNumber = () => number;
    return {
        name,
        getNumber
    }
}

const gameView = (function() {
    const startMenu = document.querySelector("#start-menu")
    const startBtn = document.querySelector("#start-button");
    const summaryMenu = document.querySelector("#summary-menu");
    const summaryMessage = document.querySelector("#summary-message")
    const playAgainBtn = document.querySelector("#play-again-button");
    const gameMessage = document.querySelector("#game-message");
    const nameFields = document.querySelectorAll(".name-field");
    const cells = document.querySelectorAll(".cell");

    const getPlayerName = (number) => nameFields[number - 1].value;

    const showStartMenu = () => {
        startMenu.showModal();
    }

    const hideStartMenu = () => {
        startMenu.close();
    }

    const showSummary = (message) => {
        summaryMessage.textContent = message;
        summaryMenu.showModal();
    }

    const hideSummary = () => {
        summaryMenu.close();
    }

    const markCell = (index) => {
        const label = gameBoard.getActivePlayer() === 1 ? "X" : "O";
        cells[index].textContent = label;
    }

    const reset = () => {
        cells.forEach((cell) => {
            cell.textContent = "";
        });
    }

    const updateGameMessage = (message) => {
        gameMessage.textContent = message;
    }

    startBtn.addEventListener("click", () => {
        gameController.handleStart();
    });

    playAgainBtn.addEventListener("click", () => {
        gameController.handlePlayAgain();
    });

    cells.forEach((cell, i) => {
        cell.addEventListener("click", () => {
            gameController.handleCellClick(i);
        });
    });

    return {
        getPlayerName,
        showStartMenu,
        hideStartMenu,
        showSummary,
        hideSummary,
        markCell,
        reset,
        updateGameMessage
    }
})();

const gameController = (function() {
    const playerOne = createPlayer("Player 1", 1);
    const playerTwo = createPlayer("Player 2", 2);
    gameView.showStartMenu();

    const handleStart = () => {
        playerOne.name = gameView.getPlayerName(1);
        playerTwo.name = gameView.getPlayerName(2);
        gameView.hideStartMenu();
        gameView.updateGameMessage(`${playerOne.name}'s turn (X)`);
    }

    const handlePlayAgain = () => {
        gameBoard.reset();
        gameView.hideSummary();
        gameView.reset();
        gameView.updateGameMessage(`${playerOne.name}'s turn (X)`);
    }

    const handleWin = (winnerId) => {
        let message;
        if (winnerId === 0) {
            message = "The players tied!"
        } else if (winnerId > 0) {
            const winnerName = winnerId === 1 ? playerOne.name : playerTwo.name;
            message = `${winnerName} wins!`;
        }
        gameView.showSummary(message);
    }

    const handleCellClick = (index) => {
        if (gameBoard.fillCell(index)) {
            gameView.markCell(index);
            const winnerId = gameBoard.checkWin();
            if (winnerId >= 0) {
                handleWin(winnerId);
            } else {
                gameBoard.switchTurn();
                const activePlayer = gameBoard.getActivePlayer() === 1 ? playerOne : playerTwo;
                const label = gameBoard.getActivePlayer() === 1 ? "X" : "O";
                gameView.updateGameMessage(`${activePlayer.name}'s turn (${label})`);
            }
        }
    }

    return {
        handleStart,
        handlePlayAgain,
        handleWin,
        handleCellClick
    }
})();