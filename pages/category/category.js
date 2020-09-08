import {
  request
} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftmenuList: [],
    rightmenuList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  categoryList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cate')
    // 判断本地数据是否以获取
    if (!Cates) {
      this.getCategoryList()
    } else {
      // 判断本地数据是否已过期
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCategoryList()
      } else {
        this.categoryList = Cates.data
        let leftmenuList = this.categoryList.map(item => {
          return item.cat_name
        })
        this.setData({
          leftmenuList
        })
      }
    }
    const data = Cates.data
    let rightmenuList = data[0].children
    this.setData({
      rightmenuList
    })





  },
  // 获取商品分类参数
  async getCategoryList() {
    const
      res = await request({
        url: '/categories'
      })
    this.categoryList = res
    // 数据获取后存储至本地
    wx.setStorageSync('cate', {
      time: Date.now(),
      data: this.categoryList
    });
    const categoryList = this.categoryList
    let leftmenuList = categoryList.map(item => {
      return item.cat_name
    })
    this.setData({
      leftmenuList
    })
  },
  // 点击激活左侧菜单选项并切换右侧商品列表切换
  activeMenu(e) {
    const index = e.currentTarget.dataset.index
    let rightmenuList = this.categoryList[index].children
    this.setData({
      currentIndex: index,
      rightmenuList,
      scrollTop: 0
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