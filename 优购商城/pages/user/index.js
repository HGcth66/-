// pages/user/index.js
Page({
    data: {
    userInfo:{},
    collectnum:0
    },
    onShow(){
        const userInfo=wx.getStorageSync('userInfo')
        const collect=wx.getStorageSync('collect')
        this.setData({
            userInfo,
            collectnum:collect.length
        })
    }
})