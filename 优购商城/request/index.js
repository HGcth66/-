let ajaxtimes=0;
export const request = (params) => {
    ajaxtimes++;
    const dataurl = "https://api-hmugo-web.itheima.net/api/public/v1";
    wx.showLoading({
        title: '加载中',
        mask:true
      })
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: dataurl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete:()=>{
                ajaxtimes--;
                if(ajaxtimes===0){
                    wx.hideLoading();
                }
            }
        })
    })
}