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
                //console.log(error);
                Materialize.toast(error.message, 1000);
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
                Materialize.toast(error.message, 1000);
            }
        });
    }
}

function logout() {
    Parse.User.logOut();
}

function resetPassword() {
    event.preventDefault();
    var email = document.getElementById("emailReset").value;

    Parse.User.requestPasswordReset(email, {
        success: function () {
            Materialize.toast("Password request sent to your email", 2000);
            $("#passwordModal").closeModal();
        },
        error: function (error) {
            Materialize.toast(error.message, 1000);
        }
    });
}

function addFriends() {
    currentUser.fetch();
    console.log(currentUser);

    var newFriend = document.getElementById('friendName').value;
    var currFriends = currentUser.get("friends");

    if ( $.trim( $('#friendName').val() ) == '' ) {
        alert("I'm sorry what was your friend's name again? Please try again.");
    }
    else if (currFriends.indexOf(String(newFriend)) > -1){
        alert("You already have a friend named: " + newFriend + ". Please enter a different name.");
    }
    else {
        currentUser.addUnique("friends", newFriend);
        currentUser.save();

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

        // open friend modal after
        $('#addFriendConfirmModal').openModal();  
    }
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
            inputNode.class = "filled-in";
            inputNode.value = String(friendsList[i]);
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

function deleteFriends() {
    console.log("we are in delete friends");
    var newArr = currentUser.get("friends");
    console.log(newArr);
    var count = $(":checkbox").length;
    console.log("The number of checkboxes are: " + $(":checkbox").length);
    console.log("The count is: " + count);

    var i = 0;
    $(":checkbox").each(function() {
        if (this.checked) {
            console.log("Deleting " + newArr[i]);
            newArr.splice(i, 1);
        } else {
            i++;
        }
    })
    console.log("After deleting: " + newArr);
    currentUser.set("friends", newArr);
    currentUser.save();
    window.location.href = "friends";
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
        console.log(userAvatar);
        var imgHTML = "<img class='responsive-img' src='" + userAvatar + "'>";
        // if (userAvatar == "images/reg-sloth.gif") {
        // mood = showEmotion();
        // console.log(mood);
        // if (mood < 25){
        //     var sGif = "<img class='responsive-img' src='images/sad-sloth.gif'>";
        // }
        // if (mood >= 25 && mood < 60){
        //     var sGif = "<img class='responsive-img' src='images/reg-sloth.gif'>";
        // }  
        // if (mood >= 60 && mood < 90){
        //     var sGif = "<img class='responsive-img' src='images/happy-sloth.gif'>";
        // }  
        // if (mood >= 90){
        //     var sGif = "<img class='responsive-img' src='images/max-sloth.gif'>";
            
        // }   
        // $("#avatar").append(sGif); 
        $("#avatar").append(imgHTML);
    }

function avatarSet(number) {
    currentUser.fetch();
    switch (number) {
        case 1:
            currentUser.set("avatar", "images/reg-sloth.gif");
            break;
        case 2:
            currentUser.set("avatar", "images/corgi.gif");
            break;
        case 3:
            currentUser.set("avatar", "images/chao.jpg");
            break;
        case 4:
            currentUser.set("avatar", "images/alpaca.jpg");
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

    document.getElementById("evolutionPickMessage").innerHTML = "Your Friendler evolved";
    $('#evolutionPickModal').openModal();
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

    document.getElementById("checkInMessage").innerHTML = "You just gained " + pt + " points! Reward your Friendler by purchasing items at the store!";
    $('#successfulCheckInModal').openModal();
    setTimeout(function() {window.location.href = "profile"}, 2500);

    // save data to the database
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

function confMod(des, nameF, imageF, valueF) {
    document.getElementById("descript").innerHTML = des;
    document.getElementById("price").innerHTML = valueF;
    console.log(nameF);
    if (nameF == "Super Ball"){
        document.getElementById("stock").innerHTML = "Amount in Inventory: " + valueItemA();
    }
    else if (nameF == "Friendler Food"){
        document.getElementById("stock").innerHTML = "Amount in Inventory: " + valueItemB();
    }
    else if (nameF == "Coupon"){
        document.getElementById("stock").innerHTML = "Amount in Inventory: " + valueItemC();
    }
    else if (nameF == "Mystery Gift"){
        document.getElementById("stock").innerHTML = "Amount in Inventory: " + valueItemD();
    }
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
            console.log(currentUser.get("itemA"));
        }
        else if (itemP == 3000) {
            amount = valueItemB();
            currentUser.set("itemB", amount + 1);
            console.log(currentUser.get("itemB"));
        }
        else if (itemP == 5000) {
            amount = valueItemC();
            currentUser.set("itemC", amount + 1);
            console.log(currentUser.get("itemC"));
        }
        else if (itemP == 25000) {
            amount = valueItemD();
            currentUser.set("itemD", amount + 1);
            console.log(currentUser.get("itemD"));
        }
        newP = userPts - itemP;
        currentUser.set("points", newP);
        currentUser.save();
        $('#BuyModal').openModal();
        document.getElementById("update").innerHTML = newP;
    } else {
        $('#FailModal').openModal();
    }
}

function itemUsed(text) {
    event.preventDefault();
    var increase = showEmotion();
    if (text == "Mystery Gift") {
        $('#PresentModal').openModal();
        currentUser.set("emotion", 100);
        amount = valueItemD();
        currentUser.set("itemD", amount - 1);
        currentUser.save();
        console.log(currentUser.get("itemD"));
    } else {
        if (text == "Super Ball") {
            amount = valueItemA();
            currentUser.set("itemA", amount - 1);
        console.log(currentUser.get("itemA"));
        } else if (text == "Friendler Food") {
            amount = valueItemB();
            currentUser.set("itemB", amount - 1);
        console.log(currentUser.get("itemB"));
        } else if (text == "Coupon") {
            amount = valueItemC();
            currentUser.set("itemC", amount - 1);
        console.log(currentUser.get("itemC"));
        }
            $('#UseModal').openModal();
            document.getElementById("invName").innerHTML = text;
            if (increase + 5 > 100) {
                currentUser.set("emotion", 100);
            } else {
                currentUser.set("emotion", increase + 5);
                if ((increase + 5 >= 25) && (increase < 25)) {
                    document.getElementById("itemUsedMessage").innerHTML = "Your Friendler would like more gifts";
                    $('#itemUsedModal').openModal();
                } else if ((increase + 5 >= 40 ) && (increase < 40)) {
                    document.getElementById("itemUsedMessage").innerHTML = "Your Friendler is very satisfied.";
                    $('#itemUsedModal').openModal();
                } else if ((increase + 5 >= 60) && (increase < 60)) {
                    document.getElementById("itemUsedMessage").innerHTML = "Your Friendler is in a happy mood ^^";
                    $('#itemUsedModal').openModal();
                } else if ((increase + 5 >= 90) && (increase < 90)) {
                    document.getElementById("itemUsedMessage").innerHTML = "Your Friender is the happiest it could be! YOU are an amazing Friend";
                    $('#itemUsedModal').openModal();
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
        document.getElementById("levelUpMessage").innerHTML = "" + document.getElementById("friendlerName").innerHTML + " is now level " + nextLevel + "!";
        $('#levelUpModal').openModal();
    }
}

function showEvo() {
    currentUser.fetch();
    var checkLevel = currentUser.get("level");
    var evolved = currentUser.get('evolved');
    if (checkLevel >= 3 && !evolved) {
        document.getElementById("evolutionMessage").innerHTML = "You can now evolve " + document.getElementById("friendlerName").innerHTML + "!";
        $('#evolutionModal').openModal();
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

function getName() {
    currentUser.fetch();
    return currentUser.get("friendlerName");
}

function setName() {
    currentUser.fetch();
    var newName = document.getElementById("editName").value;
    currentUser.set("friendlerName", String(newName));
    currentUser.save();
    alert("You have just changed your Friendler's name to " + newName);
}

function xpModal() {
    currentUser.fetch();
    $('#XPModal').openModal();
    currXP = showXP();
    if (currXP == 0) {
        needXP = "Need EXP: 0";
    }
    else {
        needXP = "Need EXP: " + (1000 - currXP);
    }
    currXP = "Current EXP: " + showXP() + "/1000";
    document.getElementById('cXP').innerHTML = currXP;
    document.getElementById('nXP').innerHTML = needXP;
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
