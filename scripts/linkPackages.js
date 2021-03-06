const path = require('path')
const fs = require('fs-extra')

const log = require('./common')

/**
 * Creates symlinks in root node_modules pointing to all folders in /packages/libs/
 */
function linkPackages() {
	log.bold('> linkPackages.js')

	const cwd = __dirname
	const targetDir = path.resolve(cwd, '../packages/node_modules/@mcft-rpc')
	log.info('Ensuring', targetDir)
	fs.ensureDirSync(targetDir)
	
	const packageDir = path.resolve(cwd, '../packages/libs')
	const packages = fs.readdirSync(packageDir)

	for (let p of packages) {
		let from = path.join(packageDir, p)
		let to = path.join(targetDir, p)
		// log.info('Ensuring', p, 'from', from, 'to', to) // For debugging
		log.info('Ensuring', p)
		fs.ensureSymlinkSync(from, to)
	}
	log.success(`Linked ${ packages.length } libs packages to root node_module/@micro-fleet`)
}


// If required by another file
if (module.parent) {
	module.exports = linkPackages;
} else { // If executed from terminal
	linkPackages()
}