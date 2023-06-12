const express = require('express');
const router = express.Router();

const Product = require('../models/Product.model');
const isLoggedIn = require('../middleware/isLoggedIn');



//GET /products/create (display form)
router.get("/products/create", (req, res, next) => {
    res.render("products/new-product")
});

// CREATE: process form
router.post("/products/create", (req, res, next) => {

    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }

    Product.create(newProduct)
        .then( (newProduct) => {
            res.redirect("/products");
        })
        .catch( e => {
            console.log("error creating a new product", e);
            next(e);
        });
});
/* GET /products - display products */
router.get("/products", (req, res, next) => {

    Product.find()
        .then((productsFromDB) => {
            const data = {
                products: productsFromDB
            }
            res.render("products/product-list", data);
        })
        .catch(e => {
            console.log("error getting products from the DB", e)
            next(e);
        });
});
//GET /products/:productId/edit
router.get("/products/:productId/edit", (req, res, next) => {

    const id = req.params.productId;

    Product.findById(id)
        .then(productFromDB => {
            res.render("products/product-edit", productFromDB)
        })
        .catch(e => {
            console.log("error editing this product from the DB", e)
            next(e);
        });

});
// UPDATE: process form
router.post("/products/:productId/edit", (req, res, next) => {
    const {productId}= req.params;
    const { title, description, price } = req.body;

    Product.findByIdAndUpdate(productId, { title, description, price }, { new: true })
        .then(updatedProduct => {
            console.log(updatedProduct.id);
            res.redirect(`/products/${updatedProduct.id}`)}) // go to the details page to see the updates
        .catch(error => next(error));
});



//GET /products/:productId Display details of one product
router.get("/products/:productId", (req, res, next) => {

    const id = req.params.productId;

    Product.findById(id)
        .then(productFromDB => {
            res.render("products/product-details", productFromDB)
        })
        .catch(e => {
            console.log("error getting product details from the DB", e)
            next(e);
        });

});




module.exports = router;