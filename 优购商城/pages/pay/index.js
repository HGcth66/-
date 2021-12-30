// pages/cart/index.js
Page({
    data:{
    address:{},
    cart:[],
    totoilprice:0,
    totoilnum:0
    },
    onShow(){
    const address=wx.getStorageSync('address');
    let cart=wx.getStorageSync('cart')||[];
   // const allchecked=cart.length?cart.every(v=>v.checked):false;
   cart=cart.filter(v=>v.checked)
   this.setData({address});
   let totoilprice=0;
   let totoilnum=0;
   cart.forEach(v => {
           totoilprice+=v.goods_price * v.num;
           totoilnum+=v.num;
   });
   this.setData({
       cart,
       totoilprice,
       totoilnum,
       address
   })
    }
})