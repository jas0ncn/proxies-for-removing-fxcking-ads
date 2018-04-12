const co = require('co')
const certMgr = require('anyproxy/lib/certMgr')

const tryCatch = function * (fn) {
    try {
        const res = yield fn
        return [res, null]
    } catch (e) {
        return [null, e]
    }
}

co(function * () {
    const [res, err] = yield tryCatch(certMgr.getCAStatus())

    if (err) {
        throw err
    }

    if (res.exist) {
        return 0
    }

    certMgr.generateRootCA(function (err) {
        if (err) throw err
    })
})

