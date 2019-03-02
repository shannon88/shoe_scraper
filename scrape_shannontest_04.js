const puppeteer = require('puppeteer');
function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://www.sorel.com/women/boots/");
            let urls = await page.evaluate(() => {
                let initArray = [];
                let items = document.querySelectorAll('.product-tile');
                items.forEach((item) => {
                    if(item.querySelector(".product-discounted-price")!== null){
                    initArray.push({
                        title: item.querySelector(".name-link").innerText,
                        price: item.querySelector(".product-sales-price").innerText,
                    })};
                });
                const result = [];
                const map = new Map();
                for (const item of initArray){
                    if(!map.has(item.title)){
                        map.set(item.title, true);
                        result.push({
                            title: item.title,
                            price: item.price
                        });
                    }
                }
                        return result; 
                    })
            
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);