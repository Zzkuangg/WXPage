
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放九宫格数据的列表
    gridList: [
      {id:1,name:"添加房间",icon:"https://www.zzkuang.top/WX/getimg?pic=add_rpng"},
      {id:2,name:"删除房间",icon:"https://www.zzkuang.top/WX/getimg?pic=del_rpng"},
      {id:3,name:"添加设备",icon:"https://www.zzkuang.top/WX/getimg?pic=add_fpng"},
      {id:4,name:"删除设备",icon:"https://www.zzkuang.top/WX/getimg?pic=del_rpng"},
    ]
  },

  goSets(e){
    wx.navigateTo({
      url: '/pages/sets/sets?id='+e.currentTarget.dataset.id,
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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