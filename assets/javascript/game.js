
var user = {}; // the user's character
var defender = {} // the defender character
var resetCharacters = $("#characterList").html();

$("#characterList A").on("click", function(){
	
	// grab the current character
	var character = $(this).html();
	
	// is the player on the ring?
	if($(".player").html() == "" || Object.keys(user).length === 0){
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
		
		$(this).parent().hide();

		var n = 1;

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
					<strong>${defender.name}</strong> counter-attacks <strong>${user.name}</strong> for ${user.counter}.
				`);

				user.health -= user.counter;
				defender.health -= user.power*n;

				$(".player .health").html(`Health: ${user.health}`);
				$(".opponent .health").html(`Health: ${defender.health}`);

				if(user.health <= 0){

					$("#instructions")
						.removeClass("attack")
						.unbind("click")
						.html(`Game over! ${defender.name} defeated you!<br>Start again by selecting your character.`);

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
						.html(`You won! ${defender.name} is defeated!<br>Choose another opponent!`);

					defender = {};

					$("#characterList").addClass("chooseOponents").removeClass("disable");

				
				} 		
				

			});

	}
	return false;
});
