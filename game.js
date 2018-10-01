exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  var players          = new Array();

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;

  function Player(playerName) {
    this.playerName = playerName;
    this.coins = 0;
    this.inPenaltyBox = false;
    this.location = 0;
  }

  var howManyPlayers = function() {
    return players.length;
  };

  var changePlayer = function() {
    currentPlayer = (currentPlayer + 1) % howManyPlayers();
  }

  var didPlayerWin = function() {
    return !(players[currentPlayer].coins == 6)
  };

  var currentCategory = function(location){
    switch(location) {
      case 0:
      case 4:
      case 8:
        return 'Pop';
      case 1:
      case 5:
      case 9:
        return 'Science';
      case 2:
      case 6:
      case 10:
        return 'Sports';
      default:
        return 'Rock';
    }
  };

  var createRockQuestion = function(index) {
    return "Rock Question " + index;
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push(createRockQuestion(i));
  };

  this.isPlayable = function(howManyPlayers) {
    return howManyPlayers() >= 2;
  };

  this.add = function(playerName) {
    players.push(new Player(playerName));

    console.log(playerName + " was added");
    console.log("They are player number " + howManyPlayers());

    return true;
  };

  var noQuestionsLeft = function(category) {
    console.log(category + " has no questions left");
  }

  var askQuestion = function(category) {
    switch(category) {
    case 'Pop':
      if(popQuestions.length != 0)
        console.log(popQuestions.shift());
      else {
        noQuestionsLeft('Pop');
      }
      break;
    case'Science':
      if(popQuestions.length != 0)
        console.log(scienceQuestions.shift());
      else {
        noQuestionsLeft('Science');
      }
      break;
    case 'Sports':
      if(popQuestions.length != 0)
        console.log(sportsQuestions.shift());
      else {
       noQuestionsLeft('Sports');
      }
      break;
    case 'Rock':
      if(popQuestions.length != 0)
        console.log(rockQuestions.shift());
      else {
        noQuestionsLeft('Rock');
      }
      break;
    default:
      console.log("No such category");
    }
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer].playerName + " is the current player");
    console.log("They have rolled a " + roll);

    if(players[currentPlayer].inPenaltyBox){
      console.log(players[currentPlayer].playerName + " is in the penalty box with an odd roll the player gets out!");
      if(roll % 2 != 0){
        console.log(players[currentPlayer].playerName + " is getting out of the penalty box");
      } 
      else {
        console.log(players[currentPlayer].playerName + " is not getting out of the penalty box");
        return;
      }
    } 
    players[currentPlayer].location = (players[currentPlayer].location + roll) % 12;
    console.log(players[currentPlayer].playerName + "'s new location is " + players[currentPlayer].location);
    var category = currentCategory(players[currentPlayer].location);
    console.log("The category is " + category);
    askQuestion(category);
  };

  var correctAnswer = function() {
    var gameNotWon = true;
    if(!players[currentPlayer].inPenaltyBox) {
        console.log('Answer was correct!!!!');
        players[currentPlayer].coins += 1;
        console.log(players[currentPlayer].playerName + " now has " +
                    players[currentPlayer].coins  + " Gold Coins.");

        gameNotWon = didPlayerWin();
        changePlayer();
    }
    return gameNotWon;
  };

  var wrongAnswer = function() {
    console.log('Question was incorrectly answered');
    console.log(players[currentPlayer].playerName + " was sent to the penalty box");
    players[currentPlayer].inPenaltyBox = true;

    changePlayer();
    return true;
  };

  this.submitAnswer = function(answer) {
    if(answer == 7)
      return wrongAnswer();
    else
      return correctAnswer();
  };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do {
  game.roll(Math.floor(Math.random() * 6) + 1);
  notAWinner = game.submitAnswer(Math.floor(Math.random() * 10));
} while(notAWinner);
