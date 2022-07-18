const express = require('express') //載入express
const exphbs = require('express-handlebars') //載入handlebars

const app = express()




//設置路由
app.get('/', (req, res) => {
  res.send('This is a homepage')
})

app.listen(3000, () => {
  console.log('server is running on localhost:3000')
})

