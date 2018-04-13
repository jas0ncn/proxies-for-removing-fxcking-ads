const url = require('url')
const pathToRegexp = require('path-to-regexp')
const { tryCatch } = require('../libs/tryCatch')

module.exports = (name, domain, hooks) => {
    const pathnames = Object.keys(hooks)

    const getParams = (url, template) => {
        const compiledTemplate = pathToRegexp.parse(template).filter(v => typeof v === 'object')
        const execParamValues = pathToRegexp(template).exec(url).slice(1)
        const params = {}
        
        execParamValues.forEach((value, idx) => {
            params[compiledTemplate[idx].name] = value
        })

        return params
    }

    const isMatch = (url, template) => pathToRegexp(template).test(url)

    return {
        name,
        trigger (requestDetail, responseDetail) {
            const urlObj = url.parse(requestDetail.url)
            return urlObj.hostname === domain && pathnames.some(pathname => isMatch(urlObj.pathname, pathname))
        },
        hook (requestDetail, responseDetail) {
            const urlObj = url.parse(requestDetail.url)
            const pathname = urlObj.pathname
            console.log(`[PFRFA] Hitting Zhihu Pathname: ${pathname}`)
    
            for (const p of pathnames) {
                if (isMatch(pathname, p)) {
                    const params = getParams(pathname, p)
                    return hooks[p](requestDetail, responseDetail, params)
                }
            }
        }
    }
}
