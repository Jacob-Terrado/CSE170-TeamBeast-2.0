var data = require('../friends.json');

exports.viewFriends = function(req, res) {
	res.render("friends");
};