// 直接匯出一個物件 裡面是一個叫做 authentication 函式
// 會在總路由器掛載，並使用
// isAuthenticated() 是 passport.js 提供的函示，根據請求登入狀態回傳 Boolean
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}