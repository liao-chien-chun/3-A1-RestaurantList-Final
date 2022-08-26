# 打造餐廳清單
使用Node.js 和express打造的餐廳清單網頁
新增MongoDB
使用會員登入認證系統

&nbsp;
## 功能介紹

* 使用者可以使用email 註冊
* 使用者必須登入之後 才能使用以下功能
* 使用者可以使用 facebook 登入
* 登入失敗、註冊失敗都有提示訊息
* 使用者可以查看所有餐廳
* 使用者可以瀏覽特定餐廳資訊
* 使用者可以連結到餐廳的google地圖
* 使用者可以新增餐廳
* 使用者可以編輯餐廳
* 使用者可以刪除餐廳
* 使用者可以 搜尋特定餐廳

## 使用版本
* Node.js - v16.15.1
* express - v 4.18.1
* express-handlebars - v 3.0.0
* nodemon - v 2.0.19
* mongoose - v6.4.6
* MongoD
* method-override 3.0.0
* bcryptjs 2.4.3
* connect-flash 0.1.1
* dotenv 8.2.0
* express-session 1.17.1
* passport 0.4.1
* passport-facebook 3.0.0
* passport-local 1.0.0


## 如何使用(安裝與執行)
1. 確認有安裝node.js 與npm跟MondoDB或者MongoDb雲端版 跟圖形化介面Robo3T
2. 將專案clone到本地
3. 在本地端開啟後透過終端機進入資料夾中
4. 在終端機輸入
   ```bash
   npm init
   ```
5. 參考 .env.exanple 建立 env檔案，並填入自己的資訊
6. 連線自己的Mongodb資料庫
7. 連先完成後 先跑腳本新增種子資料
   ```bash
   npm run seed
   ```
8. 開啟伺服器
   ```bash
   npm run dev
   ```
9. 當 terminal 出現以下字樣，表示伺服器已啟動完成
   ```bash
   server is running on localhost:3000
   mongodb connected
   ```
10. 打開瀏覽器網址列輸入 http://localhost:3000/ 可以看到本專案的網頁呈現

