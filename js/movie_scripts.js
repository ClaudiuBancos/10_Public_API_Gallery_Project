function emptyOverlay() {
	$image.attr("src", "img/loading.gif");
	$name.text("");
	$year.html("");
	$runtime.text("");
	$caption.text(""); 
}

var ajaxTarget;
var clickedMovieImage;
var clickedMovie;
var mainData;
function fillOverlay() {
	ajaxTarget = "http://www.omdbapi.com/?i=" + clickedMovie.id + "&plot=short&r=json";
	$.get(ajaxTarget, function( data ) {
		mainData = data;
		
		$image.attr("src", clickedMovie.src);
		$name.text(mainData.Title);
		$year.text(mainData.Year);
		$runtime.text("Runtime: " + mainData.Runtime);
		$caption.text(mainData.Plot); 
	});
		
}

$(".movie_gallery img").click(function(e) {
	emptyOverlay();
	$overlay.show();
	clickedMovieImage = $(this);
	clickedMovie = $(this)[0];
	fillOverlay();
});




// These are basic elements the lightbox overlay uses.
var $overlay = $('<div id="overlay"></div>');
var $content_container = $('<div id="content_container"></div>');
var $container_div = $("<div class='display-image' id='display-image'></div>");
var $image = $("<img>");
var $textDiv = $("<div id='text-div'></div>");
var $name = $("<p></p>");
var $year = $("<p></p>");
var $runtime = $("<p></p>");
var $caption = $("<p></p>");
var $back_button = $("<img class='button back_button' src='img/arrow_left.png'></img>");
var $forward_button = $("<img class='button forward_button' src='img/arrow_right.png'></img>");



//Puts the overlay together
$overlay.append($content_container);
$content_container.append($container_div);
$container_div.append($image);
$content_container.append($textDiv);
$textDiv.append($name);
$textDiv.append($year);
$textDiv.append($runtime);
$textDiv.append($caption);
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




function goToPrevMovie() {
	if (clickedMovie.id !== "tt0190641") {
		emptyOverlay();
		clickedMovieImage = clickedMovieImage.prev();
		clickedMovie = clickedMovieImage[0];
		fillOverlay();
	}
}

function goToNextMovie() {
	if (clickedMovie.id !== "tt5889204") {
		emptyOverlay();
		clickedMovieImage = clickedMovieImage.next();
		clickedMovie = clickedMovieImage[0];
		fillOverlay();
	}
}

$back_button.click(function(e) {
	goToPrevMovie();
});

$forward_button.click(function(e) {
	goToNextMovie();
});