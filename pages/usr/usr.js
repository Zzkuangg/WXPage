//index.js
//获取应用实例
const app = getApp()
var openid = wx.getStorageSync("openid");
Page({
  data: {
    hasUserInfo: openid == "",
    user_data:new Object()
  },
  // 事件处理函数
  bindViewTap: function() {
    wx.removeStorageSync('user_data')
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  onShow: function() {
    var datas = wx.getStorageSync('user_data');
    
    wx.getStorage({
      key: 'user_data',
      success: function (res) {
        
      },
      fail: function (res) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
       
      },
    })
    this.setData({
      user_data:datas
    })
    console.log(this.data.user_data)
  },
  goManage(e){
    var num = e.currentTarget.dataset.id
    console.log(num)
    if(num==0||num==2||num==4){
      wx.showToast({
        title: '功能暂未开放',
        icon:'none'
      })
      return
    }
    var user = wx.getStorageSync('user_data')
    
    if(user.u_prior==2){
      wx.showToast({
        title: '没有权限!',
        icon:'error'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/manage/manage?id='+e.currentTarget.dataset.id,
      // url: '/pages/manage/manage',
    })
  },

})
