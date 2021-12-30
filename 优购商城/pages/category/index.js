// pages/category/index.js
import { request } from "../../request/index.js";
Page({
    data: {
        leftlist: [],
        rightcontent: [],
        currentindex: 0,
        scrolltop:0
    },
    cates: [],
    onLoad: function (options) {
        const cates=wx.getStorageSync('cates');
        if(!cates){
            this.getcate();
        }else{
            if(Date.now()-cates.time>1000*300){
                this.getcate();
            }else{
                this.cates=cates.data;
                let leftlist = this.cates.map(v => v.cat_name);
                let rightcontent = this.cates[0].children;
                this.setData({
                    leftlist,
                    rightcontent
                })
            }
        }
    },
   getcate() {
        request({ url: '/categories' })
            .then(result => {
                this.cates = result.data.message;
                wx.setStorageSync('cates',{time:Date.now(),data:this.cates})
                let leftlist = this.cates.map(v => v.cat_name);
                let rightcontent = this.cates[0].children;
                this.setData({
                    leftlist,
                    rightcontent
                })
            })
    },
    /*getcate() {
        request({ url: '/categories' })
            .then(result => {
                this.cates = result.data.message;
                //wx.setStorageSync('cates',{time:data.now(),data:this.cates});
                wx.setStorageSync('cates',{time:Date.now(),data:this.cates})
                let leftlist = this.cates.map(v => v.cat_name);
                let rightcontent = this.cates[0].children;
                this.setData({
                    leftlist,
                    rightcontent
                })
            })
    },*/
    djleft(e) {
        const { index } = e.currentTarget.dataset;
        let rightcontent = this.cates[index].children;
        this.setData({
            currentindex: index,
            rightcontent,
            scrolltop:0
        })
    }
})