const express = require('express');
const router = express.Router();

const Product = require('../models/Product.model');
const isLoggedIn = require('../middleware/isLoggedIn');

// CREATE: display form
router.get("/books/create", isLoggedIn, (req, res, next) => {
    Author.find()
        .then( authorsFromDB => {
            res.render("books/book-create", {authorsArr: authorsFromDB});
        })
        .catch( e => {
            console.log("error displaying book create form", e);
            next(e);
        });
});



// CREATE: process form
router.post("/products/create", isLoggedIn, (req, res, next) => {

    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    };

    Product.create(newProduct)
        .then( (newProduct) => {
            res.redirect("/products");
        })
        .catch( e => {
            console.log("error creating a new product", e);
            next(e);
        });
});












module.exports = router;