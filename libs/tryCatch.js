module.exports = {
    tryCatch (fn) {
        try {
            const val = fn
            return [val, null]
        } catch (e) {
            return [null, e]
        }
    },

    async asyncTryCatch (fn) {
        try {
            const val = await fn
            return [val, null]
        } catch (e) {
            return [null, e]
        }
    }
}
