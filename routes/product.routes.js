const express = require('express');
const router = express.Router();

const Product = require('../models/Product.model');
const isLoggedIn = require('../middleware/isLoggedIn');



//GET /products/create (display form)
router.get("/products/create",isLoggedIn, (req, res, next) => {
    res.render("products/new-product")
});

// CREATE: process form
router.post("/products/create",isLoggedIn, (req, res, next) => {
    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    };
  // Check that title and price are provided
  if (newProduct.title === "" || newProduct.price === "" ) {
    res.status(400).render("products/new-product", {
      errorMessage:
        "Please provide title and price, these fields are mandatory.",
    });
    return;
  }
 
    
    Product.create(newProduct)
        .then( (newProduct) => {
            res.redirect("/products");
        })
        .catch( e => {
            if(e.code===11000){
                Product.find()
                .then((products)=>{
                    res.render("products/product-list", {products: products, errormsg: "Product already exists"});
                })
            }
                console.log("error creating a new product", e);
            //next(e);
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
            console.log("error getting displaying products", e)
            next(e);
        });
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
// DELETE: delete product
router.post("/products/:productId/delete",isLoggedIn, (req, res, next) => {
    const id = req.params.productId;

  Product.findByIdAndDelete(id)
    .then(() => res.redirect("/products"))
    .catch((e) => {
      console.log("Theres an error while updating the product to the db", e);
    });
});
//GET /products/:productId/edit
router.get("/products/:productId/edit",isLoggedIn, (req, res, next) => {

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
router.post("/products/:productId/edit",isLoggedIn, (req, res, next) => {
    const id= req.params.productId;
    const { title, description, price } = req.body;
    Product.findByIdAndUpdate(id, { title, description, price }, { new: true })
        .then((updatedProduct) => res.redirect(`/products`)) // go to the details page to see the updates
        .catch(error => next(error));
});





module.exports = router;