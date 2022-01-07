// import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';

const url = 'https://kingled.vn/san-pham-den-led/';
const base_url = 'https://kingled.vn';

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function Category(url, base_url) {
    try {
        const data = await (await fetch(url)).text();
        const $ = cheerio.load(data);
        // get all element with '.hotgroup .name a' to an array
        const categories = $('.hotgroup .name a');
        const categories_array = [];
        categories.each((index, element) => {
            categories_array.push({
                name: $(element).text(),
                slug: $(element).attr('href').replace('/', ''),
                img: $(element).parent().prev().find('img').attr('data-src'),
                url: base_url + $(element).attr('href'),
            });
        });
        fs.writeFile('./utils/productImport/categories.json', JSON.stringify(categories_array), (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        return categories_array;
    } catch (error) {
        console.log(error);
    }
}

async function ProductList(category_list, base_url) {
    try {
        const product_list = [];
        for (let i = 0; i < category_list.length; i++) {
        // for (let i = 0; i < 1; i++) {
            const data = await (await fetch(category_list[i].url)).text();
            const $ = cheerio.load(data);
            const products = $('.item .image a');
            products.each((index, element) => {
                product_list.push({
                    url: base_url + $(element).attr('href'),
                    category: category_list[i].slug,
                });
            });
        }
        return product_list;
    } catch (error) {
        console.log(error);
    }
}

async function ProductInfo(productList) {
    try {
        const productInfo = [];
        for (let i = 0; i < productList.length; i++) {
        // for (let i = 0; i < 1; i++) {
            const data = await (await fetch(productList[i].url,{
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
                    'Host': 'kingled.vn',
                    'Connection': 'keep-alive',
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
                code: $('.property div label').first().text() === 'Mã SP' ? $('.property div span a').first().text() : '',
                name: $('.infoimage .image div img').first().attr('alt'),
                images: productImages,
                category: productList[i].category,
                description: productDescription,
                specification: productSpecification,
                price: parseInt($('meta[itemprop="price"]').first().attr('content')),
                url: productList[i].url,
            });
            await timer(666);
        }
        fs.writeFile('./utils/productImport/products.json', JSON.stringify(productInfo), (err) => {
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

const categoryList = await Category(url, base_url);
const productList = await ProductList(categoryList, base_url);
const productInfo = await ProductInfo(productList);

console.log('done');