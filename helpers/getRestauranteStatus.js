const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')
const getRestaurantStatus = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
            }

        });
        fs.writeFileSync('test.html', response.data);
        const $ = cheerio.load(response.data);
        const busyStrings = ['مشغول', 'busy', 'closed', 'مغلق'];
        const status = $('span[data-testid="rest-status"]').text().trim();
        return !busyStrings.includes(status.toLowerCase());
    } catch (error) {
        console.log(error);
    }
}

module.exports = getRestaurantStatus;