const puppeteer = require('puppeteer');
require("dotenv").config();

const searchProduct = async (req,res)=>{
    const browser = await puppeteer.launch({
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });

    try {
        const {item} = req.body
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=${item}&tbm=shop`);

        const products = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.KZmu8e'), (e) => ({
            title: e.querySelector('.sh-np__product-title').innerText,
            price: e.querySelector('b').innerText,
            image: e.querySelector('img').getAttribute('src')
            }))
        );
        res.status(200).send(products[0]);
    } catch (error) {
        res.status(500).json(error.message)
        console.log(error);
    } finally{
        await browser.close();
    }
}

module.exports  ={searchProduct}