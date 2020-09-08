// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [{
        id: 0,
        tabName: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        tabName: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        tabName: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        tabName: '浏览足迹',
        isActive: false
      }
    ]
  },
  // tab栏切换
  handleChangeTab(e) {
    const index = e.detail
    let tabs = this.data.tabs
    tabs.forEach((item, index2) => {
      item.isActive = false
      if (index === index2) {
        item.isActive = true
      }
    })
    this.setData({
      tabs
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
    let Pages = getCurrentPages();
    let currentPages = Pages[Pages.length - 1]
    let {
      options
    } = currentPages
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
    })



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