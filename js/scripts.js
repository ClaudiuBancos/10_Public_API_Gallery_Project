/* Scripts go here. */

var loadingImage = $("#loading_image");
loadingImage.hide();

/* Change the type selector box. */

var chosenTypeNumber;
var typeData;
var tempPokemonNumber;
$("select#type").change(function(e) {
	$(".gallery img").hide();
	loadingImage.show();
	chosenTypeNumber = $(this)[0].selectedOptions[0].value;
	if (chosenTypeNumber === "0") {
		$(".gallery img").show();
		loadingImage.hide();
	} else {
		$.get( "http://pokeapi.co/api/v2/type/" + chosenTypeNumber + "/", function( data3 ) {
			loadingImage.hide();
			typeData = data3;
			tempPokemonNumber = 1;
			for (i = 0; tempPokemonNumber < 152; i++) {
				tempPokemonNumber = typeData.pokemon[i].pokemon.url;
				tempPokemonNumber = tempPokemonNumber.replace("http://pokeapi.co/api/v2/pokemon/", "");
				tempPokemonNumber = tempPokemonNumber.replace("/", "");
				if (tempPokemonNumber < 152) {
					$("img#" + tempPokemonNumber).show();
				}
			}
		});
	}
});


/* Various variables */

var clickedPokemonImage;
var clickedPokemon;
var clickedPokemonName;
var clickedPokemonNumber;
var clickedPokemonDescription;
var type1;
var type2;
var mainData;
var secondaryData;


/* Click on a Pokemon. */

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function emptyOverlay() {
	$image.attr("src", "img/loading.gif");
	$name.text("");
	$typesP.html("");
	$caption.text("");
	$sprite1.attr("src", "");
	$sprite2.attr("src", "");
	$sprite3.attr("src", "");
	$sprite4.attr("src", "");
}

function fillOverlay() {
	$.get( "http://pokeapi.co/api/v2/pokemon-species/" + clickedPokemon.id + "/", function( data ) {
		mainData = data;
		
		clickedPokemonName = capitalize(mainData.name);
		clickedPokemonNumber = mainData.pokedex_numbers[mainData.pokedex_numbers.length - 1].entry_number;
		clickedPokemonDescription = mainData.flavor_text_entries[45].flavor_text;
		
		$image.attr("src", clickedPokemon.src);
		$name.text("#" + clickedPokemonNumber + " - " + clickedPokemonName);
		$caption.text(clickedPokemonDescription);
		
		$.get( "http://pokeapi.co/api/v2/pokemon/" + clickedPokemonNumber + "/", function( data2 ) {
			secondaryData = data2;
			
			
			if (secondaryData.types[1] === undefined) {
				type1 = capitalize(secondaryData.types[0].type.name);
				$typesP.html("<span class='type " + type1 + "'>" + type1 + "</span>");
			} else {
				type1 = capitalize(secondaryData.types[1].type.name);
				type2 = capitalize(secondaryData.types[0].type.name);
				$typesP.html("<span class='type " + type1 + "'>"+ type1 + "</span><span class='type + " + type2 + "'>" + type2 + "</span>");
			}

			$sprite1.attr("src", secondaryData.sprites.front_default);
			$sprite2.attr("src", secondaryData.sprites.back_default);
			$sprite3.attr("src", secondaryData.sprites.front_shiny);
			$sprite4.attr("src", secondaryData.sprites.back_shiny);
		});

	});
}

/* The actual clicking part */

$(".gallery img").click(function(e) {
	emptyOverlay();
	$overlay.show();
	clickedPokemonImage = $(this);
	clickedPokemon = $(this)[0];
	fillOverlay();
});


// These are basic elements the lightbox overlay uses.
var $overlay = $('<div id="overlay"></div>');
var $content_container = $('<div id="content_container"></div>');
var $container_div = $("<div class='display-image' id='display-image'></div>");
var $image = $("<img>");
var $textDiv = $("<div id='text-div'></div>");
var $name = $("<p></p>");
var $typesP = $("<p></p>");
var $caption = $("<p></p>");
var $spritesDiv = $("<div id='sprites-div'></div>");
var $sprite1 = $("<img class='sprite'>");
var $sprite2 = $("<img class='sprite'>");
var $sprite3 = $("<img class='sprite'>");
var $sprite4 = $("<img class='sprite'>");
var $back_button = $("<img class='button back_button' src='img/arrow_left.png'></img>");
var $forward_button = $("<img class='button forward_button' src='img/arrow_right.png'></img>");


//Puts the overlay together
$overlay.append($content_container);
$content_container.append($container_div);
$container_div.append($image);
$content_container.append($textDiv);
$textDiv.append($name);
$textDiv.append($typesP);
$textDiv.append($caption);
$spritesDiv.append($sprite1);
$spritesDiv.append($sprite2);
$spritesDiv.append($sprite3);
$spritesDiv.append($sprite4);
$textDiv.append($spritesDiv);
$overlay.append($back_button);
$overlay.append($forward_button);

$("body").append($overlay);


var target;
/* Click outside the overlay items */
$overlay.click(function(event){
	target = $(event.target);
	if (target.is(".button") || target.is(".display-image img") || target.is("#text-div") || target.is("#text-div img") || target.is("#text-div span") || target.is("#text-div p")) {
	} else {
		$overlay.hide();
	}
});



/* Click arrow buttons. */

function goToPrevPokemon() {
	if (clickedPokemonImage.prev()[0].style.display === "none") {
		clickedPokemonImage = clickedPokemonImage.prev();
		goToPrevPokemon();
	} else {
		emptyOverlay();
		clickedPokemonImage = clickedPokemonImage.prev();
		clickedPokemon = clickedPokemonImage[0];
		fillOverlay();
	}
}

function goToNextPokemon() {
	if (clickedPokemonImage.next()[0].style.display === "none") {
		clickedPokemonImage = clickedPokemonImage.next();
		goToNextPokemon();
	} else {
		emptyOverlay();
		clickedPokemonImage = clickedPokemonImage.next();
		clickedPokemon = clickedPokemonImage[0];
		fillOverlay();
	}
}

$back_button.click(function(e) {
	goToPrevPokemon();
});

$forward_button.click(function(e) {
	goToNextPokemon();
});


