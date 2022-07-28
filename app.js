const express = require('express') //載入express
const exphbs = require('express-handlebars') //載入handlebars
const mongoose = require('mongoose') //載入mongoose
const bodyParser = require('body-parser') //引入body-parser
const Restaurant = require('./models/restaurant') //載入Restaurant model
const methodOverride = require('method-override') //載入method-override

const routes = require('./routes') //引用路由器
//他會自己找到此資料夾下要用的檔案

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
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
app.use(routes) // 將requset導入路由器

//設定樣版引擎
//透過app.engine來定義要使用的樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
//透過app.set告訴express說要設定view engine 是handlebars
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))


//監聽伺服器
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`)
})

