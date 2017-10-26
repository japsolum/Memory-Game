// Array of objects representing each card for gameboard.
var cards = [
	{
		"cardValue" : 1,
		"imageSrc" : "images/card1.svg",
		"cardId" : "card1"
	},
	{
		"cardValue" : 1,
		"imageSrc" : "images/card1.svg",
		"cardId" : "card2"
	},
	{
		"cardValue" : 2,
		"imageSrc" : "images/card2.svg",
		"cardId" : "card3"
	},
	{
		"cardValue" : 2,
		"imageSrc" : "images/card2.svg",
		"cardId" : "card4"
	},
	{
		"cardValue" : 3,
		"imageSrc" : "images/card3.svg",
		"cardId" : "card5"
	},
	{
		"cardValue" : 3,
		"imageSrc" : "images/card3.svg",
		"cardId" : "card6"
	},
	{
		"cardValue" : 4,
		"imageSrc" : "images/card4.svg",
		"cardId" : "card7"
	},
	{
		"cardValue" : 4,
		"imageSrc" : "images/card4.svg",
		"cardId" : "card8"
	},
	{
		"cardValue" : 5,
		"imageSrc" : "images/card5.svg",
		"cardId" : "card9"
	},
	{
		"cardValue" : 5,
		"imageSrc" : "images/card5.svg",
		"cardId" : "card10"
	},
	{
		"cardValue" : 6,
		"imageSrc" : "images/card6.svg",
		"cardId" : "card11"
	},
	{
		"cardValue" : 6,
		"imageSrc" : "images/card6.svg",
		"cardId" : "card12"
	},
	{
		"cardValue" : 7,
		"imageSrc" : "images/card7.svg",
		"cardId" : "card13"
	},
	{
		"cardValue" : 7,
		"imageSrc" : "images/card7.svg",
		"cardId" : "card14"
	},
	{
		"cardValue" : 8,
		"imageSrc" : "images/card8.svg",
		"cardId" : "card15"
	},
	{
		"cardValue" : 8,
		"imageSrc" : "images/card8.svg",
		"cardId" : "card16"
	}
];

//Randomizes array of cards
function randomize(array) {
	var randomIndex,
		tempVal;

	for (var i = array.length - 1; i >= 0; i--) {
		randomIndex = Math.floor(Math.random() * i);
		tempVal = array[i];
		array[i] = array[randomIndex];
		array[randomIndex] = tempVal;
	}
}

var timer,
	timerMinutes,
	timerSeconds,
	sec = 0;

// Keeps timer on page.
function pad(val) {return val > 9 ? val : "0" + val;}
	timer = setInterval(function(){
	    timerMinutes = pad(parseInt(sec/60,10));
	    timerSeconds = pad(++sec%60);
	    $("#seconds").html(timerSeconds);
	    $("#minutes").html(timerMinutes);
	}, 1000);

var turn = 1,
	numClicks = 0;

function cardClick() {
	var id = this.id,
		imageSrc = this.name;

	if ($(this).hasClass('active')) {
	    if (turn == 1){
	    	firstSelection(id, imageSrc);
	    }

	    else {
	    	numClicks += 1;
	        updateStats(numClicks);
	        if (firstImageSrc === imageSrc){
	        	isMatch(id, imageSrc);
	        }
	        else{
	        	nonMatch(id, imageSrc);
	        }
	    }
	}
}

var firstId,
	firstImageSrc;

//Flips first card over and saves that cards info as the first selection.
function firstSelection(id, imageSrc){
    firstId =id;

    $("#" + firstId).attr("src", imageSrc);
    $("#" + firstId).removeClass('active');
    firstImageSrc = imageSrc;
    turn += 1;
}

var correct = 0;

//If second selection is a match, makes sure both cards are disabled,
//adds 1 to the correct counter, and sets both backgrounds to white.
//Also Checks to see if they have matched all 8 pairs, and ends game 
//if they have.
function isMatch(id, imageSrc) {
    $("#" + id).attr("src", imageSrc);
    turn = 1;
    correct += 1;
    $("#" + firstId).toggleClass("blueCard").toggleClass("whiteCard");
    $("#" + id).toggleClass("blueCard").toggleClass("whiteCard").toggleClass('active');
    $("#" + id).removeClass("active");
    if (correct === 8){
      clearInterval(timer);
      setTimeout(function () {
        var playAgain = window.confirm("Congratulations! You finished in only " + 
        				timerMinutes + ":" + timerSeconds + ", with only " + 
        				numClicks + " moves! You receive a " + starRating + 
        				" rating! Want to play again?");
        if (playAgain === true){
          location.reload();
        }
      }, 500);
    } 
}

function nonMatch(id, imageSrc){
	$("#" + id).attr("src", imageSrc);
	$("#" + firstId).toggleClass("blueCard").toggleClass("redCard");
	$("#" + id).toggleClass("blueCard").toggleClass("redCard");
    $(".card").removeClass("active");

    setTimeout(function () {
    	$("#" + firstId).attr("src", "images/card.png");
    	$("#" + id).attr("src", "images/card.png");
    	$("#" + firstId).toggleClass("blueCard").toggleClass("redCard");
		$("#" + id).toggleClass("blueCard").toggleClass("redCard");
    	$(".blueCard").addClass("active");
    }, 1000);

    turn = 1;
}

var starRating = "3 Star";

function updateStats(noOfClicks){
    $("#noOfMoves").html(noOfClicks + " Moves");
    if ((noOfClicks >= 13) && (noOfClicks < 18)){
       	$("#star3").attr("src", "images/empty_star.svg");
       	starRating = "2 star";
    }
    else if (noOfClicks >= 18) {
       	$("#star2").attr("src", "images/empty_star.svg");
    	starRating = "1 star";
    }
}

//Initializes the gameboard
function initializeGameBoard() {
	var createRow,
		createCard,
		gameBoardHeight = 4,
		gameboardWidth = 4,
		cardCount = 0;

	randomize(cards);

	for (var i = 0; i < gameBoardHeight; i++) {
		createRow = "<div class='row' id ='row" + i + "'></div>";
		$('#gameBoard').append(createRow);

		for(var n = 0; n < gameboardWidth; n++) {
			cardCount = (i * 4) + n;

			createCard = '<img class="card blueCard active" name="' + 
						cards[cardCount].imageSrc + 
						'" id= "' + 
						cards[cardCount].cardId + 
						'" src="images/card.png">';
			$("#row" + i).append(createCard);

			$("#" + cards[cardCount].cardId).click(cardClick);
		}
	}

	$("#gameBoard").append("<div class = 'resetRow'></div>");
	$(".resetRow").append("<div class = 'reset'>Reset</div>");
	$(".reset").click(function() {
		location.reload();
	});
}

initializeGameBoard();
