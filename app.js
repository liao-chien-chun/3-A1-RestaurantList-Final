const express = require('express') //載入express
const exphbs = require('express-handlebars') //載入handlebars
const mongoose = require('mongoose') //載入mongoose
const bodyParser = require('body-parser') //引入body-parser
const Restaurant = require('./models/restaurant') //載入Restaurant model
const restaurant = require('./models/restaurant')

const port = 3000
const app = express()

//設定與mongoDB連線
mongoose.connect(process.env.MONGODB_URI3, { useNewUrlParser: true, useUnifiedTopology: true })
//取得資料庫連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

//用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//設定樣版引擎
//透過app.engine來定義要使用的樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
//透過app.set告訴express說要設定view engine 是handlebars
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//設置首頁路由
app.get('/', (req, res) => {
  Restaurant.find() //取出Restaurant model 裡的所有資料
    .lean() //把Mongoose裡的物件轉換成乾淨的js資料陣列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error)) //錯誤處理
})

//設置新增餐廳頁面路由
app.get('/restaurants/new', (req , res) => {
  res.render('new')
})
//POST路由把資料送往資料庫
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設置show頁面路由 （detail）
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//設置Edit路由
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//edit 更新資料路由，把更新的資料送往資料庫
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body) //找到對應的資料後整個一起更新
    .then(() => res.redirect(`/restaurants/${id}`)) //導回各別餐廳頁面
    .catch(error => console.log(error))
})

//delete路由
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設置搜尋路由
app.get('/search', (req, res) => {
  //先拿到queyr string
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant =>  {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  
  res.render('index', { restaurant: restaurants, keyword })  
})



//監聽伺服器
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`)
})

