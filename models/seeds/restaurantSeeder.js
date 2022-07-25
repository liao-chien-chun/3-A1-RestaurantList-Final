const mongoose = require('mongoose') //載入mongoose 
const restaurantList = require('../../restaurant.json').results //載入檔案
const Restaurant = require('../restaurant') //載入Restaurant model

//連線資料庫
mongoose.connect(process.env.MONGODB_URI3, { useNewUrlParser: true, useUnifiedTopology: true })

//取得連線狀態
const db = mongoose.connection
//失敗
db.on('error', () => {
  console.log('mongodb error')
})
//成功
db.once('open', () => {
  console.log('add Seed data')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("DONE")
    })
    .catch(error => {
      console.log(error)
    })
})