var data = require('../inventory.json');

exports.view = function(req, res){
	res.render('./inventory.handlebars', data);
};