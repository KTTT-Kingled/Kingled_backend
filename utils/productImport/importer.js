import fetch from "node-fetch";
import categories from "./categories.json";
import products from "./products.json";

const categoriesArr = Object.keys(categories).map(key => categories[key]);
const productsArr = Object.keys(products).map(key => products[key]);

// categoriesArr.forEach(category => {
//     fetch("http://localhost:3000/categories/add", {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json"
//         },
//         body: JSON.stringify(category)
//     })
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.log(err));
//     setTimeout(() => {}, 66);
//     }
// );

productsArr.forEach(product => {
    fetch("http://localhost:3000/products/add", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    setTimeout(() => {}, 66);
    }
);