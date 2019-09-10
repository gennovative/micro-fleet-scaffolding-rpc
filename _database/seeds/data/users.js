const moment = require('moment')

module.exports = {
	USERS: [
		{
			id: '8254662178485830658',
			name: 'Superman',
			status: 'active',
			createdAt: moment.utc().format(),
		},
		{
			id: '8259744598599926789',
			name: 'Winter Soldier',
			status: 'locked',
			createdAt: moment.utc().format(),
		},
		{
			id: '8259756591356576774',
			name: 'Iron Man',
			status: 'deleted',
			createdAt: moment.utc().format(),
		},
	]
}
