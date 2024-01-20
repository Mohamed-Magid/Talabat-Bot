require('dotenv').config();
const isValidTalabatURL = require('./helpers/isValidTalabatURL');
const getRestaurantInfo = require('./helpers/getRestauranteInfo');
const TeleBot = require('telebot');
const Request = require('./models/Requests');
const bot = new TeleBot({token: process.env.BOT_TOKEN});
const connectDB = require('./config/connectDB');
connectDB();
bot.start();
let intervalID;
bot.on('text', async (msg) => {
    if (isValidTalabatURL(msg.text)) {
        const request = new Request({
            url: msg.text,
            chatId: msg.chat.id,
            senderName: msg.from.first_name + ' ' + msg.from.last_name,
            senderUsername: msg.from.username
        });
        await request.save();
        intervalID = setInterval(async () => {
            let info = await getRestaurantInfo(msg.text);
            if (info.status) {
                msg.reply.text(`Restaurant ${info.name} is now open`);
                clearInterval(intervalID);
            } else {
                console.log(`Restaurant ${info.name} is still closed`);
            }
        },1000*60*5);

    } else if (msg.text === 'stop') {
        clearInterval(intervalID);
        msg.reply.text("Stopped");
    } else {
        msg.reply.text("Invalid Talabat URL");
    }
});
