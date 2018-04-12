const url = require('url')

module.exports = {
    name: 'Zhihu remove ads',
    trigger (requestDetail, responseDetail) {
        const urlObj = url.parse(requestDetail.url)
        return urlObj.hostname === 'api.zhihu.com' && urlObj.pathname === '/topstory/recommend'
    },
    hook (requestDetail, responseDetail) {
        return new Promise((resolve, reject) => {
            const newResponse = responseDetail.response;
            const rawBody = newResponse.body
            let body

            try {
                body = JSON.parse(rawBody)
            } catch (e) {
                reject(e)
                return
            }
        
            const feed = body.data.filter(item => item.type === 'feed')
            body.data = feed

            newResponse.body = JSON.stringify(body)

            resolve({ response: newResponse })
        })
    }
}
