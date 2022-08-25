const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: true,
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

// 表單註冊路由
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 沒有填寫所有資料
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有資料都是必填的！'})
  }
  // 密碼不一致
  if (password !== confirmPassword) {
    errors.push({ message: '密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // 檢查是否已註冊
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: "此Email 已經註冊過了" })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      // 使用bcrypt 處理要存入資料庫的密碼
      return bcrypt
        .genSalt(10) // 產生鹽，複雜係數10
        .then(salt => bcrypt.hash(password, salt)) //為使用者密碼加鹽
        .then(hash => User.create({
          name,
          email,
          password: hash // 用雜湊取代原本的密碼
        }))
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')
  res.redirect('/users/login')
})

module.exports = router


