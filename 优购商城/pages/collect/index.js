// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"商品收藏",
                isA:true
            },
            {
                id:1,
                value:"品牌收藏",
                isA:false
            },
            {
                id:2,
                value:"店铺收藏",
                isA:false
            },
            {
                id:3,
                value:"浏览足迹",
                isA:false
            }
        ],
        collect:[]
    }, 
    onShow(){
    const collect=wx.getStorageSync('collect')||[];
    this.setData({
        collect
    })
    },
       djtabschange(e){
        const {index}=e.detail;
        let {tabs}=this.data;
        tabs.forEach((v,i)=>i===index?v.isA=true:v.isA=false);
        this.setData({
            tabs
        })
        }
})