// pages/cart/index.js
Page({
    data:{
    address:{},
    cart:[],
    allchecked:false,
    totoilprice:0,
    totoilnum:0
    },
    onShow(){
    const address=wx.getStorageSync('address');
    const cart=wx.getStorageSync('cart')||[];
   // const allchecked=cart.length?cart.every(v=>v.checked):false;
   this.setData({address});
   this.setcart(cart);
    },
    djchooseaddress(){
    wx.getSetting({
      success:(result)=>{
          const scope=result.authSetting["scope.address"]
          if(scope===true||scope===undefined){
              wx.chooseAddress({
                success: (result1) => {
                wx.setStorageSync('address',result1)
                },
              })
          }else{
              wx.openSetting({
               success:(result2)=>{
                   wx.chooseAddress({
                     success: (result3) => {
                        wx.setStorageSync('address',result3)
                     },
                   })
               }
              })
          }
      }
    })
    },
    djchecked(e){
    const goods_id=e.currentTarget.dataset.id;
    let {cart}=this.data;
    let index =cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setcart(cart);
    },
    setcart(cart){
        let allchecked=true;
        let totoilprice=0;
        let totoilnum=0;
        cart.forEach(v => {
            if (v.checked) {
                totoilprice+=v.goods_price * v.num;
                totoilnum+=v.num;
            }else{
                allchecked=false;
            }
        });
        allchecked=cart.length!=0?allchecked:false;
        this.setData({
            cart,
            totoilprice,
            totoilnum,
            allchecked
        })
        wx.setStorageSync('cart', cart);
    },
    djcheckedall(){
        let {cart,allchecked}=this.data;
        allchecked=!allchecked;
        cart.forEach(v=>v.checked=allchecked);
        this.setcart(cart);
    },
    djjj(e){
        const {opration,id}=e.currentTarget.dataset;
        let {cart}=this.data;
        const index=cart.findIndex(v=>v.goods_id===id);
        if (cart[index].num===1 && opration===-1) {
            wx.showModal({
                title: '提示',
                content: '你要删除吗',
                success: (res)=> {
                  if (res.confirm) {
                    cart.splice(index,1);
                    this.setcart(cart);
                  } else if (res.cancel) {
                  }
                }
              })
        }else{
            cart[index].num+=opration;
            this.setcart(cart);
        }

    },
    djjs(){
        const {address,totoilnum}=this.data;
        if (!address.userName) {
            wx.showToast({
              title: '你还没有添加收货地址',
              icon:'none'
            })
            return;
        }
        if (totoilnum===0) {
            wx.showToast({
              title: '你还没有选购商品',
              icon:'none'
            })
            return;
        }
        wx.navigateTo({
          url: '../../pages/pay/index',
        })
    }
})