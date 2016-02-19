Parse.initialize("gxu4L1e0XELkQTfADYQgfLtFHIov0P1TWcKh7KmV", "KuGlPT84K0fhs3Dwt3jCrFUbVVSxFoycOUCBvF8N");

var currentUser = Parse.User.current();

$(document).ready(function() {
  validateSession();
});

function validateSession() {
  if (currentUser && window.location.pathname == "/") {
    window.location = "/profile";
  } else if (currentUser == null && window.location.pathname != "/") {
    window.location = "/";
  }
}

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
    person.set("emotion", 50);

    person.signUp(null, {
      success: function(user) {
      	window.location = "/tutorial";
      },
      error: function(user, error) {
      	alert("The inputted email and username are alread taken");
      }
    });
  } else {
  	alert("Please Fill out all of fields");
  }
};

function login(res) {
  event.preventDefault();

  var username = document.getElementById("usernameLogin").value;
  var password = document.getElementById("passwordLogin").value;

  if (username && password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        window.location = "/profile";
      },
      error: function(user, error) {
      	alert("The username and password do not match or does not exist");
      }
    });
  } else {
  	alert("Please fill out both fields");
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
	var container = document.getElementById("friendsList");
	var node = document.createElement("LI");
	var inputNode = document.createElement("input");
	var label = document.createElement("label");
	label.setAttribute("for", newFriend);
	label.innerHTML = newFriend;
	inputNode.type = "checkbox";
	inputNode.class = "filled-in";
	inputNode.id = newFriend;
	node.appendChild(inputNode);
	node.appendChild(label);
	container.appendChild(node);
	alert("You have just added " + newFriend + " as a friend!");
};

function listFriends() {
	var currUser = Parse.User.current();
	currUser.fetch();
	console.log(currUser);
	console.log(currUser.get("username"));
	var friendsList = currUser.get("friends");
	var container = document.getElementById("friendsList");
	for(var i = 0; i < friendsList.length; i++) {
		var node = document.createElement("LI");
		var inputNode = document.createElement("input");
		var label = document.createElement("label");
		label.setAttribute("for", friendsList[i]);
		label.innerHTML = friendsList[i];
		inputNode.type = "checkbox";
		inputNode.class ="filled-in"
		inputNode.id = friendsList[i];
		node.appendChild(inputNode);
		node.appendChild(label);
		container.appendChild(node);
	}
	console.log("listFriends is being called");
	console.log(inputNode.checked);
};

function resetCheckCount() {
  checkCount = 0;
};

function checkedCount() {
  event.preventDefault();
  var checkCount = 0;
  console.log($(":checkbox").length);
  $(":checkbox").each(function() {
    if(this.checked) {
      checkCount++;
      console.log(checkCount);
    }
  });
  console.log(checkCount);
  updatePoints(checkCount);
};

function showPoints() {
  //only should be used for profile
  currentUser.fetch();
  var newPoints = currentUser.get("points");
  document.getElementById("point").innerHTML = newPoints;
  return newPoints;
};

function showLevel() {
  //only should be used for profile
  currentUser.fetch();
  var newLevel = currentUser.get("level");
  document.getElementById("level").innerHTML = newLevel;
  return newLevel;
};

function showEmotion() {
  currentUser.fetch();
  return currentUser.get('emotion');
};

function avatarCheck() {
  currentUser.fetch();
  // console.log(currentUser.get('avatar'));
  return currentUser.get('avatar');
};

function avatarSet() {
  var ava = avatarCheck();
  var place = "images/ditto.png";
  if (ava == 1) {
    return place = "images/ditto.png";
  } else if (ava == 2) {
    return place = "images/corgi_friendler.png";
  } else if (ava == 3) {
    return place = "images/check.jpg";
  } else if (ava == 4) {
    return place = "images/backpack.png";
  }
};

function moodSet() {
  var mood = showEmotion();
  if (mood <= 25) {
    return "('°□°）'︵ ┻━┻";
  } else if (mood > 25 && mood <= 40) {
    return place = "┬─┬ノ( º _ ºノ)";
  } else if (mood > 40 && mood <= 60) {
    return place = "(•_•)";
  } else if (mood > 60 && mood <= 99) {
    return place = "v(^_^)v";
  } else if (mood == 100) {
    return place = "( ﾟヮﾟ)";
  }
};

function updatePoints(count) {
  event.preventDefault();
  var currUser = Parse.User.current();
  console.log(currUser);
  var currPoints = currUser.get('points');
  console.log(currPoints);
  var gainedXP = 200 * count;
  var newPoints = currPoints + gainedXP;
  currUser.save({
    points: newPoints,
  }, {
    success: function(currUser) {
      alert("YOU JUST GAINED " + gainedXP + " XP!!");
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
  if (userPts >= 1000) {
    console.log(pls);
    currentUser.set("points", userPts - 1000);
    currentUser.save();
    $('#BuyModal').openModal();
    console.log("success");
  } else {
    $('#FailModal').openModal();
    console.log("fail");
    console.log(userPts);
  }
};

function itemUsed() {
	var increase = showEmotion();
	if (increase + 5 > 100)
	{
		currentUser.set("emotion", 100);
	} else {
		currentUser.set("emotion", increase + 5);
	}
	currentUser.save();
	console.log(increase);
  $('#UseModal').openModal();
};
