var inquirer=require('inquirer');
var BasicCard=require('./BasicCard');
var ClozeCard = require('./ClozeCard');


var flashcards = [];

getFlashCardType();
var msg1, msg2, type;

function getFlashCardType(){
	inquirer.prompt(
		{
	    type: "list",
	    name: "cardtype",
	    message: "What type of Flash cards do you want to use?",
	    choices: ["Basic", "Cloze"]
	   	}

		).then(function(response1){
			type=response1.cardtype;
			if(type==='Basic'){
				msg1 = "Enter front text of BasicCard";
				msg2 = "Enter back text of BasicCard";
			}
			else{
				msg1 = "Enter full text of ClozeCard";
				msg2 = "Enter cloze text of ClozeCard";
			}
			getFlashCards();
	});

}

function getFlashCards(){
		inquirer.prompt([

		{
			  type: "input",
		      message: msg1,
		      name: "question"
		},
		{
			  type: "input",
		      message: msg2,
		      name: "answer"
		},
		{
			  type: "confirm",
		      message: "Do you want to create more cards?",
		      name: "continue",
		      default: false
		}
	]).then(function(response2){
			var tmpCard;
			if(type==='Basic')
			{
				tmpCard = new BasicCard(response2.question, response2.answer);
			}
			else{
				tmpCard = new ClozeCard(response2.question, response2.answer);
			}
			
			flashcards.push(tmpCard);

			if(response2.continue){
				getFlashCards();
			}
			else{
					inquirer.prompt(
					{
					type: "list",
					name: "play",
					message: "Do you want to play the Flash Cards or end session?",
					choices: ["Play", "End"]
					}

					).then(function(response3){
						
						if(response3.play==='Play'){
							playFlashCards();
						}
						else{
							console.log('Thank you, Have a Good Day!!')
						}
				});
			}
	});

}

function playFlashCards(){
	flashcards.forEach(function(card){
		type==='Basic' ? console.log(card.front): console.log(card.partial);
	});

}