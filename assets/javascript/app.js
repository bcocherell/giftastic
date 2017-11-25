
// Initial array of gifs
var gifs = ['dogs', 'cats', 'beer', 'cleveland', 'cleveland indians', 'corey kluber', 'francisco lindor', 'jose ramirez', 'cleveland cavaliers', 'lebron james'];

// Function for displaying gif topics
function renderButtons() {

	$('#buttons').empty();

	// Looping through the array of gif topics
	for (var i = 0; i < gifs.length; i++) {

		// Then dynamicaly generating buttons for each topic in the array
		var a = $('<button type="button" class="btn btn-info">');

		a.addClass('gif');
		a.attr('data-gif', gifs[i]);
		a.text(gifs[i]);
		$('#buttons').append(a);
	}
}

function displayGifs() {

	//call GIPHY API using ajax and display repsonses 

	var topic = $(this).attr("data-gif");

	var queryurl = 'https://api.giphy.com/v1/gifs/search';
	  	queryurl += '?' + $.param({
	    'api_key': 'EjOW2pXPXn1zo5U08aDOfyDnEO2AWZzV',
	    'q':topic,
	    'limit':'10'
	});

	$.ajax({
		url: queryurl,
		method: 'GET',
	}).done(function(response) {

		var gifs = response.data;

		$('#gifs').empty();

		for (var i = 0; i < gifs.length; i++) {

			var div = $('<div class="list-item pull-left">');
			var p = $('<p>').text("Rating: " + gifs[i].rating);

			var img = $('<img class="giphy img-responsive">');
			img.attr('src', gifs[i].images.fixed_height_still.url);
			img.attr('data-state', 'still');
			img.attr('data-animate', gifs[i].images.fixed_height.url);
			img.attr('data-still', gifs[i].images.fixed_height_still.url);

			div.append(p);
			div.append(img);

			$('#gifs').append(div);
		}
	});
}

$('#add-gif').on('click', function(event) {

	//add button to list

	event.preventDefault();
	var gif = $('#gif-input').val().trim();
	gifs.push(gif);

	renderButtons();
});

$(document).on('click', '.gif', displayGifs);

$(document).on('click', '.giphy', function() {
	
	var state = $(this).attr('data-state');
	
	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Else set src to the data-still value

	if (state === 'still') {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');
	} else {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');	
	}

});

renderButtons();