const TeleBot = require('telebot');
const bot = new TeleBot({token: process.env.BOT_TOKEN});
module.exports = bot;