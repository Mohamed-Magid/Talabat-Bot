require('dotenv').config();
const database = require('./helpers/database');
const isValidTalbatURL = require('./helpers/isValidTalabatURL');
const db = require('./helpers/database');
const getRestauranteStatus = require('./helpers/getRestauranteStatus');
const TeleBot = require('telebot');

const bot = new TeleBot({token: process.env.BOT_TOKEN});

bot.start();

bot.on('text', async (msg) => {
    if (isValidTalbatURL(msg.text)) {
        const intervalID = setInterval(async () => {
            if (await getRestauranteStatus(msg.text)){
                msg.reply.text("Restaurant is now open");
                clearInterval(intervalID);
            }
            else {
                msg.reply.text('Restaurant is still closed');
            }
        },1000 * 60);

    }
});
