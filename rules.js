module.exports = {
    summary: 'Hack Zhihu App api request',
    *beforeSendResponse(requestDetail, responseDetail) {
        console.log(requestDetail.url)
    },
};
