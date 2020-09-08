// 获取权限设置信息
export const getSetting = (() => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
})
// 选择获取地址信息
export const chooseAddress = (() => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result2) => {
                resolve(result2)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
})
// 打开权限设置
export const openSetting = (() => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result3) => {
                resolve(result3)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
})
// 模态弹窗
export const showModal = (({
    content
}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
})
// 提示弹窗
export const showToast = (({
    title
}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }

        })
    })
})
// 小程序登录后获取数据
export const login = (() => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
})