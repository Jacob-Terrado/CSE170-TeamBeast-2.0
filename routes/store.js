exports.view = function(req, res){
	res.render('./store.handlebars', {
	'stores': [
		{ 	'name': 'Waiting in Line',
		    'image': '/backpack.png',
		    'description': 'This is a backpack...',
		    'id': 'store01'
		},
		{ 	'name': 'User Test Results and Online Test Proposal',
			'image': '/ditto.png',
			'description': 'This is a ditto...',
			'id': 'store08'
		}    	
	]
  });
};