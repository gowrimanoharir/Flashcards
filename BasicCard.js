function BasicCard(front, back){
	if(this instanceof BasicCard){
		this.front=front;
		this.back=back;
	}
	else{
		return new BasicCard(front, back);
	}
};

var firstPresident = new BasicCard(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 

module.exports = BasicCard;