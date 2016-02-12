exports.view = function(req, res){
	res.render('./store.handlebars', {
	'stores': [
		{ 	'name': 'Super Backpack',
		    'image': '/backpack.png',
		    'description': 'This is a backpack...',
		    'id': 'store01'
		},
		{ 	'name': 'Ditto',
			'image': '/ditto.png',
			'description': 'This is a ditto...',
			'id': 'store08'
		}    	
	]
  });
};