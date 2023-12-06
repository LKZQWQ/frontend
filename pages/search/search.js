// pages/search/search.js
Page({
  // Get the value of input bar
  searchInputWord(e){
    let that = this
    let historicalWordmark = 0 // historicalWordList mark
    let searchedWordmark = 1 // searchedWordList mark
    let searchedWordList = that.data.searchedWordList

    // Implement anti-shake processing of search box
    // Clear the delayer of coresponding timer
    clearTimeout(that.data.timerSearch)
    // Restart a delayer and assign timeID to this.timer
    // A word search requset will be initiate if no new input events is trigger within 500ms
    that.setData({
      'timerSearch': setTimeout(() => {
        let word = e.detail.value
        searchedWordList = [] // Clear old data
        // Determine whether it is empty
        if (word === ''){
          that.updateDisplayedListMark(historicalWordmark)
          that.updateWordAndDataList(that.data.historicalWordList, historicalWordmark)
          return
        }
        that.updateDisplayedListMark(searchedWordmark)
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
              that.updateWordAndDataList(searchedWordList)
            } else if (code === 200){
              let wordObj = res.data.data
              let len = wordObj.length
              for (let i = 0; i < len; i++){
                // Add the information of word
                searchedWordList.push(wordObj[i])
                that.updateWordAndDataList(searchedWordList, searchedWordmark)
              }
            }
          },
        })
      }, 500)
    })
  },

  goToWord(e){
    let that = this
    let wordIndex = e.currentTarget.id.substring(5)
    let wordInfom
    let mark = this.data.displayedListMark
    // According to mark choose one list
    if (mark === 0){
      wordInfom = this.data.historicalWordList[wordIndex]
    } else if(mark === 1){
      wordInfom = this.data.searchedWordList[wordIndex]
    }
    if (wordInfom === undefined) return;
    // Local Storage
    that.addToLocalHistoricalWordList(wordInfom)

    // Replace special character
    let word =  encodeURIComponent(wordInfom.word);
    let wordJSON = JSON.stringify(word)

    wx.navigateTo({
      url: '/pages/word/word?word=' + wordJSON,
    })
  },

  updateWordAndDataList(newList, mark){
    let that = this

    if (mark === 0){
      this.setData({
        historicalWordList: newList,
      })
    } else if(mark === 1){
      this.setData({
        searchedWordList: newList,
      })
    }
    if (this.data.displayedListMark === mark){
      // Avoid changing style in the process of jumping next page
      if (mark === 0){
        clearTimeout(that.data.timerHistory)
        that.setData({
          'timerHistory': setTimeout( () => {
            this.setData({
              wordList: newList,
            })
          }, 800)
        })
      } else{
        this.setData({
          wordList: newList,
        })
      }
    }
  },

  updateDisplayedListMark(mark){
    this.setData({
      displayedListMark: mark
    })
  },
  
  addElementToHistoricalList(e){
    let list = this.data.historicalWordList
    let newQueriedWord = {
      id: e.id,
      word: e.word,
      translation: e.translation
    }
    // If the word is already in list, put it at the beginning of list.
    let index = list.findIndex(obj => obj.id === newQueriedWord.id)
    if (index !== -1){
      list.splice(index, 1)[0]
    }
    list.unshift(newQueriedWord)
    this.setData({
      historicalWordList: list
    })},

    addToLocalHistoricalWordList(wordInfom){
      let that = this
      // Add word to historical list
      this.addElementToHistoricalList(wordInfom)
      // Store data locally
      wx.setStorage({
        key: 'historicalWordList',
        data: this.data.historicalWordList,
        success () {
          wx.getStorage({
            key: 'historicalWordList',
            success: (res) => {
              that.updateWordAndDataList(res.data, 0)
            }
          })
        }
      })
    },

  /**
   * 页面的初始数据
   */
  data: {
    // The time ID of Delay
    timerSearch: null,
    timerHistory: null,
    // Displayed list
    wordList: [],
    // Searched word list
    searchedWordList: [],
    // Historical word list
    historicalWordList: [],
    // An event lock for tow types of list who preferentially render data
    // 0 presents historical list and 1 presents searched list
    displayedListMark: 0
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
