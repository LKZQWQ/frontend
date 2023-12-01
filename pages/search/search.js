// pages/search/search.js
Page({
  // Get the value of input bar
  searchInputWord(e){
    // Description: Initiate a GET request to backend to obtain the information of words
    
    //-----To be deleted
    // The form of request information: String-wordSlice
    // The form of response information: array-Object(id-word-translation)
    //-----
    console.log(e.detail.value)
    wx.request({
      url: 'http://ran.v1.idcfengye.com/search/slice',
      method: 'GET',
      data: {
        wordSlice: e.detail.value
      },
      success: function(res) {
        // Show the information of words
        console.log(res)
      },
      fail: function (res) {
        // 
        console.log('shit')
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
 
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