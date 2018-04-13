const url = require('url')
const pathToRegexp = require('path-to-regexp')
const { tryCatch } = require('../libs/tryCatch')

const hooks = {
    async ['/topstory/recommend'] (requestDetail, responseDetail) {
        const newResponse = responseDetail.response;
        const rawBody = newResponse.body
        const [body, e] = tryCatch(JSON.parse(rawBody))

        if (e) {
            return e
        }
    
        const feed = body.data.filter(item => item.type === 'feed')
        body.ads = feed

        newResponse.body = JSON.stringify(body)

        return { response: newResponse }
    },
    async ['/questions/:id/answers'] (requestDetail, responseDetail, params) {
        const newResponse = responseDetail.response;
        const rawBody = newResponse.body
        const [body, e] = tryCatch(JSON.parse(rawBody))

        if (e) {
            return e
        }
    
        body.ad_info = {}

        newResponse.body = JSON.stringify(body)

        return { response: newResponse }
    },
    async ['/appview/api/v4/answers/:id/related-readings'] (requestDetail, responseDetail, params) {
        const newResponse = responseDetail.response;
        const rawBody = newResponse.body
        const [body, e] = tryCatch(JSON.parse(rawBody))

        if (e) {
            return e
        }
    
        body.data = []

        newResponse.body = JSON.stringify(body)

        return { response: newResponse }
    }
}

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

module.exports = {
    name: 'Zhihu remove ads',
    trigger (requestDetail, responseDetail) {
        const urlObj = url.parse(requestDetail.url)
        return urlObj.hostname === 'api.zhihu.com' && pathnames.some(pathname => isMatch(urlObj.pathname, pathname))
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
