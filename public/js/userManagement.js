    Parse.initialize("gxu4L1e0XELkQTfADYQgfLtFHIov0P1TWcKh7KmV", "KuGlPT84K0fhs3Dwt3jCrFUbVVSxFoycOUCBvF8N");

var currentUser = Parse.User.current();

$(document).ready(function () {
    validateSession();
    $('.slider').slider();
    $('.carousel').carousel();
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
        person.set("username", username.toLowerCase());
        person.set("password", password);
        person.set("email", email);
        person.set("firstName", firstName);
        person.set("lastName", lastName);
        person.set("points", 0);
        person.set("level", 1);
        person.set("avatar", "images/ditto.png");
        person.set("emotion", 50);
        person.set("bar", 0);
        person.set("evolved", false);
        person.set("friends", []);

        person.signUp(null, {
            success: function (user) {
                window.location = "/tutorial";
            },
            error: function (user, error) {
                alert("The inputted email and username are already taken");
            }
        });
    } else {
        alert("Please Fill out all of fields");
    }
}

function login() {
    event.preventDefault();

    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;

    if (username && password) {
        Parse.User.logIn(username.toLowerCase(), password, {
            success: function (user) {
                window.location = "/profile";
            },
            error: function (user, error) {
                alert("The username and password do not match or does not exist");
            }
        });
    } else {
        alert("Please fill out both fields");
    }
}

function logout() {
    Parse.User.logOut();
}

function resetPassword() {
    // Grab Email

    Parse.User.requestPasswordReset(email, {
        success: function () {
            // Password reset request was sent successfully
        },
        error: function (error) {
            // Show the error message somewhere
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function addFriends() {
    var currUser = Parse.User.current();
    console.log(currUser);

    var newFriend = document.getElementById('friendName').value;
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

    document.getElementById("friendName").value = "";
}

function listFriends() {
    currentUser.fetch();
    console.log(currentUser);
    console.log(currentUser.get("username"));
    var friendsList = currentUser.get("friends");
    var container = document.getElementById("friendsList");
    if (friendsList) {
        for (var i = 0; i < friendsList.length; i++) {
            var node = document.createElement("LI");
            var inputNode = document.createElement("input");
            var label = document.createElement("label");
            label.setAttribute("for", friendsList[i]);
            label.innerHTML = friendsList[i];
            inputNode.type = "checkbox";
            inputNode.class = "filled-in"
            inputNode.id = friendsList[i];
            node.appendChild(inputNode);
            node.appendChild(label);
            container.appendChild(node);
        }
    }
    console.log("listFriends is being called");
    //console.log(inputNode.checked);
}
/*
function listEvolutions() {
    // stores all the friendler objects
    var query = new Parse.Query("Friendler");
    var container = document.getElementById("evolutions");
    var projectHTML = "";
    query.each(function(user) {
        projectHTML = "<li><img class='responsive-img' src='" + user.get("path") + "' id='" + user.get("name") + "'</li>'";
        $('#evolutions').append(projectHTML);
        console.log(user);
        console.log("Friendler name: " + user.get("name"));
        console.log("Friendler path: " + user.get("path"));
    });
}
*/
function resetCheckCount() {
    checkCount = 0;
}

function checkedCount() {
    var checkCount = 0;
    console.log($(":checkbox").length);
    $(":checkbox").each(function () {
        if (this.checked) {
            checkCount++;
            console.log(checkCount);
        }
    });
    console.log(checkCount);
    updatePoints(checkCount);
}

function storeFriendCount() {
    var friendCount = 0;
    console.log("There are these many checkboxes: " + $(":checkbox").length);
    $(":checkbox").each(function() {
        if (this.checked) {
            friendCount++;
        }
    });
    console.log("Friend count is at: " + friendCount);
    localStorage.setItem("numOfFriends", friendCount);
}

function showPoints() {
    //only should be used for profile
    currentUser.fetch();
    var newPoints = currentUser.get("points");
    document.getElementById("point").innerHTML = newPoints;
    return newPoints;
}

function showLevel() {
    //only should be used for profile
    currentUser.fetch();
    var newLevel = currentUser.get("level");
    document.getElementById("level").innerHTML = newLevel;
    return newLevel;
}

function showEmotion() {
    currentUser.fetch();
    return currentUser.get('emotion');
}

function showXP() {
    currentUser.fetch();
    return currentUser.get('bar');
}

function avatarCheck() {
    currentUser.fetch();
    console.log(currentUser.get('avatar'));
    var userAvatar = currentUser.get('avatar');
    console.log(userAvatar);
    var imgHTML = "<img class='responsive-img' src='" + userAvatar + "'>";
    $("#avatar").append(imgHTML);
    return userAvatar;
}

function avatarSet(number) {
    currentUser.fetch();
    switch (number) {
        case 1:
            currentUser.set("avatar", "images/alpaca.jpg");
            break;
        case 2:
            currentUser.set("avatar", "images/captainPlanet.jpg");
            break;
        case 3:
            currentUser.set("avatar", "images/chao.jpg");
            break;
        case 4:
            currentUser.set("avatar", "images/chocobo.jpg");
            break;
        case 5:
            currentUser.set("avatar", "images/corgi_friendler.png");
            break;
        case 6:
            currentUser.set("avatar", "images/dragonSlime.png");
            break;
        case 7:
            currentUser.set("avatar", "images/dragonSlimeZangeif.png");
            break;
        case 8:
            currentUser.set("avatar", "images/okamiden.jpg");
            break;
        case 9:
            currentUser.set("avatar", "images/yoshi.jpg");
            break;
    }
    currentUser.set("evolved", true);
    currentUser.save();
    alert("You have evolved into a new Friendler!");
}

function moodSet() {
    var mood = showEmotion();
    if (mood < 25) {
        return "('°□°）'︵ ┻━┻";
    } else if (mood >= 25 && mood < 40) {
        return place = "┬─┬ノ( º _ ºノ)";
    } else if (mood >= 40 && mood < 60) {
        return place = "(•_•)";
    } else if (mood >= 60 && mood < 90) {
        return place = "v(^_^)v";
    } else if (mood >= 90) {
        return place = "( ﾟヮﾟ)";
    }
}

function updatePoints(count) {
    event.preventDefault();
    currentUser.fetch();
    console.log(currentUser);
    // get the current amount of spending points
    var currPoints = currentUser.get('points');
    // get the current amount of total points earned
    var currXP = currentUser.get('bar');
    console.log(currPoints);
    // set the new point values to be stored
    var pt = 200 * (count + 1);
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

function confMod(des, nameF, imageF, valueF) {
    console.log(des);
    console.log(nameF);
    console.log(imageF);
    console.log(valueF);
    $(".modal-content #descript").val(des);
    $(".modal-content #price").val(valueF);
    $('#ConfirmModal').openModal();
}


function purchase() {
    var pls = document.getElementById("pts").innerHTML;
    console.log($(".modal-content #descript").val());
    console.log($(".modal-content #price").val());
    var itemP = $(".modal-content #price").val();
    console.log(itemP);
    currentUser.fetch();
    var userPts = currentUser.get('points');
    console.log(userPts);
    if (userPts >= itemP) {
        console.log(pls);
        newP = userPts - itemP
        currentUser.set("points", newP);
        currentUser.save();
        $('#BuyModal').openModal();
        document.getElementById("update").innerHTML = newP;
        console.log("success");
    } else {
        $('#FailModal').openModal();
        console.log("fail");
        console.log(userPts);
    }
}

function itemUsed(text, val) {
    var increase = showEmotion();
    console.log(text);
    if (text == "Mystery Gift"){
        $('#PresentModal').openModal();
        currentUser.set("emotion",100);
    }
    else{
    $('#UseModal').openModal();
    $(".modal-content #invName").val(text);
    if (increase + 5 > 100) {
        currentUser.set("emotion", 100);
    } else {
        currentUser.set("emotion", increase + 5);
        if ((increase + 5 >= 25) && (increase < 25))
        {
            alert("Your Friendler has finally put the table down. More gifts will make it happier!");
        }
        else if ((increase + 5 >= 40 ) && (increase < 40)){
            alert("Your Friendler is currently satisfied");
        }
        else if ((increase + 5 >= 60) && (increase < 60)) {
            alert("Your Friendler is currently happy, Good job!");
        }
        else if ((increase + 5 >= 90) && (increase < 90)){
            alert("WOW, Your Friendler is the happiest it could be. YOU. Are an amazing Friend!!!");
        }
    }
}
    console.log(increase);
    currentUser.save();
}

function levelUp() {
    currentUser.fetch();
    // store previous level 
    var prevLevel = currentUser.get("level");
    console.log(prevLevel);
    // get the current user's total points
    var totalPoints = currentUser.get("bar");
    console.log(totalPoints);
    // variable for the next level
    var nextLevel;

    // check if the total points entitle a level up
    if (totalPoints >= 1000) {
        nextLevel = prevLevel + 1;
        currentUser.set("level", nextLevel);
        currentUser.set("bar", 0);
        currentUser.save();
        alert("You have just leveled up to " + nextLevel + "!!");
        //window.location.href = "profile";
    }
};

function showEvo() {
    currentUser.fetch();
    var checkLevel = currentUser.get("level");
    var evolved = currentUser.get('evolved');
    if (checkLevel >= 3 && !evolved) {
        alert("You can now evolve your friendler!!!");
        document.getElementById('evo').style.visibility = 'visible';
    }
    else {
        document.getElementById('evo').style.visibility = 'hidden';
    }
};