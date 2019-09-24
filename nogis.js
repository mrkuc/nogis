const puppeteer = require('puppeteer');

exports.search = async (queries) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.co.jp/imghp?hl=ja');
    await page.type("input[name='q']", queries.join(' '))
    await Promise.all([
        page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    
    let es = await page.$$eval("div.rg_meta", es => {
        return es.map(e => JSON.parse(e.textContent));
    });

    es.forEach(e => console.log(e.ou))
    browser.close();
}

