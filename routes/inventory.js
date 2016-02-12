exports.view = function(req, res){
  res.render('inventory', {
	'inventory': [
		{ 	'name': 'Waiting in Line',
		    'image': '/backpack.png',
		    'id': 'store01'
		},
		{ 	'name': 'Needfinding',
			'image': '/backpack.png',
			'id': 'store02'
		},
		{ 	'name': 'Prototyping',
			'image': '/backpack.png',
			'id': 'store03'
		},
		{ 	'name': 'Heuristic Evaluation',
			'image': '/backpack.png',
			'id': 'store04'
		},
		{ 	'name': 'Skeleton and a Plan',
			'image': '/backpack.png',
			'id': 'store05'
		},
		{ 	'name': 'Meat on the Bones',
			'image': '/ditto.png',
			'id': 'store06'
		},
		{ 	'name': 'Ready for Testing',
			'image': '/ditto.png',
			'id': 'store07'
		},
		{ 	'name': 'User Test Results and Online Test Proposal',
			'image': '/ditto.png',
			'id': 'store08'
		}    	
	]
  });
};