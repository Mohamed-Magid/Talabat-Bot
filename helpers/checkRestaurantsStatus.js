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
        request.restaurantName = info.restaurantName;
        request.nOfTries++;
        await request.save();
        if (info.restaurantStatus) {
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