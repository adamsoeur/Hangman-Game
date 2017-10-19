var Letter = require('./Letter.js')
var fs = require('fs')

var Word = function() {
	this.letters = [];
	this.wordPrompt = function(callback){
		fs.readFile('./words.txt', 'utf8', function(error, data) {
			if(error){
				console.log("error!")
			} else {
				var wordArray = data.split(',');
				var num = Math.floor(Math.random() * wordArray.length);
				var randomWord = wordArray[num];
				var test = [];
				for (var i = 0; i < randomWord.length; i++) {
					var newLetter = new Letter(randomWord[i]);
					test.push(newLetter)
				}
				this.letters = test;
				callback(this.letters)
			}
		});
	};

	this.userCheck = function(guess, callback){
		var correctGuess = false;
		for (var i = 0; i < this.letters.length; i++) {
			this.letters[i].check(guess, function(correct){
				if(correct === true){
					correctGuess = true
				}
			});
		}
		callback(this.letters, correctGuess)
	};

	this.checkVictory = function() {
		var test = 0;
		for (var i = 0; i < this.letters.length; i++) {

			if(this.letters[i].userGuess === false) {
				test++;
			}
		}
		return test;
	};
};
module.exports = Word;