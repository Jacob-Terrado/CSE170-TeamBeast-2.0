var data = require('../inventory.json');

exports.viewInventory = function(req, res){
	res.render("inventory", data);
};