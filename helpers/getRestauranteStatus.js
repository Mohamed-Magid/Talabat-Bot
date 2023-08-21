const axios = require('axios');
const cheerio = require('cheerio');

const getRestauranteStatus = async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const busyStrings = ['مشغول', 'busy', 'closed', 'مغلق'];
    const status = $('span[data-test="rest-status"]').text().trim();
    return !busyStrings.includes(status.toLowerCase());
}

module.exports = getRestauranteStatus;