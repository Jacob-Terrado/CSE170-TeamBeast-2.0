// Add to head: <script type="text/javascript" src="http://www.parsecdn.com/js/parse-latest.js"></script>
// Parse.Session.user => readonly of current user

Parse.initialize("gxu4L1e0XELkQTfADYQgfLtFHIov0P1TWcKh7KmV", "KuGlPT84K0fhs3Dwt3jCrFUbVVSxFoycOUCBvF8N");

$(document).ready(function() {
	 // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	 var friends = listFriends();
	 var theTemplateScript = $("#friendsList").html();
	 var theTemplate = Handlebars.compile(theTemplateScript);

	 $(document.body).append(theTemplate(friends));
})

function listFriends() {
	var currUser = Parse.User.current();
	console.log(currUser);
	var friendsArray = currUser.get("friends");
	console.log(friendsArray);
	var friendsList = {friends: friendsArray}
	console.log(friendsList);
	return friendsList;
};