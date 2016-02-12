// Add to head: <script type="text/javascript" src="http://www.parsecdn.com/js/parse-latest.js"></script>
// Parse.Session.user => readonly of current user

Parse.initialize("gxu4L1e0XELkQTfADYQgfLtFHIov0P1TWcKh7KmV", "KuGlPT84K0fhs3Dwt3jCrFUbVVSxFoycOUCBvF8N");

function automaticLogin() {
	if (Parse.User.currentUser()) {
		// user is logged in
	} else {
		// user is not logged in
	}
};

function signUp() {
	// Grab values from DOM
  var person = new Parse.User();
  
  person.set("username", username);
  person.set("password", password);
  person.set("email", email);
  person.set("birthdate", birthdate);
  person.set("firstName", firstName);
  person.set("lastName", lastName);

  person.signUp(null, {success: function(user){
      console.log("Sign up Success");
  }, error: function(user, error){
      console.log(error);
  }});
  
   event.preventDefault();
};

function login() {
	// Grab username and password from DOM

	Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	  }
	});
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
	// Get the friends array, then push an object in it, then set it again
};

