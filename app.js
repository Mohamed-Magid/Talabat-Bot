require('dotenv').config();
const isValidTalabatURL = require('./helpers/isValidTalabatURL');
const checkRestaurantsStatus = require('./helpers/checkRestaurantsStatus');
const cron = require('node-cron');
const Request = require('./models/Requests');
const bot = require('./bot/bot');
const connectDB = require('./config/connectDB');
connectDB();
bot.start();
bot.on('/clear', async (msg) => {
    const count = await Request.countDocuments({
        chatId: msg.chat.id,
        status: false,
    });
    await Request.updateMany({
        chatId: msg.chat.id,
        status: false,
    }, {
        $set: {
            reported: true,
            status: true
        }
    })
    msg.reply.text(`Cleared ${count} requests.`);
});
bot.on('text', async (msg) => {
    if (msg.text.startsWith('/')) return;
    if (isValidTalabatURL(msg.text)) {
        msg.reply.text("Pinging the restaurant every 5 mins, you will be notified when it's available.");
        const request = new Request({
            url: msg.text,
            chatId: msg.chat.id,
            senderName: msg.from.first_name + ' ' + msg.from.last_name,
            senderUsername: msg.from.username
        });
        await request.save();
    } else {
        msg.reply.text("Invalid Talabat URL");
    }
});
cron.schedule('*/5 * * * *', checkRestaurantsStatus);