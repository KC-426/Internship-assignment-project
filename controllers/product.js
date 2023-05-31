const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("main/form", {
    path: "/form/add-product",
    pageTitle: "Add Product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const to = req.body.to;
  const from = req.body.from;
  const quantity = req.body.quantity;
  const address = req.body.address;
  const transporter = req.body.transporter;

  const product = new Product({ to, from, quantity, address, transporter });
  product
    .save()
    .then((product) => {
      console.log(product);
      res.redirect("/form/add-product");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("main/message", {
        products:products,
        pageTitle: "Transporter Message",
        path: "/form/products",
      });
    })
    .catch((err) => console.log(err));
};
