//Constructor to create the Basic Cards

function BasicCard(front, back){
	//making it a scope safe contructor
	if(this instanceof BasicCard){
		this.front=front;
		this.back=back;
	}
	else{
		return new BasicCard(front, back);
	}
};

//Create a sample BasicCard without New Keyword

var firstPresident = BasicCard(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log("\nSample Basic Card Front: "+firstPresident.front); 

// "George Washington"
console.log("\nSample Basic Card Back: "+firstPresident.back); 

//export the constructor to be able to used in other programs
module.exports = BasicCard;