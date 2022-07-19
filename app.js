const express = require('express') //載入express
const exphbs = require('express-handlebars') //載入handlebars
const restaurantList = require('./restaurant.json')

const port = 3000
const app = express()

//設定樣版引擎
//透過app.engine來定義要使用的樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
//透過app.set告訴express說要設定view engine 是handlebars
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//設置首頁路由
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

//設置show頁面路由
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`)
})

