var Letter = function(entry) {
	if(entry === " "){
		this.letter = " ";
		this.userGuess = true;
	} else {
		this.letter = "_";
		this.answer = entry;
		this.userGuess = false;
	}

	this.check = function(guess, callback){
		if(guess.toLowerCase() === this.answer){
			this.letter = guess.toLowerCase();
			this.userGuess = true;
			callback(true);
		}
	}
};

module.exports = Letter;