// pages/sets/sets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: 0,
    value: '',
    load: true,
    f_names: ["空调", "台灯", "电脑","电吹风"],
    index: 0,
    r_names: ["卧室", "办公室", "实验室"],
    r_id: [],
    r_index: 0,
    r_identify:[],
    defs:[],
    delRID:[]
  },

  bindPickChange(e) {
    this.setData({
      index: e.detail.value
    })
  },


  bindPickChange1(e) {
    this.setData({
      r_index: e.detail.value
    })
  },

  postData(e) {
    this.setData({
      load: false
    })
    wx.request({
      url: 'https://www.zzkuang.top/WX/postData' + e,
      // url: 'https://www.zzkuang.top/WX/postData' + e,
      method: 'POST',
      success: (res) => {
        this.setData({
          show: res.data,
          load: true
        })
        
        if (res.data == "Success") {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1500
          })
        } else {
          var errors = '';
          if(typeof(res.data)==String){
            errors = res.data
          }else{
            errors ="信息有误"
          }
          wx.showToast({
            title:errors ,
            icon: 'error',
            duration: 1500
          })
        }
        console.log(res.data)
      }
    })
    console.log(e)
  },

  getImg(name) {
    var img = "";
    switch (name) {
      case "卧室":
        img = "https://www.zzkuang.top/WX/getimg?pic=bedroomjpg";
        break;
      case "实验室":
        
        img = "https://www.zzkuang.top/WX/getimg?pic=labjpg";
        break;
      case "办公室":
        img = "https://www.zzkuang.top/WX/getimg?pic=workingjpg";
        break;
      case "空调":
        
        img = "https://www.zzkuang.top/WX/getimg?pic=air_conditionerpng";
        break;
      case "电脑":
        img = "https://www.zzkuang.top/WX/getimg?pic=computerpng";
        break;
      case "台灯":
        
        img = "https://www.zzkuang.top/WX/getimg?pic=lamppng";
        break;
      case "电吹风":
        
        img = "https://www.zzkuang.top/WX/getimg?pic=dryerpng";
        break;
    }
    return img;

  },

  addRoom(e) {
    var that = this
    
    wx.getStorage({
      key: 'user_data',
      success: function (res) {
        var r_usr = res.data.u_id
        var r_id = e.detail.value.r_id
        var r_name = that.data.r_names[that.data.index]
        var img = that.getImg(r_name)
        var res = "?r_id=" + r_id + "&r_name=" + r_name + "&img=" + img + "&method=add&r_usr="+r_usr
        console.log(res)
        that.postData(res)
      }
    })
   
    
  },

  remRoom(e) {
    var r_id = this.data.r_identify[this.data.r_index]
    var r_name = e.detail.value.r_name
    var r = "?r_id=" + r_id + "&r_name=" + r_name + "&method=del"
    var that = this
    wx.showModal({
      cancelColor: 'cancelColor',
      content: "将移除房间及内部设备,确定移除?",
      success: function (res) {
        if (res.confirm) {
          that.postData(r)
        } else {
          console.log('取消')
        }
      }

    })

  },

  addDevice(e) {
    var r_id = this.data.r_identify[this.data.r_index]
    var f_band = e.detail.value.f_band
    var f_id = e.detail.value.f_id
    var f_name = this.data.f_names[this.data.index]
    var img = this.getImg(f_name)
    var res = "?r_id=" + r_id + "&f_band=" + f_band + "&f_id=" + f_id + "&f_name=" + f_name + "&img=" + img + "&method=add"
    console.log(res)
    this.postData(res)
  },

  remDevice(e) {
    var res = "?f_id=" +e.currentTarget.dataset.id+ "&method=del"
    this.postData(res)
    this.setData({
      delRID:[],
      defs:[]
    })
    this.delF()
  },


  getRID(){
//获取房间ID
    let list = []
  for(var i = 0;i<this.data.defs.length;i++){
    for(var j = 0;j<this.data.r_identify.length;j++){
      if(this.data.r_identify[j]==this.data.defs[i].f_room){
        list.push(this.data.r_id[j])
      }
    }
  }
  this.setData({
    delRID:list
  })

  },

  //删除设备进阶方法
  delF(){
    
    for(var i = 0;i<this.data.r_identify.length;i++){
      wx.request({
        url: 'https://www.zzkuang.top/WX/getFacility?room='+this.data.r_identify[i],
        method: 'GET',
        success: (res) => {
          let list = this.data.defs
          this.setData({
            defs:list.concat(res.data)
          })
        }
      })
    }

    setTimeout(this.getRID,100)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      target: options.id
    })
    if (this.data.target == 4){
      
      var that = this;
      wx.getStorage({
        key: 'user_data',
        success: function (res) {
          that.requestRoom(res.data.u_id)
        }
      })
      setTimeout(this.delF,100)
    }
    if (this.data.target == 3 || this.data.target == 2) {
      var that = this;
      wx.getStorage({
        key: 'user_data',
        success: function (res) {
          that.requestRoom(res.data.u_id)
        }
      })
    }

  },

  requestRoom(e) {
    var rid = []
    var ident = []
    wx.request({
      url: 'https://www.zzkuang.top/WX/getRoomById?id='+e,
      method: 'GET',
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          rid.push(res.data[i].r_id)
          ident.push(res.data[i].identify)
        }
        this.setData({
          r_id: rid,
          r_identify:ident
        })
      }
    })
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