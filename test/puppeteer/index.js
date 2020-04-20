const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 4500
  });
  await page.goto('https://www.bitdeer.com/zh/pricing?id=1');
  await page.screenshot({path: '20200323.png'});

  await browser.close();
})();