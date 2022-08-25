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
      // 還沒註冊寫入資料庫
      return User.create({
        name,
        email,
        password,
      })
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


