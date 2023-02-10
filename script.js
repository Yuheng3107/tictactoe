const symbolButtons = [...document.querySelectorAll('.symbol')];
const startingSymbols = document.querySelector('.starting-symbols');
const startGameButton = document.querySelector('#start-game-btn');
const playerSelectForm = document.querySelector('.game-start');
const overlay  = document.querySelector('.overlay');


symbolButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Initialises gameboard
        gameboard.initialise()
        // Sets starting symbol
        gameboard.setStartingSymbol(e.target.value);
        startingSymbols.style.display = "none"
    });
});


let gameboard = function() {
    // gameboard module
    let board;
    let spaces = [...document.querySelectorAll('.space')];
    let currentSymbol = "X";
    let currentPlayer;
    let player1;
    let player2;

    spaces.forEach(space => {
        space.addEventListener('click', (e) => {
            // checks that game has started
            if (!board) {
                window.alert("Please chose either X or O");
            }
            else if (e.target.innerText == "") {
            // checks that position is not occupied
            // passes index to makeMove function
            makeMove(spaces.indexOf(e.target));
            }
            
        });
    });

    const initialise = () => {
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    function displayGrid() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != null) {
                    spaces[i*3+j].innerText = board[i][j];
                }
                else spaces[i*3+j].innerText = "";
            }
        }
    }

    function setStartingSymbol(symbol) {
        currentSymbol = symbol;
    }

    function makeMove(index) {
        // activates when the space is clicked, taking the index of the space that was clicked
        // first we place the new move that was made
        let [i, j] = indextoArrayIndices(index);
        board[i][j] = currentSymbol;
        // then display it
        displayGrid();
        // check if anyone won
        checkWinner();
        // then we change the currentSymbol
        currentSymbol = (currentSymbol == "X") ? "O": "X";
        // then we change the current player
        setCurrentPlayer((currentPlayer === player1) ? player2: player1);
    }

    function indextoArrayIndices(index) {
        return [Math.floor(index/3), index % 3];
    }

    function checkWinner() {
        
        for (let i = 0; i < 3; i++) {
            // checks for rows and columns
            if ((board[i][0] === board[i][1]) && (board[i][1] === board[i][2]) && board[i][0] != null) displayWinner();
            else if ((board[0][i] === board[1][i]) && (board[1][i] === board[2][i]) && board[0][i] !== null) displayWinner();
        }
        // so that no need check null for diagonals
        if (board[1][1] === null) return;
        // checking left diagonal
        if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])) displayWinner();
        else if ((board[0][2] === board[1][1]) && (board[1][1] === board[2][0])) displayWinner();

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == null) return;
            }
        }
        window.alert("It's a tie.");
        initialise();
        displayGrid();
    }

    function displayWinner() {
        // TODO
        window.alert(`${currentPlayer} is the winner`);
        initialise();
        displayGrid();
    }

    function setPlayerNames(name1, name2) {
        player1 = name1;
        player2 = name2;
        setCurrentPlayer(player1);
    }

    function setCurrentPlayer(player) {
        currentPlayer = player;
    }

    function displayEndGame(message) {

    }


    return {initialise, setStartingSymbol, setPlayerNames}

    

}();




startGameButton.addEventListener('click', (e) => {
    
    if (!playerSelectForm.checkValidity()) {
        return;
    }
    playerSelectForm.reportValidity();
    e.preventDefault();
    gameboard.initialise();
    gameboard.setPlayerNames(playerSelectForm.elements.player1.value, playerSelectForm.elements.player2.value);
    playerSelectForm.style.display = "none";
    overlay.style.display = "none";

    
})

