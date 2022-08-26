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
  // 先把需要的餐廳資料拿出來
  const seedRestaurant1 = restaurantList.filter(restaurant => restaurant.id < 4)
  const seedRestaurant2 = restaurantList.filter(restaurant => restaurant.id > 3 && restaurant.id < 7)
  Promise.all(
    Array.from(SEED_USER, (seedUser) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          if (user.name === 'user1') {
            seedRestaurant1.forEach(restaurant => {
              restaurant.userId = userId
            })
            return Restaurant.create(seedRestaurant1)
          } else {
            seedRestaurant2.forEach(restaurant => {
              restaurant.userId = userId
            })
            return Restaurant.create(seedRestaurant2)
          }
        })
    })
  )
  .then(() => {
    console.log('done')
    process.exit()
  })
})