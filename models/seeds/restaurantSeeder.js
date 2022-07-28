const restaurantList = require('../../restaurant.json').results //載入檔案
const Restaurant = require('../restaurant') //載入Restaurant model

//引用mongoose連線設定
const db = require('../../config/mongoose')


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