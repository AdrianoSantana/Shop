const Product = require('../models/product'); // Importando o modelo de produto para o controller
const Cart = require('../models/cart');

exports.getProducts = (req, res) => { // Recebe todos os projetos, getALL
  Product.fetchAll((products) => {
    res.status(200).render('./shop/product-list.ejs', {
      pageTitle: 'All products',
      prods: products,
      path: '/products',
    });
  });
};

exports.getOneProduct = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    res.status(200).render('./shop/product-detail.ejs', {
      pageTitle: product.title,
      path: '/products',
      product,
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.status(200).render('./shop/index.ejs', {
      pageTitle: 'Shop',
      prods: products,
      path: '/',
    });
  });
};

exports.getCart = (req, res) => {
  res.render('./shop/cart.ejs', {
    path: '/cart',
    pageTitle: 'Your cart',
  });
};

exports.postCart = (req, res) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/');
};

exports.getCheckout = (req, res) => {
  res.render('./shop/checkout.ejs', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.getOrders = (req, res) => {
  res.render('./shop/orders.ejs', {
    path: '/orders',
    pageTitle: 'Your orders',
  });
};
