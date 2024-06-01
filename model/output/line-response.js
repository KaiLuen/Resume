var line = require('@line/bot-sdk');
var BotAction = require('./bot-action');

var accessToken = "zDGe+ruaDEFXP1fQP14HD0Oas38Nb/4Iqjb4WvDC7okxY+liu3dyHKq4k7HaizkZtQAdpMGGjwv7f7MT/6kCtqqtdfReJbq4/ZzTTfMSgQ8AjI9Wr45Y+BrldGtwoaxM94CU4l9wvo+n9u1LTZqrLgdB04t89/1O/w1cDnyilFU="
var secret = "37307ea6d15cbf5587ccb842f535677b"

const config = {
  channelAccessToken: accessToken,
  channelSecret: secret
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: accessToken
});


class LineResponse {
  replyToken;
  action;

  constructor(replyToken, action) {
    this.replyToken = replyToken;
    this.action = action;
  }

  async sendAction() {
    if (this.action.type === 1) {
      const echo = { type: 'text', text: this.action.msg };
      return client.replyMessage({
        replyToken: this.replyToken,
        messages: [echo],
      });
    } else {
      const echo = { type: 'text', text: "其他種類訊息正在建構中" };
      return client.replyMessage({
        replyToken: this.replyToken,
        messages: [echo],
      });
    }
  }
}
module.exports = LineResponse;