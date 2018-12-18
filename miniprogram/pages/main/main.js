function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

//云端数据库
wx.cloud.init();
const db = wx.cloud.database();

var doommList = [];
var danmu_o=[];
var i=0;
var ii=0;
var sum=0;
var count=0;
var no=0;
//to get the sum
db.collection('1').limit(1).get({
  success(res) {
    sum = res.data[0].total;
    count=sum;
    console.log(sum);
  }
})
class Doomm {
  constructor(text) {
    this.text = text;
    this.top = Math.ceil(Math.random() * 40 + 30);
    this.time = Math.ceil(Math.random() * 10 );
    this.color = getRandomColor();
    this.display = true;
    this.id = i++;
  }
}
class Doomm2 {
  constructor(text) {
    this.text = text;
    this.top = Math.ceil(Math.random() * 40 + 30);
    this.time = Math.ceil(Math.random() * 80+20);
    this.color = getRandomColor();
    this.display = true;
    this.id = i++;
  }
}
Page(
  {
  data: {
    position: 'back',
    doommData:[],
    danmuori:[]
  },
  onLoad() {
    this.ctx = wx.createCameraContext();
    //get the last 20 record
    
    db.collection('1').skip(sum-20).get({
      success(res) {
        for(let ii=0;ii<20;ii++)
        {
          danmu_o.push(new Doomm2(res.data[ii].danmu));
        }
        console.log(danmu_o);
      }
    })
    
  },
  bindInputBlur(e) {
      this.inputValue = e.detail.value;
  },
  bindSendDanmu() {
    doommList.push(new Doomm(this.inputValue));
    //console.log(doommList);
    //加到数据库后，并且更正新total
    db.collection('1').add({data:{danmu:this.inputValue}});
    count=count+1;
    db.collection('1').doc(this.data.counterId).set({
      data: {total: count}
    })
      this.setData({
        doommData: doommList,
        danmuori: danmu_o
      })
  }
})
