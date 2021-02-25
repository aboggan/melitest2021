const express = require('express');
var request = require('request');
const fetch = require('node-fetch');
const app = express();
const port = 5000;

app.get("/api/items/", (req, res) => {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`;
    request(
        url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const parsedBody = JSON.parse(body);
                let categoryNames = [];
                let items = [];

                //Categories
                const categories = parsedBody['filters'].find(filter => filter.id === "category");
                if (categories) {
                    categories.values[0]['path_from_root'].forEach(category => {
                        categoryNames.push(category.name);
                    });
                }

                //Items
                parsedBody.results.forEach(result => {

                    const parsedPrice = parsePrice(result.price);

                    const item = {
                        id: result.id,
                        title: result.title,
                        price: {
                            currency: result.currency_id ? result.currency_id : "ARS",
                            amount: parsedPrice.amount,
                            decimals: parsedPrice.decimals
                        },
                        picture: result.thumbnail,
                        condition: result.condition,
                        free_shipping: result.shipping.free_shipping,
                        location: result.seller_address.state.name
                    }
                    items.push(item);
                });

                //Response
                const apiResponse = {
                    author: {
                        name: "Alexis",
                        lastname: "Boggan"
                    },
                    categories: categoryNames,
                    items: items
                }

                res.send(apiResponse);
            }
        }
    )
});

app.get("/api/items/:id", async (req, res) => {

    const itemId = req.params.id;

    const itemDetails = await fetch(`https://api.mercadolibre.com/items/${itemId}/ `)
        .then(res => res.json())
        .catch(error => console.log(error))

    //Wrong ID    
    if (itemDetails.error) {
        res.send(false);
        return;
    }

    const itemDescription = await fetch(`https://api.mercadolibre.com/items/${itemId}/description`)
        .then(res => res.json())
        .catch(error => console.log(error))

    //Categories
    const itemCategories = await fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${itemDetails.category_id}`)
        .then(res => res.json())
        .catch(error => console.log(error))

    let categoryNames = [];
    const categories = itemCategories['filters'].find(filter => filter.id === "category");
    if (categories) {
        categories.values[0]['path_from_root'].forEach(category => {
            categoryNames.push(category.name);
        });
    }

    let condition = itemDetails['attributes'].find(attr => attr.id === "ITEM_CONDITION");
    if (!condition) {
        condition = { value_name: "" }
    }
    const parsedPrice = parsePrice(itemDetails.price)

    const item = {
        id: itemDetails.id,
        title: itemDetails.title,
        price: {
            currency: itemDetails.currency_id ? itemDetails.currency_id : "ARS",
            amount: parsedPrice.amount,
            decimals: parsedPrice.decimals
        }
    }

    const apiResponse = {
        author: {
            name: "Alexis",
            lastname: "Boggan"
        },
        item: item,
        picture: itemDetails.pictures[0].url,
        condition: condition.value_name,
        shipping: itemDetails.shipping.free_shipping,
        sold_quantity: itemDetails.sold_quantity,
        description: itemDescription.plain_text,
        categories: categoryNames
    }
    res.send(apiResponse);
});

const parsePrice = (price) => {

    let parsedPrice = { amount: price, decimals: "" }

    if (price === null) {
        parsedPrice = { amount: 0, decimals: "" }
        return parsedPrice;
    }

    //Parsed price when has decimals
    if (price.toString().includes(".")) {

        parsedPrice.decimals = price.toString().split(".")[1];

        parsedPrice.amount = price.toString().split(".")[0];
        parsedPrice.amount = Number(price);
    }

    return parsedPrice;
}

app.listen(port, () => console.log(`escuchando puerto ${port}`));