

board = {
    width: "",
    height: "",
    level: "",
    amountOfCards: 0
}

player = {
    name: "",
    score: "",
    time: ""
}

function boardBuild() {
    var theBoard = document.getElementById("board-container");
    for (var i = 0; i < board.amountOfCards; i++) {
        card = document.createElement("div");
        card.classList.add("cards");

        card.style.width = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.style.height = 100 / Math.sqrt(board.amountOfCards) + "%";
        theBoard.appendChild(card);
    }
}

function getSelectedLevel() {
    if (board.amountOfCards != 0) {
        clearBoard();
    }
    board.level = document.getElementById("selectLevel").value;
    board.amountOfCards = getItemNumber(document.getElementById("selectLevel").value);
    boardBuild();
}

document.getElementById("selectLevel").addEventListener("change", getSelectedLevel);


function getItemNumber(str) {
    len = str.length;
    if (!isNaN(str[len - 2])) {
        return parseInt(str.substring(len - 2, len));
    }
    return parseInt(str[len - 1]);
}
function clearBoard(){
    location.reload();
}