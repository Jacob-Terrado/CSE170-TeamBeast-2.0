var data = require('../friends.json');

exports.view = function(req, res){
	res.render('./friends.handlebars', data);
};