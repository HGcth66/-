// pages/login/index.js
Page({
    getuserinfo(e){
        const {userInfo}=e.detail;
        wx.setStorageSync('userInfo', userInfo)
        wx.navigateBack({
          delta: 1,
        })
    }
})