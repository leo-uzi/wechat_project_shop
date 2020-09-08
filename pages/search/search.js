// pages/search/search.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: [],
    timeId: -1,
    isVisible: true,
    value: ''
  },
  // 监听输入框输入事件
  handleInput(e) {
    let {
      value
    } = e.detail
    if (!value.trim()) {
      this.setData({
        isVisible: true
      })
      return
    }
    this.setData({
      isVisible: false
    })
    // 设置防抖定时器
    clearTimeout(this.data.timeId)
    setTimeout(() => {
      this.searchRequest(value)
    }, 1000);
  },
  // 发起搜索请求
  async searchRequest(query) {
    const res = await request({
      url: '/goods/qsearch',
      data: {
        query
      }
    })
    this.setData({
      goodsInfo: res,
    })
  },
  // 监听取消按钮事件
  handleCancel() {
    this.setData({
      goodsInfo: [],
      value: '',
      isVisible: true
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