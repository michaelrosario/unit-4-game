
var user = {}; // the user's character
var defender = {} // the defender character
var n; // level of the user

$("#characterList A").on("click", function(){
	
	// grab the current character
	var character = $(this).html();

	// is the player on the ring?
	if( Object.keys(user).length === 0 ) {
		
		n = 1; // level of the player

		// set the player's stats
		user.name = $(this).attr('data-name');
		user.health = $(this).attr('data-health');
		user.power = $(this).attr('data-power');
		user.counter = $(this).attr('data-counter');

		// put the player to the ring and remove classes added from previous rounds
		$(".player")
			.html(character)
			.removeClass("winner");

		// show, since this could be hidden on player win
		$(".opponent,.versus").show(); 

		// this class add styling to the character list when oponent is empty
		$("#characterList").addClass("chooseOponents");
		
		// add instructions to the player and remove classes added from previous rounds
		$("#instructions")
			.html("Choose the Defender!")
			.removeClass("winner");

		// empty previous logs and oponent
		$(".opponent,#fightLog").empty();

		// hide their selection from the characterList
		$(this).parent().hide();


	// is the defender on the ring?
	} else if( Object.keys(defender).length === 0 ) {

		// set the defender's stats
		defender.name = $(this).attr('data-name');
		defender.health = $(this).attr('data-health');
		defender.power = $(this).attr('data-power');
		defender.counter = $(this).attr('data-counter');
		
		// put the defender to the ring and remove classes added from previous rounds
		$(".opponent")
			.html(character)
			.removeClass("defeated");

		// set the ring class to ready for styling in css
		$(".theRing").addClass("ready");

		// add disabled styling to the characterList
		$("#characterList")
			.removeClass("chooseOponents")
			.addClass("disable");

		// hide their selection from the characterList
		$(this).parent().hide();

		// convert the instructions to a button and bind it functionality
		$("#instructions")
			.html("Click here to Attack!") 	// change text to CTA
			.addClass("attack")				// add class for styling in CSS
			.bind("click",function(){
				console.log("Attack button pressed");	// Console debug
				console.log(user);						// The user data
				console.log(defender);					// The defender data

				// Add the calculations and display
				$("#fightLog").html(`
					<br>
					<strong>${user.name}</strong> attacks <strong>${defender.name}</strong> for ${user.power*n++}.<br>
					<strong>${defender.name}</strong> counter-attacks <strong>${user.name}</strong> for ${defender.counter}.
				`);

				// Decrement user and defender health
				user.health -= defender.counter;
				defender.health -= user.power*n;

				// Display user and defender health
				$(".player .health").html(`Health: ${user.health}`);
				$(".opponent .health").html(`Health: ${defender.health}`);

				// CASE 1 : User dies
				if(user.health <= 0){

					$("#instructions")
							.removeClass("attack")
							.unbind("click");


					// CASE 2 : They both die
					if(defender.health <= 0){
						$("#instructions")
							.html(`Game over! <strong>${user.name}</strong> and <strong>${defender.name}</strong> killed each other!<br>Start again by selecting your character.`);
		
					} else {

						$("#instructions")
							.html(`Game over! <strong>${defender.name}</strong> defeated you!<br>
								Start again by selecting your player above.`);
					}

					// RESETS
					resetGame();

				// CASE 3 : Defender dies
				} else if(defender.health <= 0){

					$("#instructions")
						.removeClass("attack")
						.unbind("click")
						.html(`You won! <strong>${defender.name}</strong> is defeated!<br>Choose another opponent!`);

					defender = {};

					$(".opponent").addClass("defeated");

					$("#characterList").addClass("chooseOponents").removeClass("disable");

					// All opponents have been defeated
					if($("#characterList li:visible").length === 0){
						$("#instructions")
							.addClass("winner")
							.html(`CONGRATULATIONS <strong>${user.name}</strong> beat all the opponents!<br>
								Start again by selecting your player above.`);
						$(".opponent,.versus").hide();
						$(".player").addClass("winner");
						
						// RESETS
						resetGame();
						
					}
				
				} 				

			});

	}
	return false;
});


function resetGame(){
	user = {};
	defender = {};
	$(".theRing").removeClass("ready");
	$("#characterList")
		.removeClass("chooseOponents")
		.removeClass("disable")
	$("#characterList :hidden").show();

}
