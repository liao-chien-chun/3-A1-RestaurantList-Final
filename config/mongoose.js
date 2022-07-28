const mongoose = require('mongoose') //載入mongoose

//建立資料庫連線
mongoose.connect(process.env.MONGODB_URI3, { useNewUrlParser: true, useUnifiedTopology: true })

//取得連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected')
})

//匯出
module.exports = db