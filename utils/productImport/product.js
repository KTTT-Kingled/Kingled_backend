import cheerio from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';

const product_list = [
    'https://kingled.vn/phu-kien-chao-nhua-chao-ufo-200',
    'https://kingled.vn/den-lea-am-tran-10w',
    'https://kingled.vn/den-led-op-tran-moonstone-12w',
    'https://kingled.vn/den-tha-led-pl0012a'
]

async function ProductInfo(productList) {
    try {
        const productInfo = [];
        for (let i = 0; i < productList.length; i++) {
        // for (let i = 0; i < 1; i++) {
            const data = await (await fetch(productList[i],{
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
                }
            })).text();
            const $ = cheerio.load(data);

            // get an array of image url from class '.slick-cloned'
            const productImages = $('.infoimage .image div img')
                .toArray()
                .map((x) => {
                    return $(x).attr('data-image');
                });
            // get productDescription from raw html with id 'Description'
            const productDescription = $('#Description').html();
            // get productSpecification from tag '.property div'
            const productSpecification = [];
            const specificationList = $('.property div').slice(1);
            specificationList.each((index, element) => {
                productSpecification.push({
                    name: $(element).find('label').text(),
                    value:
                        $(element).find('label').text() === 'Nhiệt Độ Màu' ||
                        $(element).find('label').text() === 'Ánh Sáng'
                            ? $(element)
                                    .find('span a')
                                    .toArray()
                                    .map((x) => {
                                        return $(x).text();
                                    })
                            : $(element).find('span a').text(),
                });
            });
            // push info to productInfo array
            productInfo.push({
                code: $('.property div span a').first().text(),
                name: $('.infoproduct h1').text(),
                images: productImages,
                category: $('.nav .container ul li a').first().next().text().replace('/', ''),
                subCategory:
                    $('.nav .container ul li a').length == 3
                        ? $('.nav .container ul li a').first().next().next().text().replace('/', '')
                        : '',
                description: productDescription,
                specification: productSpecification,
                // price: $('.price') ? $('.price span').text().replace(': ', '') : '',
                price: $('.price span') ? 'true' : 'false',
                url: productList[i],
            });
            await timer(300);
        }
        fs.writeFile('./utils/productCrawler/products_test.json', JSON.stringify(productInfo), (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        return productInfo;
    } catch (error) {
        console.log(error);
    }
}

async function timer(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function checkProduct(url) {
    try {
        const data = await (await fetch(url,{
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
            }
        })).text();
        const $ = cheerio.load(data);
        console.log(parseInt($('meta[itemprop="price"]').first().attr('content')));
        fs.writeFile('./utils/productCrawler/html.txt', $.html(), (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

console.log(productMap[0]);

// await checkProduct(product_list[1]);
// console.log(await ProductInfo(product_list));