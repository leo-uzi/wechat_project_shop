// pages/pay/pay.js
import {
  request
} from '../../request/index'
import {
  showModal,
  showToast
} from '../../utils/asyncWx';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrMsg: {},
    cartInfo: [],
    allPrice: 0,
    allnum: 0
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
    // 获取缓存中地址数据
    const address = wx.getStorageSync('address')
    let cartInfo = wx.getStorageSync('cart') || [];
    cartInfo = cartInfo.filter(item => {
      return item.checked === true
    })
    let allPrice = 0
    let allnum = 0
    cartInfo.forEach(item => {
      allPrice += item.num * item.goods_price
      allnum += item.num
    })
    this.setData({
      addrMsg: address,
      cartInfo,
      allPrice,
      allnum
    })
  },
  // 监听点击支付功能
  async handleOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return
    }
    const header = {
      Authorization: token
    }
    let {
      addrMsg,
      cartInfo
    } = this.data
    const order_price = this.data.allPrice
    const consignee_addr = addrMsg.provinceName + addrMsg.cityName + addrMsg.countyName + addrMsg.detailInfo
    let goods = []
    cartInfo.forEach(item => {
      goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price
      })
    })
    const order = await request({
      url: '/my/orders/create',
      header: header,
      data: {
        order_price,
        consignee_addr,
        goods
      },
      method: 'POST'
    })
    const res = await showModal({
      content: '确定支付商品？'
    })
    if (res.confirm) {
      await showToast({
        title: '支付成功'
      })
      cartInfo = wx.getStorageSync('cart');
      cartInfo = cartInfo.filter(item => {
        return item.checked === false
      })
      wx.setStorageSync('cart', cartInfo)

      wx.navigateTo({
        url: '/pages/order/order'
      });

    } else if (res.cancel) {
      return
    }

    // wx.request({
    //   url: '/my/orders/create',
    //   header: header,
    //   data: {
    //     order_price,
    //     consignee_addr,
    //     goods
    //   },
    //   method: 'POST',
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //   }
    // });
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