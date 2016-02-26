$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$("#searchBtn2").click(getVenues2);
}

function getVenues2(e) {
	e.preventDefault();
	console.log("we are calling getVenues2");
	var search = $("#searchFor2").val();
	var foursquareAPI = 'https://api.foursquare.com/v2/venues/search?near=San+Diego,CA&query=' + String(search) + 
	'&limit=10&client_id=N2AQKMAJ2TLXIVZ3JOXIUJXYB1QTLZ53QDHQ5UFXNCCWW3J1' +
	'&client_secret=TKPOJPABNSEBHUCVTCD0UUA40RXHEZE3BLX4CT15B1NBIWEP&v=20140806&m=foursquare';
	$.getJSON(foursquareAPI, displayVenues2);
}

function displayVenues2(result) {
	console.log("we are in displayVenues2");
	$.each(result.response.venues, function(i,venues){
            var content = 
            	'<a onClick="updatePoints2()"> <div class="row" id="' + venues.name + '">' +
            	'<p>' + venues.name + '</p></div></a>';
            $(content).appendTo("#places2");
    });
}

function updatePoints2() {
	event.preventDefault();
	console.log("Calling updatePoints2");
    currentUser.fetch();
    console.log(currentUser);
    // get the number of friends checked from friends list
    var count = localStorage.getItem("numOfFriends");
    console.log("This is the count from storage: " + count);
    // get the current amount of spending points
    var currPoints = currentUser.get('points');
    // get the current amount of total points earned
    var currXP = currentUser.get('bar');
    console.log("User's current points are: " + currPoints);
    // set the new point values to be stored
    var newCount = parseInt(count) + 1;
    console.log("The newCount is at: " + newCount);
    var pt = 200 * (newCount + 1);
    console.log("pt value is: " + pt + " and count is " + newCount);
    var newPoints = currPoints + pt;
    var exp = 200 * (count + 1);
    var newXP = currXP + exp;
    // save data to the database
    currentUser.save({
        points: newPoints,
        bar: newXP
    }, {
        success: function (currUser) {
            alert("YOU JUST GAINED " + pt + " Points!!");
            window.location.href = "profile";
        },
        error: function (currUser, error) {
            alert("FAILED TO GAIN XP");
        }
    });
    console.log(currentUser.get("points"));

}