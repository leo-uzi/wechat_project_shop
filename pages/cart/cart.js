// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrMsg: {},
    cartInfo: [],
    allCheckboxValue: true,
    allPrice: 0,
    allnum: 0
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击获取收货地址
  async handleGetAddress() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) {
        await openSetting()
      }
      const address = await chooseAddress()
      // 判断缓存中是否已有地址
      const addr = wx.getStorageSync('address');
      if (!addr) {
        wx.setStorage({
          data: address,
          key: 'address'
        })
      }
    } catch (error) {
      console.log(error)
    }
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
    const cartInfo = wx.getStorageSync('cart') || [];

    this.setData({
      addrMsg: address,
    })
    this.cartCount(cartInfo)

  },
  // 监听多选框勾选值切换事件
  handleCheckedChange(e) {
    const {
      id
    } = e.currentTarget.dataset
    let {
      cartInfo
    } = this.data
    const i = cartInfo.findIndex((item) => {
      return id === item.goods_id
    })
    cartInfo[i].checked = !cartInfo[i].checked
    this.cartCount(cartInfo)

  },
  // 重新计算购物车全选值，总价和总量并保存到缓存和data
  cartCount(cartInfo) {
    // 为总价格与总数量,全选状态赋初始值
    let allPrice = 0
    let allnum = 0
    let allCheckboxValue = true
    if (cartInfo.length !== 0) {
      cartInfo.forEach(item => {
        if (item.checked) {
          allPrice += item.num * item.goods_price
          allnum += item.num
        } else {
          allCheckboxValue = false
        }
      })
      this.setData({
        cartInfo,
        allPrice,
        allCheckboxValue,
        allnum
      })
      wx.setStorageSync('cart', cartInfo);
    }
  },
  // 监听全选框切换事件
  handleAllCheckedChange() {
    let {
      allCheckboxValue,
      cartInfo
    } = this.data
    allCheckboxValue = !allCheckboxValue
    cartInfo.forEach(item => {
      item.checked = allCheckboxValue
    })
    this.cartCount(cartInfo)
  },
  // 监听数量切换事件
  handleChangeNumber(e) {
    const {
      value,
      id
    } = e.currentTarget.dataset
    let {
      cartInfo
    } = this.data
    cartInfo.forEach(async (item, index) => {
      if (id === item.goods_id) {
        if (item.num === 1 && value === -1) {
          const res = await showModal({
            content: '确定删除该商品吗？'
          })
          if (res.confirm) {
            cartInfo.splice(index, 1)
            this.cartCount(cartInfo)
            wx.showToast({
              title: '删除成功',
              icon: 'success',
            });
          }
        } else {
          item.num += value
        }
      }
    })
    this.cartCount(cartInfo)
  },
  // 监听点击结算功能
  async handlePay() {
    let {
      cartInfo,
      addrMsg
    } = this.data
    if (!addrMsg.userName) {
      return await showToast({
        title: '地址未填写!'
      })

    }
    if (cartInfo.length === 0) {
      return await showToast({
        title: '未选择商品!'
      })
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    });

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