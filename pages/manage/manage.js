// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: 0,
    prior: ["管理员", "普通用户"],
    index: 1,
    usrs:[]
  },

  delUsr(e){
    var index = e.currentTarget.dataset.id
    var user = wx.getStorageSync('user_data')
    console.log(index)
    if(this.data.usrs[index].u_prior<=user.u_prior){
      wx.showToast({
        title: '权限不足',
        icon:'error'
      })
      return
    }
    var res = "?u_name="+this.data.usrs[index].u_name
    wx.request({
      url: 'https://www.zzkuang.top/WX/delUsr' +res,
      method: 'POST',
      success: (res) => {
        console.log(res)
        this.onShow()
        }
      })

  },
  postData(e) {
    console.log(e)
    wx.request({
      url: 'https://www.zzkuang.top/WX/addUsr' + e,
      // url: 'https://www.zzkuang.top/WX/postData' + e,
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data == "Fail") {
          wx.showToast({
            title: '添加失败!',
            icon: 'error'
          })
        } else {
          wx.showToast({
            title: '添加成功!',
            icon: 'success'
          })
        }
      }
    })
  },

  addUsr(e) {
    var u_name = e.detail.value.u_name;
    var u_pwd = e.detail.value.u_pwd;
    var u_pwd1 = e.detail.value.u_pwd1;
    if (u_pwd1 != u_pwd) {
      wx.showToast({
        title: '密码不一致',
        icon: 'error'
      })
    }
    var u_prior = Number(this.data.index) + 1;
    var res = "?u_name=" + u_name + "&u_pwd=" + u_pwd + "&u_prior=" + u_prior;
    this.postData(res)
  },

  bindPickChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      target: options.id
    })
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (this.data.target == 3) {
      wx.request({
        url: 'https://www.zzkuang.top/WX/getUsr',
        method: 'POST',
        success: (res) => {
          this.setData({
            usrs:res.data
          })
        }

      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})