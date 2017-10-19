var inquirer = require('inquirer')
var Word = require('./Word')

var Game = function () {
	var self = this;
	this.guessesLeft = null;
	this.gameLogic = function (word) {

		inquirer.prompt([
				{
					type: "input",
			        message: "Guess a Letter",
			        name: "userGuess"
				},
				])
			.then(function(inquirerResponse){
				word.userCheck(inquirerResponse.userGuess, function(array, correct){
				var wordPrint = "";
					for (var i = 0; i < array.length; i++) {
						wordPrint += " " + array[i].letter

					}
					if(correct === true){
						console.log("Nice!")
					} else {
						console.log("Sooooo Wrong!")
						console.log(this.guessesLeft-- + " Guesses Left!")
						if (this.guessesLeft < 0) {
							console.log("You Lost You Big Loser!!!");
							self.newGameLogic();
						}
					}
					console.log(wordPrint)
					if(word.checkVictory()){
						self.gameLogic(word);
					} else {
						console.log("Congrats!!! You Won!!! Party Time!!!");
						self.newGameLogic();
					}
				});
			});
	};

	this.newGameLogic = function () {
		inquirer.prompt([
			{
				type: "list",
	        	message: "Wanna Hang a Guy?",
	        	choices: ["Yes", "No"],
	        	name: "replay"
			},
			])
		.then(function(inquirerResponse){
			if (inquirerResponse.replay === "Yes") {
				this.guessesLeft = 10;
				var word = new Word();
				word.getWord(function(array){
				word.letters = array;
				var wordPrint = "";
					for (var i = 0; i < array.length; i++) {
						wordPrint += " " + array[i].letter

					}
					console.log(wordPrint)
					self.gameLogic(word);
				});
			} else if (inquirerResponse.replay === "No") {
				console.log("Bye Bye!")
			}
		});
	};
};



var game = new Game();
game.newGameLogic();

