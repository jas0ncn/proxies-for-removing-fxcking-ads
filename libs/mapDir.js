const { readdirSync, statSync } = require('fs')
const { join, basename, extname } = require('path')

module.exports = function mapDir (dirPath) {
    // controllers
    const tree = []

    const filenames = readdirSync(dirPath).map(name => join(dirPath, name))
    const dirs = filenames.filter(path => statSync(path).isDirectory())
    const files = filenames.filter(path => !statSync(path).isDirectory())

    for (const dir of dirs) {
        tree.push(...mapDir(dir))
    }

    for (const file of files) {
        if (extname(file) === '.js') {
            tree.push(require(file))
        }
    }

    return tree
}
