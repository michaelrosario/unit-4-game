
var user = {}; // the user's character
var defender = {} // the defender character
var resetCharacters = $("#characterList").html();
var n; // level of the user

$("#characterList A").on("click", function(){
	
	// grab the current character
	var character = $(this).html();

	// is the player on the ring?
	if($(".player").html() == "" || Object.keys(user).length === 0){
		
		n = 1;

		user.name = $(this).attr('data-name');
		user.health = $(this).attr('data-health');
		user.power = $(this).attr('data-power');
		user.counter = $(this).attr('data-counter');
		$(".player").html(character);
		$("#characterList").addClass("chooseOponents");
		$("#instructions").html("Choose the Defender!");
		$(".opponent,#fightLog").html("");
		$(this).parent().hide();

	// is the defender on the ring?
	} else if($(".opponent").html() == "" || Object.keys(defender).length === 0 ) {
		
		$(".opponent").html(character);
		defender.name = $(this).attr('data-name');
		defender.health = $(this).attr('data-health');
		defender.power = $(this).attr('data-power');
		defender.counter = $(this).attr('data-counter');
		$(".theRing").addClass("ready");
		$("#characterList")
			.removeClass("chooseOponents")
			.addClass("disable");
		
		$(".opponent").removeClass("defeated");

		$(this).parent().hide();

		

		$("#instructions")
			.html("Click here to Attack!")
			.addClass("attack")
			.bind("click",function(){
				console.log("Attack button pressed");
				console.log(user);
				console.log(defender);

				$("#fightLog").html(`
					<br>
					<strong>${user.name}</strong> attacks <strong>${defender.name}</strong> for ${user.power*n++}.<br>
					<strong>${defender.name}</strong> counter-attacks <strong>${user.name}</strong> for ${defender.counter}.
				`);

				user.health -= defender.counter;
				defender.health -= user.power*n;

				$(".player .health").html(`Health: ${user.health}`);
				$(".opponent .health").html(`Health: ${defender.health}`);

				if(user.health <= 0){

					$("#instructions")
							.removeClass("attack")
							.unbind("click");

					if(defender.health <= 0){
						$("#instructions")
							.html(`Game over! <strong>${user.name}</strong> and <strong>${defender.name}</strong> killed each other!<br>Start again by selecting your character.`);

					} else {

						$("#instructions")
							.html(`Game over! <strong>${defender.name}</strong> defeated you!<br>Start again by selecting your character.`);
					}
					user = {};
					defender = {};
					$(".theRing").removeClass("ready");
					$("#characterList")
						.removeClass("chooseOponents")
						.removeClass("disable");

					 $("#characterList :hidden").show();

				} else if(defender.health <= 0){

					$("#instructions")
						.removeClass("attack")
						.unbind("click")
						.html(`You won! <strong>${defender.name}</strong> is defeated!<br>Choose another opponent!`);

					defender = {};

					$(".opponent").addClass("defeated");

					$("#characterList").addClass("chooseOponents").removeClass("disable");

					if($("#characterList li:visible").length === 0){
						$("#instructions")
							.addClass("winner")
							.html(`CONGRATULATIONS <strong>${user.name}</strong> beat all the opponents!`);
						$(".opponent,.versus").hide();
						$(".player").addClass("winner");
					}

					

				
				} 		
				

			});

	}
	return false;
});
