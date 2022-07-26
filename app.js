const express = require('express') //載入express
const session = require('express-session') // 載入express-session
const exphbs = require('express-handlebars') //載入handlebars
const bodyParser = require('body-parser') //引入body-parser
const methodOverride = require('method-override') //載入method-override
const routes = require('./routes') //引用路由器 //他會自己找到此資料夾下要用的檔案
require('./config/mongoose') //引用mongoose連線設定
//Mongoose 連線設定只需要被執行，不需要接到任何回傳參數利用，所以不需要再設定變數
const usePassport = require('./config/passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT
const app = express()

//設定樣版引擎
//透過app.engine來定義要使用的樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//透過app.set告訴express說要設定view engine 是handlebars
app.set('view engine', 'hbs')


// 使用 session 設定
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
//setting static files
app.use(express.static('public'))
//用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
// 設定本地變數 res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() // 把req.isAuthenticated()回傳的布林值，交給res 使用
  res.locals.user = req.user // 把使用者資料交給 res
  res.locals.success_msg = req.flash('success_msg') // 設定 成功訊息
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})
app.use(routes)  // 將requset導入路由器



//監聽伺服器
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`)
})

