// pages/auth/auth.js
import {
  request
} from '../../request/index'
import {
  login
} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户数据
  async handleGetUserInfo(e) {
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail
    const res = await login()
    const {
      code
    } = res
    const params = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }

    const res2 = await request({
      url: '/users/wxlogin',
      data: params,
      method: 'POST'
    })

    // console.log(res2);
    wx.setStorageSync('token', 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
    wx.navigateBack({
      delta: 1
    });

  },
  // "appid": "wx815aed1598c7b775",

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