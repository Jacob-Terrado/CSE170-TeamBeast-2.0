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
        person.set("avatar", "images/cuteSlime.jpg");
        person.set("friendlerName", "Slimey");
        person.set("emotion", 50);
        person.set("bar", 0);
        person.set("evolved", false);
        person.set("friends", []);
        person.set("itemA", 0);
        person.set("itemB", 0);
        person.set("itemC", 0);
        person.set("itemD", 0);

        person.signUp(null, {
            success: function (user) {
                window.location = "/tutorial";
            },
            error: function (user, error) {
                console.log(error);
            }
        });
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

    document.getElementById("friendName").value = "";
}

function listFriends() {
    currentUser.fetch();
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
}

function resetCheckCount() {
    checkCount = 0;
}

function checkedCount() {
    var checkCount = 0;
    $(":checkbox").each(function () {
        if (this.checked) {
            checkCount++;
        }
    });
    updatePoints(checkCount);
}

function storeFriendCount() {
    var friendCount = 0;
    $(":checkbox").each(function () {
        if (this.checked) {
            friendCount++;
        }
    });
    localStorage.setItem("numOfFriends", friendCount);
}

function storeFriendCount2(num) {
    localStorage.setItem("numOfFriends", num);
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
    var userAvatar = currentUser.get('avatar');
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
    // get the current amount of spending points
    var currPoints = currentUser.get('points');
    // get the current amount of total points earned
    var currXP = currentUser.get('bar');
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
}

function confMod(des, nameF, imageF, valueF) {
    document.getElementById("descript").innerHTML = des;
    document.getElementById("price").innerHTML = valueF;
    $('#ConfirmModal').openModal();
}

function purchase() {
    var pls = document.getElementById("pts").innerHTML;
    var itemP = document.getElementById("price").innerHTML
    currentUser.fetch();
    var userPts = currentUser.get('points');
    if (userPts >= itemP) {
        if (itemP == 2000) {
            amount = valueItemA();
            currentUser.set("itemA", amount + 1);
        }
        else if (itemP == 3000) {
            amount = valueItemB();
            currentUser.set("itemB", amount + 1);
        }
        else if (itemP == 5000) {
            amount = valueItemC();
            currentUser.set("itemC", amount + 1);
        }
        else if (itemP == 25000) {
            amount = valueItemD();
            currentUser.set("itemD", amount + 1);
        }
        newP = userPts - itemP
        currentUser.set("points", newP);
        $('#BuyModal').openModal();
        document.getElementById("update").innerHTML = newP;
    } else {
        $('#FailModal').openModal();
    }
    currentUser.save();
}

function itemUsed(text) {
    var increase = showEmotion();
    if (text == "Mystery Gift") {
        $('#PresentModal').openModal();
        currentUser.set("emotion", 100);
        amount = valueItemD();
        currentUser.set("itemD", amount - 1);
    } else {
        if (text == "Super Ball") {
            amount = valueItemA();
            currentUser.set("itemA", amount - 1);
        } else if (text == "Friendler Food") {
            amount = valueItemB();
            currentUser.set("itemB", amount - 1);
        } else if (text == "Coupon") {
            amount = valueItemC();
            currentUser.set("itemC", amount - 1);
        }
        $('#UseModal').openModal();
        $(".modal-content #invName").val(text);
        if (increase + 5 > 100) {
            currentUser.set("emotion", 100);
        } else {
            $('#UseModal').openModal();
            $(".modal-content #invName").val(text);
            if (increase + 5 > 100) {
                currentUser.set("emotion", 100);
            } else {
                currentUser.set("emotion", increase + 5);
                if ((increase + 5 >= 25) && (increase < 25)) {
                    alert("Your Friendler has finally put the table down. More gifts will make it happier!");
                } else if ((increase + 5 >= 40 ) && (increase < 40)) {
                    alert("Your Friendler is currently satisfied");
                } else if ((increase + 5 >= 60) && (increase < 60)) {
                    alert("Your Friendler is currently happy, Good job!");
                } else if ((increase + 5 >= 90) && (increase < 90)) {
                    alert("WOW, Your Friendler is the happiest it could be. YOU. Are an amazing Friend!!!");
                }
            }
        }
        currentUser.save();
    }
}

function levelUp() {
    currentUser.fetch();
    // store previous level
    var prevLevel = currentUser.get("level");
    // get the current user's total points
    var totalPoints = currentUser.get("bar");
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
}

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
}

function showName() {
    currentUser.fetch();
    $("#friendlerName").append(currentUser.get("friendlerName"));
}

function setName() {
    currentUser.fetch();
    var newName = document.getElementById("editName").value;
    currentUser.set("friendlerName", String(newName));
    currentUser.save();
    alert("You have just changed your Friendler's name to " + newName);
}

function valueItemA() {
    currentUser.fetch();
    return currentUser.get("itemA");
}

function valueItemB() {
    currentUser.fetch();
    return currentUser.get("itemB");
}

function valueItemC() {
    currentUser.fetch();
    return currentUser.get("itemC");
}

function valueItemD() {
    currentUser.fetch();
    return currentUser.get("itemD");
}

function itemChecker() {
    if (valueItemA() == 0) {
        document.getElementById("row1").style = "display:none;"
    } else {
        $("#row1").show();
    }

    if (valueItemB() == 0) {
        document.getElementById("row2").style = "display:none;"
    } else {
        $("#row2").show();
    }

    if (valueItemC() == 0) {
        document.getElementById("row3").style = "display:none;"
    } else {
        $("#row3").show();
    }

    if (valueItemD() == 0) {
        document.getElementById("row4").style = "display:none;"
    } else {
        $("#row4").show();
    }

    document.getElementById("inv").innerHTML = valueItemA();
    document.getElementById("inv2").innerHTML = valueItemB();
    document.getElementById("inv3").innerHTML = valueItemC();
    document.getElementById("inv4").innerHTML = valueItemD();

    if (valueItemA() == 0 && valueItemB() == 0 && valueItemC() == 0 && valueItemD() == 0) {
        document.getElementById("check").innerHTML = "No current items, is it time to go to the store?"
        document.getElementById('storeB').style.visibility = 'visible';
    } else {
        document.getElementById('storeB').style.visibility = 'hidden';
        document.getElementById("check").innerHTML = ""
    }
}