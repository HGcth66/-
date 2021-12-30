// pages/order/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"全部",
                isA:true
            },
            {
                id:1,
                value:"代付款",
                isA:false
            },
            {
                id:2,
                value:"代发货",
                isA:false
            },
            {
                id:3,
                value:"退款/退货",
                isA:false
            }
        ]
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