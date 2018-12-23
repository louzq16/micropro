//index.js
//登录界面
const app = getApp()
//var dbname;

Page({
  data: {
    motto: '这里是标语',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.scanCode({
      success: (res) => {
        app.globalData.dbname = res.result;
        wx.reLaunch({
          url: '../main/main'
        })
      },
      complete: (res) => {
      }
    })
   
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.scanCode({
        success:(res)=>{
          app.globalData.dbname=res.result;
          wx.reLaunch({
            url: '../main/main',
          })
        },
        complete: (res) => {
        }
      })
      
    } 
    else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.scanCode({
          success: (res) => {
            app.globalData.dbname = res.result;
            wx.reLaunch({
              url: '../main/main',
            })
          },
          complete: (res) => {
          }
        })
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.scanCode({
            success: (res) => {
              app.globalData.dbname = res.result;
              wx.reLaunch({
                url: '../main/main',
              })
            },
            complete: (res) => {
            }
          })
          
        }
      })
    }


  },
  bindgetUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if(e.detail.userInfo)
    {
      wx.reLaunch({
        url: '../main/main',
      })
    }
    else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，无法使用该小程序',
      })
      this.setData(
        {
          hasUserInfo:false
        }
      )
    }
  }
})
