function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
var doommList = [];
class Doomm {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    /*
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);
      page.setData({
        doommData: doommList
      })
    }, this.time * 100)//定时器动画完成后执行删除
    */
  }
}
Page(
  {
  data: {
    src: '',
    videoSrc: '',
    position: 'back',
    mode: 'scanCode',
    result: {},
    doommData:[]
  },
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  bindInputBlur(e) {
      this.inputValue = e.detail.value
  },
  bindSendDanmu() {
      doommList.push(new Doomm(this.inputValue, 40, 10, getRandomColor()));
      this.setData({
        doommData: doommList
      })
  }
})
