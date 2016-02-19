var data = require('../store.json');

exports.viewStore = function(req, res){
	res.render("store", data);
};