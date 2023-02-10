const symbolButtons = [...document.querySelectorAll('.symbol')];
const startingSymbols = document.querySelector('.starting-symbols');


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
    let currentSymbol;

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
        window.alert("Tie.");
        initialise();
        displayGrid();
    }

    function displayWinner() {
        // TODO
        window.alert(`${currentSymbol} is the winner`);
        initialise();
        displayGrid();
    }

    return {initialise, setStartingSymbol}

    

}();


function player(name) {
// TODO
let playerName = name;

}

