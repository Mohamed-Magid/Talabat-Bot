const Requests = require('../models/Requests');
const bot = require('../bot/bot');
const getRestaurantInfo = require('./getRestauranteInfo');
const checkRestaurantsStatus = async () => {
    const count = await Requests.countDocuments({status: false});
    console.log(`${Date.now()}: Checking DB, ${count} requests found.`)
    if (count === 0) return;
    const requests = await Requests.find({status: false});
    for (let request of requests){
        if (request.nOfTries >= 50) {
            await bot.sendMessage(request.chatId, `🔴🔴 Hey ${request.senderName}, ${request.restaurantName} is unavailable for a long time!, we are going to stop pinging it.`);
            request.status = true;
            request.reported = true;
            await request.save();
            continue;
        }
        const info = await getRestaurantInfo(request.url);
        request.restaurantName = info.restaurantName;
        request.nOfTries++;
        await request.save();
        if (!info){
            bot.sendMessage(request.chatId, `Something went wrong while pinging the restaurant, we will stop trying to ping it. If you think this was done by mistake please resend the URL.`);
            request.status = true;
            request.reported = true;
            await request.save();
        }
        else if (info.restaurantStatus) {
            request.status = true;
            await bot.sendMessage(request.chatId, `🟢 Hey ${request.senderName}, ${info.restaurantName} is now available!`);
            request.reported = true;
            await request.save();
        }
        else {
            bot.sendMessage(request.chatId, `🔴 Hey ${request.senderName}, ${info.restaurantName} is still unavailable!`);
        }
    }
}
module.exports = checkRestaurantsStatus;