var express = require('express');
var router = express.Router();
const line = require('@line/bot-sdk');
require('dotenv').config();


//MongoDB儲存User資料
//Auth with middleware
//將User資料吐出轉換成為Json供User下載
//
//

/**
 * 此APP為履歷轉Json軟體，分為以下幾個部分
 * 1. User Profile
 * 2. Education
 * 3. Experience
 * 4. Skill
 * 5. Project
 * 6. Certificate
 * 7. Language
 * 8. Reference
 */
const config = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});



/* GET home page. */
router.get('/', function(req, res, next) {
  //#swagger.ignore = true
  console.log("HEllo World");
  res.render('index', { title: 'Express', user: req.user });
});


module.exports = router;