$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$("#searchBtn2").click(getVenues2);
}

function getVenues2(e) {
	e.preventDefault();
	var search = $("#searchFor2").val();
	var foursquareAPI = 'https://api.foursquare.com/v2/venues/search?near=San+Diego,CA&query=' + String(search) + 
	'&limit=10&client_id=N2AQKMAJ2TLXIVZ3JOXIUJXYB1QTLZ53QDHQ5UFXNCCWW3J1' +
	'&client_secret=TKPOJPABNSEBHUCVTCD0UUA40RXHEZE3BLX4CT15B1NBIWEP&v=20140806&m=foursquare';
	$.getJSON(foursquareAPI, displayVenues2);
}

function displayVenues2(result) {
	$.each(result.response.venues, function(i,venues){
            var content = 
            	'<a onClick="updatePoints2()"> <div class="row" id="' + venues.name + '">' +
            	'<p>' + venues.name + '</p></div></a>';
            $(content).appendTo("#places2");
    });
}

function updatePoints2() {
	event.preventDefault();
    currentUser.fetch();
    // get the number of friends checked from friends list
    var count = localStorage.getItem("numOfFriends");
    // get the current amount of spending points
    var currPoints = currentUser.get('points');
    // get the current amount of total points earned
    var currXP = currentUser.get('bar');
    // set the new point values to be stored
    var newCount = parseInt(count) + 1;
    var pt = 200 * (newCount);
    var newPoints = currPoints + pt;
    var exp = 200 * (newCount);
    var newXP = currXP + exp;
    // save data to the database

    document.getElementById("checkInMessage").innerHTML = "You just gained " + pt + " points! Reward your Friendler by purchasing items at the store!";
    $('#successfulCheckInModal').openModal();
    setTimeout(function() {window.location.href = "profile"}, 2500);

    currentUser.save({
        points: newPoints,
        bar: newXP
    }, {
        success: function (currUser) {
        },
        error: function (currUser, error) {
        }
    });

}