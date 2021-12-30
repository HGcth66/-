import {request} from "../../request/index.js";
Page({
  data: {
    swiperlist: [],
    dhlist:[],
    lclist:[]
  },
  onLoad: function (options) {
    this.swiperdr();
    this.dhdr();
    this.lcdr();
  },
  swiperdr(){
    request({url: '/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperlist:result.data.message
      })
    })
  },
  dhdr(){
    request({url: '/home/catitems'})
    .then(result=>{
      this.setData({
        dhlist:result.data.message
      })
    })
  },
  lcdr(){
    request({url: '/home/floordata'})
    .then(result=>{
      this.setData({
        lclist:result.data.message
      })
    })
  }
})