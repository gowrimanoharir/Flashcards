function ClozeCard(text, cloze){
	if(this instanceof ClozeCard){
		this.cloze = cloze;
		this.fullText = text;
		this.partial = this.getPartial();
	}
	else{
		return new ClozeCard(text, cloze);
	}
};

ClozeCard.prototype.getPartial = function(){
			return this.fullText.toLowerCase().trim().includes(this.cloze.toLowerCase().trim()) ? 
					this.fullText.split(this.cloze).join('....') : 
					console.log(this.cloze+" doesn't appear in "+this.fullText);
};

var firstPresidentCloze = ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial); 

// "George Washington was the first president of the United States.
console.log(firstPresidentCloze.fullText);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");

module.exports = ClozeCard;