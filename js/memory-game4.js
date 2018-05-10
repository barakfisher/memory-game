// TO DO LIST:
// clickind twice on the same card => (ERROR) => disappear
// winning modal
// top menu
// if possiable add some of the functions to the user/the board

board = {
    width: "",
    height: "",
    level: "",
    amountOfCards: 0,
    deck: "first",
    currentFlippedCards: 0,
    flippedCardsArr: [],
    waiting: false
}

player = {
    name: "",
    score: "",
    time: "",
    rightGuesses: 0 
}

function boardBuild() {
    var theBoard = document.getElementById("board-container");
    imagesArr = getImageArr(); // will return an array filled with images reffs (index 0 is 1)
    for (var i = 0; i < board.amountOfCards; i++) {
        var card = document.createElement("div");
        card.classList.add("cards","clickable");
        card.setAttribute("location", imagesArr[i]);
        card.style.width = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.style.height = 100 / Math.sqrt(board.amountOfCards) + "%";
        card.addEventListener("click", flip);
        theBoard.appendChild(card);
    }
    document.getElementById("victory").style.display = "none";
}

function flip(event) {
    if (!board.waiting) {
        var card = event.target;
        var theBoard = document.getElementById("board-container");
        if (board.flippedCardsArr[0]) {
            if (card.classList.value == board.flippedCardsArr[0].classList.value) {/////////////////////////////////////////
                return;
            }
        }

        // if (event.target != board.flippedCardsArr[0]) {//////////////////////////////////////////////////////////try without
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
    setTimeout(() => {
        if (card1.getAttribute("location") == card2.getAttribute("location")) {
            card1.removeEventListener("click", flip);
            card2.removeEventListener("click", flip)
            player.rightGuesses ++;
            
            if(player.rightGuesses == board.amountOfCards/2 ){
                // zeroAll();
                debugger;
                document.getElementById("victory").style.display = "block"; 
        
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
    board.level = document.getElementById("selectLevel").value;
    board.amountOfCards = getItemNumber(document.getElementById("selectLevel").value);
    boardBuild();
}
document.getElementById("selectLevel").addEventListener("change", getSelectedLevel);
document.getElementsByClassName("exit-img")[0].addEventListener("click", function(){
    document.getElementById("victory").style.display ="none";
});


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



stopWatch = {
            seconds: 0,
            minutes: 0,
            cond: true,
            status: true
        }
        document.getElementById("start").addEventListener("click", toStart);
        document.getElementById("stop").addEventListener("click", toZero);


        function secondsCount() {
            function test() {
                if (stopWatch.cond == true) {
                    if (stopWatch.seconds == 59) {
                        stopWatch.seconds = 0;
                        stopWatch.minutes++;
                    }
                    if (stopWatch.minutes == 59) {
                        stopWatch.minutes = 0;
                    }
                    stopWatch.seconds++;
                    document.getElementById("dateId").innerHTML =  stopWatch.minutes+ ":" + stopWatch.seconds;
                } else {
                    clearInterval(x);
                }
            }
               var x= setInterval(test, 1000);
        }

        function toZero() {
            stopWatch.seconds = 0;
            stopWatch.minutes = 0;
            stopWatch.cond = false;
            stopWatch.status = true;
            secondsCount();
        }
        function toStart() {
            if(stopWatch.status===true){
                stopWatch.status = false;
                stopWatch.cond = true;
                secondsCount();
            }
        }

