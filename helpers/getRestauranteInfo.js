const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const getRestaurantInfo = async (url) => {
    try {
      return await puppeteer.launch({
          headless: false,
          // executablePath: '/usr/bin/google-chrome',
          args: ["--no-sandbox", "--disabled-setupid-sandbox", "--disable-gpu"]
      }).then(async browser => {
            const page = await browser.newPage();
            await page.setViewport({width: 800, height: 600});
            await page.goto(url);
            await page.waitForSelector('span[data-testid="rest-status"]');
            const status = await page.$eval('span[data-testid="rest-status"]', el => el.innerText.trim());
            const name = await page.$eval('h1[data-testid="restaurant-title"]', el => el.firstChild.nodeValue.trim());
            await browser.close();
            const busyStrings = ['مشغول', 'busy', 'closed', 'مغلق'];
          return {
              restaurantName: name,
              restaurantStatus: !busyStrings.includes(status.toLowerCase())
          };
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};
module.exports = getRestaurantInfo;