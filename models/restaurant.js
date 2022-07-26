const mongoose = require('mongoose')//載入mongoose
const Schema = mongoose.Schema //載入mongoose的Schema

//建立一個Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
  },
  name_en: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  google_map: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: { // 這組設定代表去參照User的 Object。這是mongoose提供的Populate功能，可以建立不同collections 之間的關聯
    type: Schema.Types.ObjectId,  //type:定義userId是一個Object，也就是他會連向另一個資料物件
    ref: 'User',  // ref: 定義參考對象是 User model
    index: true, //使用索引查詢資料能增加讀取效能
    required: true
  }
})

//匯出
//mongoose.model 會複製我們定義的Schema並編譯成一個可供操作的model物件
//匯出的時候我們這份model命名為Restaurant
//以後在其他檔案直接使用Restaurant就可以操作和代辦事項有關的資料了！
module.exports = mongoose.model('Restaurant', restaurantSchema)