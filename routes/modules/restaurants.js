// 引用 Express 與 Express 路由器
const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()

//引用 Restaurant model
const Restaurant = require('../../models/restaurant')

//設置新增餐廳頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//POST路由把資料送往資料庫
router.post('/', (req, res) => {
  //req.body 是物件 直接整個一起創造存到資料庫
  return Restaurant.create(req.body) 
    .then(() => res.redirect('/')) //成功的話 導向首頁
    .catch(error => console.log(error)) //錯誤處理
})

//show 頁面路由 （detail頁面）
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean() //把Mongoose裡的物件轉換成乾淨的js資料陣列
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//Edit頁面路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//edit 更新資料路由，把更新的資料送往資料庫
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
  //找到對應的id 的資料後，把傳送過來的資料整個一起更新
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//匯出程式碼模組
module.exports = router