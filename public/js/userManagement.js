// Add to head: <script type="text/javascript" src="http://www.parsecdn.com/js/parse-latest.js"></script>
// Parse.Session.user => readonly of current user

Parse.initialize("gxu4L1e0XELkQTfADYQgfLtFHIov0P1TWcKh7KmV", "KuGlPT84K0fhs3Dwt3jCrFUbVVSxFoycOUCBvF8N");

var currentUser = Parse.User.current(); 

$(document).ready(function() {
	validateSession();
})

function validateSession() {
	if (currentUser && window.location.pathname == "/") {
		window.location = "/profile";
	} else if (currentUser == null && window.location.pathname != "/") {
		window.location = "/";
	}
};

function signUp() {
	event.preventDefault();

	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var username = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	if (firstName && lastName && username && email && password) {
	  var person = new Parse.User();
	  person.set("username", username);
	  person.set("password", password);
	  person.set("email", email);
	  person.set("firstName", firstName);
	  person.set("lastName", lastName);
	  person.set("points", 1000);
	  person.set("level", 1);
	  person.set("avatar", 1);

	  person.signUp(null, {success: function(user){
	  		// window.location = "http://localhost:3000/profile"
	  		window.location = "http://friendler.herokuapp.com/tutorial"
	      console.log("Sign up Success");
	  }, error: function(user, error){
	      console.log(error);
	  }});
	}
};

function login(res) {
	event.preventDefault();

	var username = document.getElementById("usernameLogin").value;
	var password = document.getElementById("passwordLogin").value;

	if (username && password) {
		Parse.User.logIn(username, password, {
		  success: function(user) {
		    // Do stuff after successful login.
		    // window.location = "http://localhost:3000/profile"
		    // window.location = "http://friendler.herokuapp.com/profile"
				console.log("successfull");
				window.location = "/profile";
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
		    console.log("unsuccessfull");
		  }
		});
	}
};

function logout() {
	Parse.User.logOut();
}

function resetPassword() {
	// Grab Email

	Parse.User.requestPasswordReset(email, {
  	success: function() {
  		// Password reset request was sent successfully
  	},
  	error: function(error) {
    	// Show the error message somewhere
    	alert("Error: " + error.code + " " + error.message);
  	}
	});
};

function addFriends() {
	var currUser = Parse.User.current();
	console.log(currUser);
	var newFriend = document.getElementById('username').value;
	console.log(newFriend);
	currUser.addUnique("friends", newFriend);
	currUser.save();
	alert("You have just added " + newFriend + " as a friend!");
}


function showPoints() {
	var currentUser = Parse.User.current();
	currentUser.fetch();
	return currentUser.get('points');
};

function showLevel() {
	currentUser.fetch();
	return currentUser.get('level');
};

function avatarCheck() {
	currentUser.fetch();
	// console.log(currentUser.get('avatar'));
	return currentUser.get('avatar');
};

function avatarSet() {
	var ava = avatarCheck();
	var place = "images/ditto.png";
	if (ava == 1)
	{
		return place = "images/ditto.png";

	}
	else if (ava == 2)
	{
		return place = "images/corgi_friendler.png";
	}
};

function updatePoints() {
	//event.preventDefault();
	var currUser = Parse.User.current();
	console.log(currUser);
	var currPoints = currUser.get('points');
	console.log(currPoints);
	var newPoints = currPoints + 200;
	currUser.save({
		points: newPoints,
	}, {
		success: function(currUser) {
			alert("YOU JUST GAINED XP");
		},
		error: function(currUser, error) {
			alert("FAILED TO GAIN XP");
		}
	});
	console.log(currUser.get("points"));
};


function purchase() {
	var pls = document.getElementById("pts").innerHTML;
	var userPts = currentUser.get('points');
	if (userPts >= 1000){
		console.log(pls);
		currentUser.set("points", userPts - 1000);
		currentUser.save();
		$('#BuyModal').openModal();
		console.log("success");
	}
	else{
		$('#FailModal').openModal();
		console.log("fail");
		console.log(userPts);
	}
};