# 打造餐廳清單
使用Node.js 和express打造的餐廳清單網頁

&nbsp;
## 功能介紹

* 使用者可以在首頁看到所有餐廳與它們的簡單資料：
    * 餐廳照片
    * 餐廳名稱
    * 餐廳分類
    * 餐廳評分

* 使用者可以再點進去看餐廳的詳細資訊：
    * 類別
    * 地址
    * 電話
    * 描述
    * 圖片

* 使用者可以透過搜尋餐廳名稱來找到特定的餐廳
* 使用者可以透過搜尋餐廳類別來找到特定的餐廳

## 使用版本
* Node.js - v16.15.1
* express - v 4.18.1
* express-handlebars - v 3.0.0
* nodemon - v 2.0.19

## 如何使用(安裝與執行)
1. 確認有安裝node.js 與npm
2. 將專案clone到本地
3. 在本地端開啟後透過終端機進入資料夾中
4. 在終端機輸入
   ```bash
   npm init -y
   ```
5. 在終端機輸入以下指令，下載需要的套件
   ```bash
   npm i express nodemon express-handlebars@3.0.0
   ```
6. 開啟伺服器
   ```bash
   npm run dev
   ```
7. 當 terminal 出現以下字樣，表示伺服器已啟動完成
server is running on localhost:3000
8. 打開瀏覽器網址列輸入 http://localhost:3000/ 可以看到本專案的網頁呈現

