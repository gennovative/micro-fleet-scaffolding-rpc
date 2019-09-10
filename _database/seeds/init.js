const { USERS } = require('./data/users')

exports.seed = async function(knex, Promise) {
	await knex('mcft_users').del()
	
	await knex('mcft_users').insert(USERS)
}
