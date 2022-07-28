//建立專案總路由器
//這是總路由器

//引入express 與 express 路由器
const express = require('express')
const router = express.Router()

//引用home 程式碼模組
const home = require('./modules/home')
//將網址結構符合 ／ 字串的 request 導向home 模組
router.use('/', home)

// 引用restaurants 程式碼模組
const restaurants = require('./modules/restaurants')
//將網址結構符合 /restaurants 字串的 request 導向 restaurants 模組
router.use('/restaurants', restaurants)


//匯出路由器
module.exports = router