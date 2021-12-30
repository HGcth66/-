// pages/goods_detail/index.js
import {
    request
} from "../../request/index.js";
Page({
    data: {
        goodsobj: [],
        iscollect: false
    },
    goodsinfo: {},
    onShow: function () {
        let pages = getCurrentPages();
        let currentPage=pages[pages.length-1];
        let options=currentPage.options;
        const {goods_id}=options;
        this.getgoodsdetail(goods_id);
    },
    getgoodsdetail(goods_id) {
        request({
                url: '/goods/detail',
                data: {
                    goods_id
                }
            })
            .then(result => {
                const goods = result.data.message
                this.goodsinfo = goods
                let collect = wx.getStorageSync('collecy') || []
                let iscollect = collect.some(v => v.goods_id === this.goodsinfo.goods_id)
                this.setData({
                    goodsobj: {
                        goods_name: goods.goods_name,
                        goods_price: goods.goods_price,
                        goods_introduce: goods.goods_introduce.replace(/\.webp/g, '.jpg'),
                        pics: goods.pics
                    },
                    iscollect
                })
            })
    },
    djimage(e) {
        const urls = this.goodsinfo.pics.map(v => v.pics_mid)
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls
        })
    },
    jrgwc() {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex((value) => value.goods_id === this.goodsinfo.goods_id)
        if (index === -1) {
            this.goodsinfo.num = 1;
            this.goodsinfo.checked = true;
            cart.push(this.goodsinfo)
        } else {
            cart[index].num++;
        }
        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '加入成功',
            mask: true,
            icon: 'success'
        })
        console.log(cart);
    },
    djcollect(){
       let collect=wx.getStorageSync('collect')||[];
       let index=collect.findIndex(v=>v.goods_id===this.goodsinfo.goods_id);
       let iscollect=false;
       if (index!==-1) {
           collect.splice(index,1)
           iscollect=false
           wx.showToast({
             title: '取消成功',
             icon:'none'
           })
       }else{
           collect.push(this.goodsinfo)
           iscollect=true
           wx.showToast({
            title: '收藏成功',
            icon:'none'
          })
       }
       wx.setStorageSync('collect', collect)
       this.setData({
       iscollect
       })
    }
})