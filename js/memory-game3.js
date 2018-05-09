

board = {
    width: "",
    height: "",
    level: "",
    amountOfCards: 0,
    deck: "first",
    currentFlippedCards: 0,
    flippedCardsArr: []

}

player = {
    name: "",
    score: "",
    time: ""
}

function boardBuild() {
    var theBoard = document.getElementById("board-container");
    imagesArr = getImageArr(); // will return an array filled with images reffs (index 0 is 1)
    for (var i = 0; i < board.amountOfCards; i++) {
        var card = document.createElement("div");
        card.classList.add("cards");
        card.setAttribute("location", imagesArr[i]);
        // card.setAttribute("isFlipped", "no");/////////////
        // card.setAttribute("flipNum","0"]);/////////////
        card.setAttribute("id", "card" + i);
        card.style.width = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.style.height = 100 / Math.sqrt(board.amountOfCards) + "%";
        // card.style.backgroundImage = "url("+imagesArr[i]+")";
        card.addEventListener("click", flip);
        theBoard.appendChild(card);
    }
}

function flip(event) {
    var card = document.getElementById(event.target.id);
    var theBoard = document.getElementById("board-container");
    // if (card.getAttribute("isFlipped") == no) {/////////////////
    // card.setAttribute("isFlipped","yes");
    if( card == null){/////////////////////////////////////////////////////////////////////////////why is the second click NULL?????????????????????/
        // debugger;
        return;
    }
    // debugger;

    if (board.currentFlippedCards != 2 && (event.target != board.flippedCardsArr[0] || event.target != board.flippedCardsArr[0])) {
        // debugger;
        board.currentFlippedCards++;
        var pic = document.createElement("img");
        pic.setAttribute("src", card.getAttribute("location"));
        card.appendChild(pic);
        board.flippedCardsArr.unshift(card);
        // wait for 2 seconds and than
    }
    else if (board.currentFlippedCards == 2) {
        checkIfSame(board.flippedCardsArr[0],board.flippedCardsArr[1]);
        // if (board.flippedCardsArr[0].getAttribute("location") != board.flippedCardsArr[1].getAttribute("location")) {
        //     board.flippedCardsArr[0].removeChild(board.flippedCardsArr[0].getElementsByTagName('img')[0]);
        //     board.flippedCardsArr[1].removeChild(board.flippedCardsArr[1].getElementsByTagName('img')[0]);
        // }
        // else {
        //     // board.flippedCardsArr[0].removeChild(board.flippedCardsArr[0].getElementsByTagName('img')[0]);
        //     // board.flippedCardsArr[0].removeChild(board.flippedCardsArr[0].getElementsByTagName('img')[0]);
        // }

        // // }
        emptyArray(board.flippedCardsArr);
        board.currentFlippedCards = 0;
    }


    // }/////////////////////
}
function emptyArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        delete arr[i];
    }
}

function checkIfSame(card1, card2) {
    // debugger;
    if (card1.getAttribute("location") == card2.getAttribute("location")) {
        // card1.setAttribute("isFlipped","yes");
        card1.removeEventListener("click", flip);
        card2.removeEventListener("click", flip)
    }
    else {
        card1.removeChild(card1.getElementsByTagName("img")[0]);
        card2.removeChild(card2.getElementsByTagName("img")[0]);
    }
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

