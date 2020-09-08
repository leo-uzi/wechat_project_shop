// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 子组件向父组件传值(tab index值)
    handleTabChange(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent("handleChangeTabs", index)
    }
  }
})