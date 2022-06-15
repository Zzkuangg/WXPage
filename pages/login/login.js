//login.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onShow: function () {

  },
  onLoad: function () {

    wx.getStorage({
      key: 'user_data',
      success: function (res) {
        wx.request({
          url: 'https://www.zzkuang.top/WX/loginSys?u_name=' + res.data.u_name + '&u_pwd=' + res.data.u_pwd,
          method: 'POST',
          success: (res) => {
            if (res.statusCode == 200) {
              wx.setStorage({
                key: 'user_data',
                data: res.data
              })
              wx.switchTab({
                url: '/pages/room/room',
              })
            } else {
              wx.showToast({
                title: '信息失效',
                icon: 'error',
                duration: 2000
              })
            }
          }


        })
      }
    })
  },

  successTo() {

  },

  loginTo(e) {
    var usname = e.detail.value.username;
    var pwd = e.detail.value.password;
    var that = this;
    if (usname.length == 0 || pwd.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (usname.length > 10 || pwd.length > 20) {
      wx.showToast({
        title: '账号或密码过长',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://www.zzkuang.top/WX/loginSys?u_name=' + usname + '&u_pwd=' + pwd,
        method: 'POST',
        success: (res) => {
          console.log(res.statusCode)
          if(res.statusCode==500){
            wx.showToast({
              title: '登陆失败',
              icon: 'error',
              duration: 2000
            })
            return
          }
          if (res.data != "Failed") {
            wx.setStorage({
              key: 'user_data',
              data: res.data
            })

            wx.switchTab({
              url: '/pages/room/room',
            })
          } else {
            wx.showToast({
              title: '登陆失败',
              icon: 'error',
              duration: 2000
            })
          }
        }, fail: (res) => {
         
        }
      })
    }
  },
})
