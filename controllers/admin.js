const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.status(200).render('./admin/edit-product.ejs', {
    pageTitle: 'Add products',
    path: '/admin/add-product',
    editing: false,
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
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res) => {
  const { productId } = req.params;
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
  }
  Product.findById(productId, (product) => {
    console.log(product);
    if (!product) {
      res.redirect('/');
    }
    res.status(200).render('./admin/edit-product.ejs', {
      pageTitle: 'Edit products',
      path: '/admin/edit-product',
      editing: true,
      product,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const {
    productId,
    title,
    price,
    description,
    imageUrl,
  } = req.body;
  const updatedProduct = new Product(productId, title, imageUrl, description, price);
  updatedProduct.save();
  res.redirect('/admin/products');
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
