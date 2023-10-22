const puppeteer = require('puppeteer');

const searchProduct = async (req,res)=>{
    try {
        const {item} = req.body
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=${item}&tbm=shop`);

        const products = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.KZmu8e'), (e) => ({
            title: e.querySelector('.sh-np__product-title').innerText,
            price: e.querySelector('b').innerText,
            image: e.querySelector('img').getAttribute('src')
            }))
        );
        await browser.close();
        res.status(200).send(products[0]);
    } catch (error) {
        res.status(500).json(error.message)
        console.log(error);
    }
}

module.exports  ={searchProduct}