# attendance-system-express  
<code><img width="10%" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg"></code>
<code><img width="10%" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg"></code>
<code><img width="10%" src="https://www.vectorlogo.zone/logos/mysql/mysql-ar21.svg"></code>
<code><img width="10%" src="https://www.vectorlogo.zone/logos/sequelizejs/sequelizejs-ar21.svg"></code>
<code><img width="10%" src="https://www.vectorlogo.zone/logos/nodemonio/nodemonio-ar21.svg"></code>  

attendance-system 是一個考勤記錄系統。使用者(user)可以用 GPS 打卡、QRcode 打卡；管理者(admin)可以管理使用者及出勤紀錄。本專案採用前後分離方式進行開發，這個 repo 是後端部分，使用 NodeJS + Express 撰寫。  


* 【[API 文件](https://attendance-system-express-production.up.railway.app/api-docs/)】使用 Swagger-UI 製作。  
* 【[前端 repo 連結](https://github.com/ritachien/attendance-system-vue)】 attendance-system-vue  

更多專案相關資訊請至 [Wiki](https://github.com/ritachien/attendance-system-express/wiki) 查看!

## Demo  
* [Demo 連結](https://attendance-system-vue.vercel.app/)  
* 可用種子帳號進行登入，管理者 1 名、使用者 10 名(user1~user10)。  
* 測試時，`user1` 帳號請勿修改帳號/密碼，其他 user 請在測試後改回預設帳號/密碼。  
  ```js
  // admin
  {
    account: admin,
    password: tiadmin,
  }

  // users
  {
    account: `user${i}`,  // example: user10
    password: titaner,
  }
  ```
* 因此專案是鈦坦科技與 Alpha Camp 合作挑戰項目，GPS 打卡點僅預設以下 2 地點，若您想在自己目前位置打卡成功，請將專案下載至本地端(前後端都要設定一次)，增加您附近的位置後再啟動進行測試。  
  ```js
  // 後端位置: middleware/isAllowedClock.js
  {
    // 新加坡商鈦坦科技(南港)
    lat: 25.057640384418786,
    lng: 121.61235508426716,
  },
  {
    // ALPHA Camp(台北)
    lat: 25.05599234479154,
    lng: 121.5443365400908,
  },
  ```

## Features  
### auth  
* 登入/登出功能。  
* 使用 JWT 進行身分認證。
* 不同路由也進行權限設置，只有指定身分才能進入。  

### admin
* Admin 可新增一名使用者(初始化密碼預設 titaner)。  
* Admin 可以取得所有 users 資料(不含密碼)。  
* Admin 可以修改單筆 user 資料。  

### users
* 使用者可變更個人帳號、密碼、eamil。  
* 使用者可打上下班卡，僅上班日可打卡。  
* 使用者打卡後自動判定出勤狀態(未滿 8 小時或只打卡一次視為出勤異常)。  
* 使用者可以看到自己當天的打卡記錄。  
* 依照 payload 提供的有效 Token，回傳目前登入使用者的基本資訊。  

### others  
* 換日時間為上午五點，自動判定打卡記錄日期。  
* 出缺勤僅計算工作日(根據台灣行政院人事行政總處公布的行事曆判定)。  

### 開發中  
* 使用者可用 QRcode 進行打卡。  
* Admin 可以查看缺勤使用者的帳號。  
* Admin 可以清除缺勤狀態，改為出勤。  
* 有通知功能給 Admin 有人帳號上鎖。  
* 有通知功能給 Admin 今天未打卡的人有誰。  

## Getting Started  
若您想在本地端執行，請依下列說明步驟操作。  

### Prerequisites  
* 安裝 NodeJS (建議版本 @18.2)  
* 安裝 yarn  
  ```
  npm install -g yarn
  ```

### Installing  
* 下載專案  
  ```bash
  git clone https://github.com/ritachien/attendance-system-express.git
  ```
* 安裝套件  
  ```bash
  yarn install
  ```
* 本專案有使用 `husky` 確保 commit 前先進行 ESLint 檢查，請依[官方說明](https://github.com/typicode/husky#usage)進行安裝。  
  - 在 `package.json` > `script` 裡新增項目。  
    ```json
    {
      "prepare": "husky install"
    }
    ```
  - 執行一次後即可刪除 `script`。  
    ```bash
    yarn prepare
    ```
* 建立 `.env` 檔案，並將 `AUTH_PRIVATE` (用於 JWT auth)和 `DATABASE_URL` 填入(請見 `.env.example`)。

### Start  
* 使用以下其中一個指令開始。  
  ```bash
  yarn dev
  yarn start
  ```

### Initialize database & Add seed users 
```js
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 更新行事曆  
* 至[政府資料開放平台](https://data.gov.tw/dataset/14718)下載新年度 `csv` 檔案，以 `${year}.csv` 為檔名，存到 `config/govCalendar` 資料夾裡。  
  - 請先刪除空白行和表頭列。  
  - 約於每年 6 ~ 7 月公布新年度行事曆。  
* 執行下列指令會產出次年度行事曆的 JSON 檔(已執行當下台北時間的年度計)。  
  ```bash
  yarn newYearData
  ```
  - 產出下一年度資料，存到 `config/govCalendar` 資料夾裡。
  - 刪除前一年度資料(前一年度的出勤不應該變動，所以不會再使用到舊表)。



## Built With  
* NodeJS @18
* MySQL/Sequelize - database
* jsonwebtoken - authorization
* Swagger-UI - generate API docs

## Author  
[Rita Chien](https://github.com/ritachien)  

