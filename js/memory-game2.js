

board = {
    width: "",
    height: "",
    level: "",
    amountOfCards: 0,
    deck: "first"
}

player = {
    name: "",
    score: "",
    time: ""
}

function boardBuild() {

    var theBoard = document.getElementById("board-container");
    imagesArr = getImageArr(); // will return an array filled with numbers (index 0 is 1)
    for (var i = 0; i < board.amountOfCards; i++) {
        var card = document.createElement("div");
        // var theImage = documet.createElement("img");////////////////////
        card.classList.add("cards");
        card.style.width = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.style.height = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.style.backgroundImage = "url("+imagesArr[i]+")";
        // debugger;
        // card.appendChild(theImage);
        theBoard.appendChild(card);
    }
}
function getImageArr() {

    var imageArr = shuffleArr(getNumbersArr());
    for (var i = 0; i < board.amountOfCards; i++) {
        imageArr[i] = "./images/"+board.deck+"/"+imageArr[i]+".png";

    }
    return imageArr;
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
function clearBoard() {
    var theBoard = document.getElementById("board-container");
    var cardsArr = document.getElementsByClassName("cards");
    for (var i = 0; i < board.amountOfCards; i++) {
        theBoard.removeChild(cardsArr[0]);
    }
}

function shuffleArr(array) {
    var temp = 0;
    for (var i = 0; i < array.length - 1; i++) {
        j = Math.floor(Math.random() * array.length);
        temp = array[i]
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getNumbersArr() {
    var numbersArr = [""];
    for (var i = 0; i < board.amountOfCards / 2; i++) {
        numbersArr[i] = i + 1;
    }
    return numbersArr.concat(numbersArr);
}

