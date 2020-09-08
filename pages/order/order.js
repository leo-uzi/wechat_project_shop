// pages/order/order.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    tabs: [{
        id: 0,
        tabName: '全部订单',
        isActive: true
      },
      {
        id: 1,
        tabName: '待付款',
        isActive: false
      },
      {
        id: 2,
        tabName: '代发货',
        isActive: false
      },
      {
        id: 3,
        tabName: '退货/退款',
        isActive: false
      }
    ],
  },
  // 切换tab栏事件
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
  async onShow() {
    // 获取页面栈数据
    let pages = getCurrentPages();
    // 获取到从个人界面点击进入订单界面携带的type参数
    const {
      type
    } = pages[1].options
    // 获取订单数据
    // let res = await request({
    //   url: '/my/orders/all',
    //   type: type
    // })
    // res = 222
    // this.setData({
    //   order: res.order
    // })
    let {
      tabs
    } = this.data
    tabs.forEach((item, index) => {
      item.isActive = false
      if (index === (type - 1)) {
        item.isActive = true
      }
    })
    this.setData({
      tabs
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