var BotAction = require('../output/bot-action');

function onMessage(text) {

    if (text == "起床囉!") {
        return new BotAction(1, "", "早安! 今天要做什麼呢?", []);
    } else if (text == "經歷") {
        return new BotAction(1, "", "架構中", []);
    } else if (text == "關於") {
        return new BotAction(1, "", "我的Server是架在Heroku上面，使用Node.js，歡迎常找我玩，我的主人是Kai", []);
    } else {
        return new BotAction(1, "", "我不懂你在說什麼，請輸入正確指令", []);
    }
} 

module.exports.onMessage = onMessage;
