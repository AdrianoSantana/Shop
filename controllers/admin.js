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

  Product.create({
    title,
    price,
    imageUrl,
    description,
  })
    .then((result) => {
      console.log(' Created product!');
      res.redirect('/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
  const { id } = req.params;
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
  }
  Product.findByPk(id)
    .then((result) => {
      res.status(200).render('./admin/edit-product.ejs', {
        pageTitle: 'Edit products',
        path: '/admin/edit-product',
        editing: true,
        product: result.dataValues,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const {
    id,
    title,
    price,
    description,
    imageUrl,
  } = req.body;

  Product.update({
    id,
    title,
    price,
    description,
    imageUrl,
  },
  { where: { id } })
    .then((result) => {
      if (!result) {
        res.redirect('/');
      }
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const { id } = req.params;
  Product.destroy({ where: { id } });
  res.redirect('/admin/products');
};

exports.products = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).render('./admin/products.ejs', {
        pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};
