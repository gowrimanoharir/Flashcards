//Include required npm packages nad constructors

var inquirer=require('inquirer');
var BasicCard=require('./BasicCard');
var ClozeCard = require('./ClozeCard');

//blank array to store the cards entered by users
var flashcards = [];

//temp variables
var msg1, msg2, type;

//invoke the init function
getFlashCardType();


//function to get the Card type user wants to create
function getFlashCardType(){
	inquirer.prompt(
		{
	    type: "list",
	    name: "cardtype",
	    message: "What type of Flash cards do you want to use?",
	    choices: ["Basic", "Cloze"]
	   	}

		).then(function(response1){
			//based on selected card types set the message text for next set of prompts
			type=response1.cardtype;
			if(type==='Basic'){
				msg1 = "\nEnter front text of BasicCard";
				msg2 = "\nEnter back text of BasicCard";
			}
			else{
				msg1 = "\nEnter full text of ClozeCard";
				msg2 = "\nEnter cloze text of ClozeCard";
			}
			//call the function to display prompts to get the info of cards
			getFlashCards();
	});

}

//function to get the card information from the users to create the cards
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
		      message: "\nDo you want to create more cards?",
		      name: "continue",
		      default: false
		}
	]).then(function(response2){
			var tmpCard;
			//based on selected card types create the required objects and add to the array
			if(type==='Basic')
			{
				tmpCard = new BasicCard(response2.question, response2.answer);
				flashcards.push(tmpCard);
			}
			else{
				tmpCard = ClozeCard(response2.question, response2.answer);
				//if the user entry of cloze text is not part of full text then error displays else push the card
				if(tmpCard.partial.includes("Error")){
					console.log('\n'+tmpCard.partial);
				}
				else{
					flashcards.push(tmpCard);					
				}
			}
			//if user wanted to enter more data make a recursive call to get more data
			if(response2.continue){
				getFlashCards();
			}
			//else go to the next set of prompts asking if user wants to continue playing
			else{
					inquirer.prompt(
					{
					type: "list",
					name: "play",
					message: "\nDo you want to play the Flash Cards or end session?",
					choices: ["Play", "End"]
					}

					).then(function(response3){
						//if they want to play then call the related function
						if(response3.play==='Play'){
							playFlashCards();
						}
						else{
							console.log('\nThank you, Have a Good Day!!')
						}
				});
			}
	});

}


//function to display the cards one by one for the users to practice
var count = 0;
function playFlashCards(){
		if(count<flashcards.length){
			card = flashcards[count];
			//display the question card based on the card type
			type==='Basic' ? console.log('\nQuestion '+(count+1)+': '+card.front): console.log('\nQuestion '+(count+1)+': '+card.partial);
			
			//prompt for user to confirmation to move to next question
			inquirer.prompt({
				type:  "confirm",
				message: "\nMove to Next card?",
				name: "continue",
				default: false
			}).then(function(response4){
				//on confirmation to move display the answer, increase the array index recursive call the function to display the next question
				if(response4.continue){
					type==='Basic' ? console.log('\nAnswer '+(count+1)+': '+card.back) : console.log('\nAnswer '+(count+1)+': '+card.fullText);
					count++;
				}
				playFlashCards();
			});
		}
		//if end of cards is reached ask if the user want to go one more round
		else{
			inquirer.prompt({
				type:  "confirm",
				message: "\nDo you want to continue playing",
				name: "continue",
				default: false
			}).then(function(response5){
				
				//if yes confirms yes then reset the index to 0 and call the function again
				if(response5.continue){
					count=0;
					playFlashCards();
				}

				//if no end the play
				else{
					console.log("\nThank you, Have a Good Day!!");
				}
			});			
		}
}