require('dotenv').config();
const isValidTalabatURL = require('./helpers/isValidTalabatURL');
const getRestaurantStatus = require('./helpers/getRestauranteStatus');
const TeleBot = require('telebot');

const bot = new TeleBot({token: process.env.BOT_TOKEN});

bot.start();

bot.on('text', async (msg) => {
    let intervalID;
    if (isValidTalabatURL(msg.text)) {
        intervalID = setInterval(async () => {
            if (await getRestaurantStatus(msg.text)) {
                msg.reply.text("Restaurant is now open");
                clearInterval(intervalID);
            } else {
                console.log("Restaurant is still closed");
            }
        },2000*60);

    } else if (msg.text === 'stop') {
        clearInterval(intervalID);
        msg.reply.text("Stopped");
    } else {
        msg.reply.text("Invalid Talabat URL");
    }
});
