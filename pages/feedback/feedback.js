// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgFinalUrl: [],
    tabs: [{
        id: 0,
        tabName: '体验问题',
        isActive: true
      },
      {
        id: 1,
        tabName: '商品/商家投诉',
        isActive: false
      }
    ],
    imgUrl: [],
    textValue: ''
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
  // 点击上传图片
  handleAddImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          imgUrl: [...this.data.imgUrl, ...result.tempFilePaths]
        })
      }
    });
  },
  // 点击删除图片
  handleCancel(e) {
    const {
      index
    } = e.currentTarget.dataset
    let {
      imgUrl
    } = this.data
    imgUrl.splice(index, 1)
    this.setData({
      imgUrl
    })
  },
  // 监听文本域内容变化
  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  // 监听提交事件
  handleSubmit() {
    if (!this.data.textValue.trim()) {
      wx.showToast({
        title: '未输入内容',
        mask: true,
        icon: 'none'
      })
      return
    }
    let {
      imgUrl,
      imgFinalUrl
    } = this.data
    wx.showLoading({
      title: '上传中请等待',
      mask: true
    });

    if (imgUrl.length !== 0) {
      imgUrl.forEach((item, index) => {
        wx.uploadFile({
          url: 'https://imgchr.com/',
          filePath: item,
          name: 'file',
          formData: {},
          success: (result) => {
            imgFinalUrl.push(result.cookies)
            this.setData({
              imgFinalUrl
            })
            if (index === imgUrl.length - 1) {
              console.log(this.data.textValue + this.data.imgFinalUrl[0]);
              wx.hideLoading();
              this.setData({
                textValue: '',
                imgUrl: [],
                imgFinalUrl: []
              })
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      })
    } else {
      console.log('no pic and ' + this.data.textValue);
      wx.hideLoading();
      this.setData({
        textValue: ''
      })
      wx.navigateBack({
        delta: 1
      });
    }



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