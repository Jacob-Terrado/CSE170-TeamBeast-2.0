var data = require('../evolution.json');

exports.viewEvolution= function(req, res){
	res.render("evolution", data);
};