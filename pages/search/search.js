// pages/search/search.js
Page({
  // Get the value of input bar
  searchInputWord(e){
    let that = this
    let wordList = that.data.wordList
    // Implement anti-shake processing of search box
    // Clear the delayer of coresponding timer
    clearTimeout(that.data.timer)
    // Restart a delayer and assign timeID to this.timer
    // A word search requset will be initiate if no new input events is trigger within 500ms
    that.setData({
      'timer': setTimeout(() => {
        let word = e.detail.value
        wordList = [] // Clear old data
        // Determine whether it is empty
        if (word === ''){
          that.setData({
            wordList
          })
          return
        }
        // Initiate a GET request to backend to obtain the information of words
        wx.request({
          url: 'http://ran.v1.idcfengye.com/search/slice',
          method: 'GET',
          data: {
            wordSlice: word
          },
          success: function(res) {
            // Render the information of words
            let code = res.data.code
            if (code === 404){
              that.setData({
                wordList
              })
            } else if (code === 200){
              let wordObj = res.data.data
              let len = wordObj.length
              for (let i = 0; i < len; i++){
                // Add the information of word
                wordList.push(wordObj[i])
                that.setData({
                  wordList
                })
              }  
            }
          },
        })
      }, 500)
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    // The time ID of Delay
    timer: null,
    // Search result
    wordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
