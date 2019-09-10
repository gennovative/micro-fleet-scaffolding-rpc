const { knexSnakeCaseMappers } = require('objection')

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: 'postgres',
			password: 'postgres',
			database: 'mcft_rpc'
		},
		...knexSnakeCaseMappers()
	}
};
