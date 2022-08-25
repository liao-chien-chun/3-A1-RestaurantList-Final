// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//引用 Restaurant model
const Restaurant = require('../../models/restaurant')

//定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id 
  Restaurant.find({ userId }) 
    .lean() //把Mongoose裡的物件轉換成乾淨的js資料陣列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error)) //錯誤處理
})

//搜尋路由
router.get('/search', (req, res) => {
  // 取得query String
  //去掉空白，統一改成小寫
  const keyword = req.query.keyword.trim().toLowerCase()

  //取得所有餐廳資料
   return Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantsData = restaurants.filter
      (data => 
        data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: restaurantsData, keyword })
    })
    .catch(error => console.log(error))
})

//匯出模組
module.exports = router