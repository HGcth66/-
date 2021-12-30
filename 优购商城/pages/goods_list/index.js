// pages/goods_list/index.js
import { request } from "../../request/index.js";
Page({
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isA:true
            },
            {
                id:1,
                value:"销量",
                isA:false
            },
            {
                id:2,
                value:"价格",
                isA:false
            }
        ],
        goodsList:[]
    },
    queryparams:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },
    onLoad: function (options) {
        this.queryparams.cid=options.cid;
        this.getgoods();
    },
    getgoods() {
        request({ url: '/goods/search' })
            .then(result => {
                const {goods} = result.data.message
                this.setData({
                    goodsList:goods
                })
            })
            wx.stopPullDownRefresh()
    },
    djtabschange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isA=true:v.isA=false);
    this.setData({
        tabs
    })
    },
    onReachBottom(){
        wx.showToast({
          title: '没有下一页',
        })
    },
    onPullDownRefresh(){
        this.setData({
            goodsList:[]
        })
        this.getgoods();
    }
})