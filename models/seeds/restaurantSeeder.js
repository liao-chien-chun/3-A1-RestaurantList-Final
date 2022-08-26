const restaurantList = require('../../restaurant.json').results //載入檔案
const Restaurant = require('../restaurant') //載入Restaurant model
const bcrypt = require('bcryptjs')
const User = require('../user')
//引用mongoose連線設定
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
  }
]

db.once('open', async () => {
  SEED_USER.map(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        if (user.name === 'user1') {
          restaurantList.forEach(restaurant => {
            if (restaurant.id < 4) {
              return Restaurant.create({ ...restaurant, userId })
            }
          })
        }
        if (user.name === 'user2') {
          restaurantList.forEach(restaurant => {
            if (restaurant.id > 3 && restaurant.id < 7) {
              return Restaurant.create({ ...restaurant, userId })
            }
          })
        }
      })
  })
  console.log('種子資料建立完畢')
})