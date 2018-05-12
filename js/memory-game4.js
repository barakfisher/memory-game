board = {
    level: "",
    amountOfCards: 0,
    deck: "first",
    currentFlippedCards: 0,
    flippedCardsArr: [],
    waiting: false
}

player = {
    score: "",
    guesses: 0,
    rightGuesses: 0
}

function zeroAll(){
    player.rightGuesses =0;
    player.guesses=0;
}

function boardBuild() {
    zeroAll();
    var theBoard = document.getElementById("board-container");
    imagesArr = getImageArr(); 
    for (var i = 0; i < board.amountOfCards; i++) {
        var card = document.createElement("div");
        card.style.width = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.style.height = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.classList.add("cards", "clickable");
        card.setAttribute("location", imagesArr[i]);
        card.style.backgroundImage = "url('./images/tree-background.png')";
        card.addEventListener("click", flip);
        theBoard.appendChild(card);   
        if (board.amountOfCards % 2 != 0 && i == board.amountOfCards-1) {
            card.style.opacity = "0";
            card.removeEventListener("click", flip);
            card.classList.remove("clickable");
        }
     
    }
    document.getElementById("menu-modal").style.display = "none";
    document.getElementById("victory").style.display = "none";
}

function flip(event) {
    if (!board.waiting) {
        var card = event.target;
        var theBoard = document.getElementById("board-container");
        if (board.flippedCardsArr[0]) {
            if (card.classList.value == board.flippedCardsArr[0].classList.value) {
                return;
            }
        }
        card.classList.add("flipped");
        board.currentFlippedCards++;
        var pic = document.createElement("img");
        pic.setAttribute("src", card.getAttribute("location"));
        card.appendChild(pic);
        board.flippedCardsArr.unshift(card);

        if (board.currentFlippedCards == 2) {
            board.waiting = true;
            checkIfSame(board.flippedCardsArr[0], board.flippedCardsArr[1]);
            emptyArray(board.flippedCardsArr);
            board.currentFlippedCards = 0;
        }
    }
}

function emptyArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        delete arr[i];
    }
}

function checkIfSame(card1, card2) {
    player.guesses++;
    setTimeout(() => {
        if (card1.getAttribute("location") == card2.getAttribute("location")) {
            card1.removeEventListener("click", flip);
            card2.removeEventListener("click", flip)
            player.rightGuesses++;
            if (player.rightGuesses == Math.floor(board.amountOfCards / 2)) {
                document.getElementById("menu-modal").style.display = "block";
                document.getElementById("victory").style.display = "flex";
                document.getElementById("guesses").innerHTML = player.guesses;
            }
        }
        else {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.removeChild(card1.getElementsByTagName("img")[0]);
            card2.removeChild(card2.getElementsByTagName("img")[0]);
        }
        board.waiting = false;
    }, 500);
}

function getImageArr() {
    var imageArr = shuffleArr(getNumbersArr());
    for (var i = 0; i < board.amountOfCards; i++) {
        imageArr[i] = "./images/" + board.deck + "/" + imageArr[i] + ".png";
    }
    return imageArr;
}

function getSelectedLevel() {
    if (board.amountOfCards != 0) {
        clearBoard();
    }
    board.level = this.classList[this.classList.lenght-1];
    board.amountOfCards = getItemNumber(this.classList[this.classList.length-1]);
    boardBuild();
}

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
    board.amountOfCards = 0;
    document.getElementById("menu-modal").style.display = "block";
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
        if (board.amountOfCards % 2 != 0 && i == Math.floor(board.amountOfCards/2)){
            return numbersArr.concat(numbersArr); 
        }
        numbersArr[i] = i + 1;
    }
 
        return numbersArr.concat(numbersArr);
}

document.getElementsByClassName("exit-img")[0].addEventListener("click", function () {
    document.getElementById("menu-modal").style.display = "none";
    document.getElementById("victory").style.display = "none";
});
document.getElementsByClassName("button-style")[0].addEventListener("click", clearBoard);

var levels = document.getElementsByClassName("my-level");
for (var i = 0; i < levels.length; i++) {
    levels[i].addEventListener("click", getSelectedLevel);
}
