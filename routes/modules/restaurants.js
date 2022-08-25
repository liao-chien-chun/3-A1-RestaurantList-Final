// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用 Restaurant model
const Restaurant = require('../../models/restaurant')

//設置新增餐廳頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//POST路由把資料送往資料庫
router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId }) 
    .then(() => res.redirect('/')) //成功的話 導向首頁
    .catch(error => console.log(error)) //錯誤處理
})

//show 頁面路由 （detail頁面）
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean() //把Mongoose裡的物件轉換成乾淨的js資料陣列
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//Edit頁面路由
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//edit 更新資料路由，把更新的資料送往資料庫
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  // findOneAndUpdate 兩的參數：第一個傳入條件，第二個傳入要更新的資料，這邊用展開運算子
  return Restaurant.findOneAndUpdate({ _id, userId }, {...req.body})
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//delete路由
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//匯出程式碼模組
module.exports = router