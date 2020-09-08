// pages/goods_detail/goods_detail.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false
  },
  params: {
    goods_id: 0
  },
  goods_info: [],

  /**
   * 生命周期函数--监听页面出现
   */
  onShow: function () {
    // 获取页面栈
    let Pages = getCurrentPages();
    // 获取当前页的页面值
    let currentPages = Pages[Pages.length - 1]
    // 获取当前页的参数
    let {
      options
    } = currentPages
    this.params.goods_id = options.goods_id
    this.getGoodsDetail()
  },
  // 获取商品详情数据
  async getGoodsDetail() {
    const res = await request({
      url: '/goods/detail',
      data: this.params
    })
    this.goods_info = res
    let goods_info = this.goods_info
    const collect = wx.getStorageSync('collect') || [];
    const isCollect = collect.some(item => {
      return item.goods_id === goods_info.goods_id
    })
    this.setData({
      isCollect
    })


    // 单独赋值需要的数据
    this.setData({
      goodsDetail: {
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        pics: res.pics,
        goods_introduce: res.goods_introduce.replace(/webp/g, 'jpg')
      }
    })
  },
  // 点击图片预览大图
  handlePreviewImg(e) {
    const {
      index
    } = e.currentTarget.dataset
    const urls = this.data.goodsDetail.pics.map(index => {
      return index.pics_mid
    })
    wx.previewImage({
      current: urls[index],
      urls: urls
    });
  },
  // 加入购物车功能实现
  handleAddCart() {
    // 利用内置同步缓存获取数据
    const Cart = wx.getStorageSync('cart') || [];
    const index = Cart.findIndex(item => {
      return item.goods_id === this.goods_info.goods_id
    })
    // 判断是否第一次添加
    if (index === -1) {
      this.goods_info.num = 1
      this.goods_info.checked = true
      Cart.push(this.goods_info)
    } else {
      Cart[index].num++
    }
    // 更新缓存
    wx.setStorageSync('cart', Cart)
    // 弹窗提示
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      mask: true
    });
  },
  // 监听点击收藏事件
  handleCollect() {
    let collect = wx.getStorageSync('collect') || []
    let isCollect = false
    let goods_info = this.goods_info
    const index = collect.findIndex(item => {
      return item.goods_id === goods_info.goods_id
    })
    if (index === -1) {
      isCollect = true
      collect.push(goods_info)
    } else {
      isCollect = false
      collect.splice(index, 1)
    }
    this.setData({
      isCollect
    })
    wx.setStorageSync('collect', collect) || [];


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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