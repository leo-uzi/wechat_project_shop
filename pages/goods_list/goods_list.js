// pages/goods_list/goods_list.js
import {
  request
} from '../../request/index'
// import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        tabName: '综合',
        isActive: true
      },
      {
        id: 1,
        tabName: '销量',
        isActive: false
      },
      {
        id: 2,
        tabName: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  // 获取商品列表的get参数
  params: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  total: 0,
  pageAll: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cat_id || ''
    this.params.query = options.query || ''
    this.getGoodsList()

  },
  // tab切换触发
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
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.params
    })
    this.total = res.total
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    this.pageAll = Math.ceil(this.total / this.params.pagesize)
    wx.stopPullDownRefresh()

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
    this.data.goodsList = []
    this.params.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.params.pagenum >= this.pageAll) {
      wx.showToast({
        title: '已显示最后一页',
      });
    } else {
      this.params.pagenum += 1
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})