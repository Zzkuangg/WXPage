// pages/detail/detail.js
import uCharts from '../../js_sdk/u-charts.js';

var uChartsInstance = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cWidth: 750,
    cHeight: 500,
    show: new Object(),
    target: 0,
    tab: new Object(),
    key:0,
    load:true,
    state:""
  },

  requestFacility() {
    console.log('https://www.zzkuang.top/WX/getDeatil?id=' + this.data.target)
    wx.request({
      url: 'https://www.zzkuang.top/WX/getDeatil?id=' + this.data.target,
      method: 'GET',
      success: (res) => {
        this.setData({
          show: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      load:false,
      target: options.id
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //这里的第一个 750 对应 css .charts 的 width
    const cWidth = 750 / 750 * wx.getSystemInfoSync().windowWidth;
    //这里的 500 对应 css .charts 的 height
    const cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
    this.setData({ cWidth, cHeight });
    
    this.getServerData()
    
    wx.setNavigationBarTitle({
      title: "设备:" + this.data.target
    })
     
  },

  convert2Array(s){
    s = s.substring(1,s.length-1)
    var res = s.split(",")
    return res
  },

  //从数据库获取数据,最好写成返回值吧
  requestTable() {
    console.log('https://www.zzkuang.top/WX/getTable?id=' + this.data.target)
    wx.request({
      url: 'https://www.zzkuang.top/WX/getTable?id=' + this.data.target,
      method: 'GET',
      success: (res) => {
        this.setData({
          tab: res.data,
          state:res.data.c_state
        })
      }
    })
  },
  timer(){
    var key = setInterval(this.updateCharts,500)
      this.setData({
        key:key,
        load:true,//关闭加载圈圈
      })
    
  },

  getServerData() {
    console.log(this.data.show)
    this.requestTable()
    
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      if(this.data.tab.status==500){
        wx.showToast({
          title: '无数据',
          icon:'error',
          duration:1500
        })
      }
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
        categories: this.convert2Array(this.data.tab.c_categories),
        series: [
          {
            name: "功率谱",
            data: this.convert2Array(this.data.tab.c_power).map(Number)
          }
        ]
      };

      this.drawCharts('vHVCJiWzCeWTzCEAAJFvUHiJPmuRqDrF', res);
    }, 300);
    setTimeout(this.timer,350) 
  },
  drawCharts(id, data) {
    const ctx = wx.createCanvasContext(id, this);
    uChartsInstance[id] = new uCharts({
      type: "line",
      context: ctx,
      width: this.data.cWidth,
      height: this.data.cHeight,
      categories: data.categories,
      series: data.series,
      animation: true,
      background: "#FFFFFF",
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [15, 10, 0, 15],
      legend: {},
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        gridType: "dash",
        dashLength: 2
      },
      extra: {
        line: {
          type: "curve",
          width: 2
        }
      }
    });
  },
  tap(e) {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
  },

  updateCharts() {
    this.requestTable()
    uChartsInstance['vHVCJiWzCeWTzCEAAJFvUHiJPmuRqDrF'].updateData({
      
      categories:this.convert2Array(this.data.tab.c_categories),
      series: [
        {
          name: "功率谱",
          data: this.convert2Array(this.data.tab.c_power).map(Number)
        }
      ],
      animation: false
      
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.requestFacility()
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
    clearInterval(this.data.key)
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