const Product = require('../models/product'); // Importando o modelo de produto para o controller
const Cart = require('../models/cart');

exports.getProducts = (req, res) => { // Recebe todos os projetos, getALL
  Product.findAll()
    .then((products) => {
      res.status(200).render('./shop/product-list.ejs', {
        pageTitle: 'All products',
        prods: products,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getOneProduct = (req, res) => {
  const { id } = req.params;
  Product.findByPk(id)
    .then((product) => {
      res.status(200).render('./shop/product-detail.ejs', {
        pageTitle: product.title,
        path: '/products',
        product: product.dataValues,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).render('./shop/product-list.ejs', {
        pageTitle: 'All products',
        prods: products,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
  let product;
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      // eslint-disable-next-line no-restricted-syntax
      for (product of products) {
        // eslint-disable-next-line no-loop-func
        const cartProductData = cart.products.find((prod) => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('./shop/cart.ejs', {
        path: '/cart',
        pageTitle: 'Your cart',
        products: cartProducts,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

exports.postCart = (req, res) => {
  const { id } = req.body;
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect('/');
};

exports.cartDelete = (req, res) => {
  const { id } = req.body;
  Product.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
    res.redirect('/cart');
  });
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
