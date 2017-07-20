module.exports = ClozeCard;

function ClozeCard(text, cloze){
	this.cloze = cloze;
	this.fullText = text;
	this.getPartial = function(){
		return this.fullText.toLowerCase().trim().includes(this.cloze.toLowerCase().trim()) ? 
				this.fullText.split(this.cloze.toLowerCase()).join('....') : 
				console.log(this.cloze+" doesn't appear in "+this.fullText);
		 
	};
	this.partial = this.getPartial();
};

var flash=new ClozeCard("George washington is the first president", "george washington ");
console.log(flash.partial);

var flash1 = new ClozeCard("I am a dog and a cat", "DOG");
console.log(flash1.partial);