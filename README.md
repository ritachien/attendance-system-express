# attendance-system-express  
attendance-system 是一個考勤記錄系統。使用者(user)可以用 GPS 打卡、QRcode 打卡；管理者(admin)可以管理使用者及出勤紀錄。本專案採用前後分離方式進行開發，這個 repo 是後端部分，使用 NodeJS + Express 撰寫。  

* 【[API 文件](https://attendance-system-express-production.up.railway.app/api-docs/)】使用 Swagger-UI 製作。  
* 【[前端 repo 連結](https://github.com/ritachien/attendance-system-vue)】 attendance-system-vue  

更多專案相關資訊請至 [Wiki](https://github.com/ritachien/attendace-system-express/wiki) 查看!

## Demo  
* [Demo 連結](https://attendace-system-vue.vercel.app/)  
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

## Features  
### auth  
* 登入/登出功能。  
* 使用 JWT 進行身分認證。
* 不同頁面也進行權限設置，不同路由只有指定身分才能進入。  

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

## Built With  
* NodeJS @18
* MySQL/Sequelize - database
* jsonwebtoken - authorization
* Swagger-UI - generate API docs

## Author  
[Rita Chien](https://github.com/ritachien)  

