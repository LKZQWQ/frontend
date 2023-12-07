// pages/word/word.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    word: '',
    phonetic: '',
    translation: '',
    definition: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // Make a request to get word details
    let word = JSON.parse(options.word)
    let that = this
    word = decodeURIComponent(word)
    wx.request({
      url: 'http://ran.v1.idcfengye.com/search',
      method: 'GET',
      data: {
        word: word
      },
      success: function(res) {
        // Render the information of words
        let code = res.data.code
        if (code === 404){
          that.setData({
            id: 'wrong',
            word: '出错啰',
            phonetic: '出错啰',
            translation: '出错啰',
            definition: '出错啰'
          })
        } else if (code === 200){
          let wordData = res.data.data
          that.setData({
            id: wordData.id,
            word: wordData.word,
            phonetic: wordData.phonetic,
            translation: wordData.translation,
            definition: wordData.definition
          })
        }
      },
    })
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