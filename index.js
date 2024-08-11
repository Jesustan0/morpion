// Sélection des cellules avec data-cell
const cells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("gameStatus");
const endGameStatus = document.getElementById("endGameStatus");
const playerOne = 'X';
const playerTwo = 'O';
let playerTurn = playerOne;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


cells.forEach(cell => {
    cell.addEventListener("click", playGame, { once: true });
});

function playGame(e) {
    e.target.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateGameStatus(`wins${playerTurn}`);
        return endGame();
    }

    if (checkDraw()) {
        updateGameStatus("draw");
        return endGame();
    }

    playerTurn = (playerTurn === playerOne) ? playerTwo : playerOne;
    updateGameStatus(playerTurn);
}

function checkWin(playerTurn) {
    return winningPatterns.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML === playerTurn;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML === playerOne || cell.innerHTML === playerTwo;
    });
}

function updateGameStatus(status) {
    let statusText;

    switch (status) {
        case playerOne:
            statusText = "Au tour du joueur 2 (O)";
            break;
        case playerTwo:
            statusText = "Au tour du joueur 1 (X)";
            break;
        case `wins${playerOne}`:
            statusText = "Le joueur 1 (X) a gagné";
            break;
        case `wins${playerTwo}`:
            statusText = "Le joueur 2 (O) a gagné";
            break;
        case 'draw':
            statusText = "Égalité!";
            break;
        default:
            statusText = "";
    }

    gameStatus.innerText = statusText;
    endGameStatus.innerText = statusText;
}

function endGame() {
    document.getElementById('gameEnd').style.display = 'block';
}

function reloadGame() {
    window.location.reload();
}
