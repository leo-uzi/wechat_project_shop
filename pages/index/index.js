import {
    request
} from '../../request/index.js'
wx - //Page Object
    Page({
        data: {
            swiperList: [],
            cateList: [],
            floorList: []
        },
        //options(Object)
        // 一加载就执行
        onLoad() {
            this.getSwiperList(),
                this.getCateList(),
                this.getFloorList()


        },
        // 获取轮播图数据
        getSwiperList() {
            request({
                url: '/home/swiperdata'
            }).then(result => {
                result.forEach(item => {
                    item.navigator_url = item.navigator_url.replace(/main/g, 'goods_detail')
                })
                this.setData({
                    swiperList: result
                })
            })
        },
        // 获取导航数据
        getCateList() {
            request({
                url: '/home/catitems'
            }).then(result => {
                this.setData({
                    cateList: result
                })
            })
        },
        // 获取楼层数据
        getFloorList() {
            request({
                url: '/home/floordata'
            }).then(result => {
                result.forEach(item => {
                    item['product_list'].forEach(item2 => {
                        item2.navigator_url = item2.navigator_url.replace(/\?/, '/goods_list?')
                    })
                })
                this.setData({
                    floorList: result
                })
            })
        },

        onReady: function () {

        },
        onShow: function () {

        },
        onHide: function () {

        },
        onUnload: function () {

        },
        onPullDownRefresh: function () {

        },
        onReachBottom: function () {

        },
        onShareAppMessage: function () {

        },
        onPageScroll: function () {

        },
        //item(index,pagePath,text)
        onTabItemTap: function (item) {

        }
    });