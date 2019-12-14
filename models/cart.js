const fs = require('fs');
const path = require('path');
const pathUtil = require('../util/path');

const p = path.join(pathUtil, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContente) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContente);
      }
      const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (erro) => {
        console.log(erro);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContente) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContente);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
      updatedCart.totalPrice -= (productPrice * productQty);
      fs.writeFile(p, JSON.stringify(updatedCart), (erro) => {
        console.log(erro);
      });
    });
  }

  static getCart(cb) {
    let cart;
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
        cb(cart);
      } else {
        cb(null);
      }
    });
  }
};
