// pages/room/room.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomS:[],
    usr:new Object(),
    load:false
  },

  goFaciliy(e){
    wx.navigateTo({
      url: '/pages/facilities/facilities?id='+e.currentTarget.dataset.id+"&name="+e.currentTarget.dataset.name,
    })
  },

  requestRoom(e) {
    console.log(e)
    wx.request({
      url: 'https://www.zzkuang.top/WX/getRoomById?id='+e,
      method: 'GET',
      success: (res) => {
        this.setData({
          roomS:res.data,
          load:true
        })
      }
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 页面启动的时候向云端请求数据,调用requestRoom方法
    var that = this;
    wx.getStorage({
      key: 'user_data',
      success: function (res) {
        that.requestRoom(res.data.u_id)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  onTabItemTap(item){
    this.onShow()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})