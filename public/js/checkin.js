$(document).ready(function() {
	initializePage();
	 // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
})

function initializePage() {
	$("#searchBtn").click(getVenues);
}

function getVenues(e) {
	e.preventDefault();
	var search = $("#searchFor").val();
	var foursquareAPI = 'https://api.foursquare.com/v2/venues/search?near=San+Diego,CA&query=' + String(search) + 
	'&limit=10&client_id=N2AQKMAJ2TLXIVZ3JOXIUJXYB1QTLZ53QDHQ5UFXNCCWW3J1' +
	'&client_secret=TKPOJPABNSEBHUCVTCD0UUA40RXHEZE3BLX4CT15B1NBIWEP&v=20140806&m=foursquare';
	$.getJSON(foursquareAPI, displayVenues);
}

function displayVenues(result) {
	$.each(result.response.venues, function(i,venues){
			var openModal = $('#modal1').openModal();
            var content = 
            	'<a href="#modal1 onClick="' + openModal + ';"> <div class="row" id="' + venues.name + '">' +
            	'<p>' + venues.name + '</p></div></a>';
            $(content).appendTo("#places");
    });
}