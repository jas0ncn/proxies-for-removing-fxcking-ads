const mapDir = require('./libs/mapDir')
const path = require('path')

const rules = mapDir(path.join(__dirname, './rules'))

module.exports = function * filterByRequest (requestDetail, responseDetail) {
    for (const rule of rules) {
        if (!rule.name || !rule.trigger || !rule.hook) {
            continue
        }

        const hit = rule.trigger(requestDetail, responseDetail)

        if (hit) {
            console.log(`[PFRFA] Hitting rule: ${rule.name}`)
            return rule.hook(requestDetail, responseDetail)
        }
    }
}

