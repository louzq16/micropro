
//云端数据库
wx.cloud.init();
const db = wx.cloud.database();
var doommList = [];
var danmu_o=[];
var i=0;
var ii=0;
var sum=0;
var getdm=0;
//确定他人评论的位置
var p=[1,2,3,4];
var c=1;
//确定自己评论的位置
var p1=[1,2];
var c1=1;
//var batchTimes=0;
//这是数据库的代号
var dbname='1';

class Doomm {
  constructor(text) {
    this.text = text;
    //this.top = Math.ceil(Math.random()*5)*8+10;
    this.top = p[c%4] * 8 + 10;
    //this.time = Math.ceil(Math.random() *10+15);
    this.time=15;
    //this.color = getRandomColor();
    this.color='#ffffff';
    //this.display = true;
    this.id = i++;
  }
}
//自己输入的评论
class Doomm2 {
  constructor(text) {
    this.text = text;
    //this.top = 55+ Math.ceil(Math.random() * 2) * 10;
    this.top = 55 + p1[c1%2] * 10;
    //this.time = Math.ceil(Math.random() *10+15);
    this.time = 10;
    //this.color = getRandomColor();
    this.color = '#ffffff';
    //this.display = true;
    this.id = i++;
  }
}
Page(
  {
  data: {
    position: 'back',
    display:true,
    doommData:[],
    danmuori:[],

    inputValue: null,
    fisrtflag:5,
    compass0:0,
    deltacompass:0
  },
  onLoad() {
    this.ctx = wx.createCameraContext();
    
    //罗盘回调函数
    wx.startCompass();
    var that=this;
    wx.onCompassChange(function(res){
      console.log(res);
      if(that.data.fisrtflag>0)
      {
        that.setData({compass0:res.direction.toFixed(2),deltacompass:0,fisrtflag:that.data.fisrtflag-1});
      }
      else
      {
        that.setData({ deltacompass: res.direction.toFixed(2)-that.data.compass0 });
      }
      if(that.data.deltacompass>50||that.data.deltacompass<-50)
      {
        that.setData({display:false})
      }
      else
      {
        that.setData({ display: true })
      }
    })

    //danmu_o.push(new Doomm2("welcome!"));
    //获取数据库的记录
    /*
    db.collection('1').get({
      success(res) {
        for (let ii = 0; ii < 20; ii++) {
          danmu_o.push(new Doomm(res.data[ii].danmu));
        }
        console.log(danmu_o);
      }
    })
    */
    db.collection(dbname).count({
      success: function (res) 
      {
        sum = res.total;
        console.log(sum);
        //batchTimes = Math.ceil(sum / 20) - 1;
        //console.log(batchTimes);
        /*
        for (let i = batchTimes; i > 0; i--) {
          //setTimeout(function () {
            //获取记录
            db.collection('1').skip(20 * i).get({
              success(res) {
                for (let ii = 0; ii < 20; ii++) {
                  danmu_o.push(new Doomm(res.data[ii].danmu));
                }
                console.log(danmu_o);
              }
            })
          //}, 2000);
        } 
        */
      }
    })
    
  },
  bindInputBlur(e) {
      this.data.inputValue = e.detail.value;
  },
  bindSendDanmu() {
    console.log(this.data.inputValue);
    if (this.data.inputValue != null && this.data.inputValue.length!=0){
      c1 = c1 + 1;
      doommList.push(new Doomm2(this.data.inputValue));
      db.collection(dbname).add({ data: { danmu: this.data.inputValue } });
      //取原来数据库最后几个
      getdm = getdm + 1;
      db.collection(dbname).skip(sum - getdm * 2).limit(2).get({
        success(res) {
          for (let ii = 0; ii < 2; ii++) {
            danmu_o.push(new Doomm(res.data[ii].danmu));
            c=c+1;
          }
          //console.log(danmu_o);
        }
      })
    }
    this.setData({
      inputValue: ''
    })
    //将数据同步到wxml
    this.setData({
        doommData: doommList,
    });  
    //异步问题
    var that=this;
    setTimeout(function () {
    that.setData({
      danmuori: danmu_o
    })  
    },1000);
  }
})
