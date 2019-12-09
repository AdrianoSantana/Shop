const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.status(200).render('./admin/add-product.ejs', {
    pageTitle: 'Add products',
    path: '/admin/add-product',
    activeShop: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const {
    title,
    imageUrl,
    price,
    description,
  } = req.body;

  // Criando um objeto da classe produto
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.products = (req, res) => {
  Product.fetchAll((products) => {
    res.status(200).render('./admin/products.ejs', {
      pageTitle: 'Admin Products',
      prods: products,
      path: '/admin/products',
    });
  });
};
