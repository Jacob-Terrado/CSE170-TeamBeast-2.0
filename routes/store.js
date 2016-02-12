exports.view = function(req, res){
	res.render('./store.handlebars', {
	'stores': [
		{ 	'name': 'Waiting in Line',
		    'image': '/backpack.png',
		    'description': 'This is a backpack...',
		    'id': 'store01'
		},
		{ 	'name': 'Needfinding',
			'image': '/backpack.png',
			'description': 'This is a backpack...',
			'id': 'store02'
		},
		{ 	'name': 'Prototyping',
			'image': '/backpack.png',
			'description': 'This is a backpack...',
			'id': 'store03'
		},
		{ 	'name': 'Heuristic Evaluation',
			'image': '/backpack.png',
			'description': 'This is a backpack...',
			'id': 'store04'
		},
		{ 	'name': 'Skeleton and a Plan',
			'image': '/backpack.png',
			'description': 'This is a backpack...',
			'id': 'store05'
		},
		{ 	'name': 'Meat on the Bones',
			'image': '/ditto.png',
			'description': 'This is a ditto...',
			'id': 'store06'
		},
		{ 	'name': 'Ready for Testing',
			'image': '/ditto.png',
			'description': 'This is a ditto...',
			'id': 'store07'
		},
		{ 	'name': 'User Test Results and Online Test Proposal',
			'image': '/ditto.png',
			'description': 'This is a ditto...',
			'id': 'store08'
		}    	
	]
  });
};