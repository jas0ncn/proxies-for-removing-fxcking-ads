const { tryCatch } = require('../libs/tryCatch')
const groupMatcher = require('../libs/groupMatcher')

module.exports = groupMatcher(
    'Zhihu remove ads',
    'api.zhihu.com',
    {
        async ['/topstory/recommend'] (requestDetail, responseDetail) {
            const newResponse = responseDetail.response;
            const rawBody = newResponse.body
            const [body, e] = tryCatch(JSON.parse(rawBody))
    
            if (e) {
                return e
            }
        
            const feed = body.data.filter(item => item.type === 'feed')
            body.data = feed
            body.ads = []
    
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
        },
        async ['/answers/:id/comments/featured-comment-ad'] (requestDetail, responseDetail, params) {
            const newResponse = responseDetail.response;
            const rawBody = newResponse.body
            const [body, e] = tryCatch(JSON.parse(rawBody))
    
            if (e) {
                return e
            }
    
            newResponse.body = '{"error": {"message": "\u6ca1\u6709\u627e\u5230\u5e7f\u544a\u4f4d", "code": 40402, "name": "PositionNotFoundException"}} '
            newResponse.statusCode = 404
    
            return { response: newResponse }
        },
        async ['/app_config'] (requestDetail, responseDetail, params) {
            const newResponse = responseDetail.response;
            const rawBody = newResponse.body
            const [body, e] = tryCatch(JSON.parse(rawBody))
    
            if (e) {
                return e
            }
    
            body.splash.ads = []
    
            newResponse.body = JSON.stringify(body)
            return { response: newResponse }
        },
        async ['/launch'] (requestDetail, responseDetail, params) {
            const newResponse = responseDetail.response;
            const rawBody = newResponse.body
            const [body, e] = tryCatch(JSON.parse(rawBody))
    
            if (e) {
                return e
            }
    
            body.launch_ads = []
    
            newResponse.body = JSON.stringify(body)
            return { response: newResponse }
        }
    }
)
