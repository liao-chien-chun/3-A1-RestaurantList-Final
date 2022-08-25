const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

// 表單註冊路由
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 檢查是否已註冊
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('此使用者已經存在')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword,
        })
      } else {
        // 還沒註冊寫入資料庫
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect('/users/login'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router


