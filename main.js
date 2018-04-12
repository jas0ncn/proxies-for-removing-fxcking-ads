const url = require('url')

module.exports = {
    summary: 'Hack Zhihu App api request',
    *beforeSendResponse(requestDetail, responseDetail) {
        const urlObj = url.parse(requestDetail.url)

        // grep out zhihu feed
        if (urlObj.hostname === 'api.zhihu.com' && urlObj.pathname === '/topstory/recommend') {
            const newResponse = responseDetail.response;
            const rawBody = newResponse.body
            let body

            try {
                body = JSON.parse(rawBody)
            } catch (e) {
                console.log(e)
                return
            }
        
            const feed = body.data.filter(item => item.type === 'feed')
            body.data = feed

            newResponse.body = JSON.stringify(body)

            console.log(feed, newResponse)

            return { response: newResponse }
        }
    },
};
