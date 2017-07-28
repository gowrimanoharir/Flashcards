//Constructor to create the Cloze Cards

function ClozeCard(text, cloze){
	//making it a scope safe contructor	
	if(this instanceof ClozeCard){
		this.cloze = cloze;
		this.fullText = text;
		this.partial = this.getPartial();
	}
	else{
		return new ClozeCard(text, cloze);
	}
};

//Prototype function to get the partial text or error text based on the cloze card inputs
ClozeCard.prototype.getPartial = function(){
			return this.fullText.trim().includes(this.cloze.trim()) ? 
					this.fullText.split(this.cloze).join('....') : 
					("Error: "+this.cloze+" doesn't appear in "+this.fullText);
};

//Create a sample ClozeCard with New Keyword

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log("\nSample Cloze Card Cloze Text: "+firstPresidentCloze.cloze); 

// " ... was the first president of the United States.
console.log("\nSample Cloze Card Partial: "+firstPresidentCloze.partial); 

// "George Washington was the first president of the United States.
console.log("\nSample Cloze Card Full text: "+firstPresidentCloze.fullText);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");

console.log("\nSample error condition:" +brokenCloze.partial);

//export the constructor to be able to use in another file
module.exports = ClozeCard;