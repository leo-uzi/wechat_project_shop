const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
let axiosNum = 0

export const request = (params => {
    axiosNum++
    wx.showLoading({
        title: '加载中',
        mask: true,
    })
    let header = {
        ...params.header
    }
    if (params.url.includes('/my/')) {
        header['Authorization'] = wx.getStorageSync('token');

    }
    return new Promise((resolve, reject) => {
        axiosNum--
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: result => {
                resolve(result.data.message)
            },
            error: error => {
                reject(error)
            },
            complete: () => {
                if (axiosNum === 0) {
                    wx.hideLoading();
                }

            }
        })
    })
})