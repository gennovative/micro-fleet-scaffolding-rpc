const path = require('path')

const copySrc = require('../../../../scripts/copySrc')

copySrc([
	{
		from: abs('../../../apps/user-biz/src/app/contracts'),
		to: abs('../src/app/contracts')
	},
])

function abs(fragment) {
	return path.resolve(__dirname, fragment)
}
