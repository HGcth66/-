// pages/search/index.js
import {request} from "../../request/index.js";
Page({
    data: {
    goods:[],
    ishidden:false,
    inputtext:''
    },
    timeId:-1,
    inputchange(e){
        const {value}=e.detail;
        if (!value.trim()) {
            this.setData({
                ishidden:false,
                goods:[]
            })
            return;
        }
        this.setData({
            ishidden:true
        })
        clearTimeout(this.timeId)
        this.timeId=setTimeout(()=>{this.qsearch(value);},1000)
        
    },
    /*async qsearch(query){
            const res=await request({url:"/goods/qsearch",data:{query}})
            console.log(res);
    }*/
    qsearch(query){
    request({
        url: '/goods/search',
        data: {
            query
        }
        
    })
    .then(result => {
        const {goods}=result.data.message
        this.setData({
            goods
        })
    })
},
djcannel(){
    this.setData({
        ishidden:false,
        goods:[],
        inputtext:''
    })
}
})