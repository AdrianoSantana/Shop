const fs = require('fs');
const path = require('path');
const pathUtil = require('../util/path');

const p = path.join(pathUtil, 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) cb([]);
    else cb(JSON.parse(data));
  });
};

module.exports = class product { // Exportaremos uma classe como modelo para os produtos
  constructor(productId, title, imageUrl, description, price) {
    this.productId = productId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /*
  Uma função que irá salvas objetos da classe product dentro do array
  products como se o array fosse um bd
  Salvando products em um arquivo, sem ser BD
  */
  save() {
    getProductsFromFile((products) => {
      if (this.productId) {
        // eslint-disable-next-line max-len
        const existingProductIndex = products.findIndex((prod) => prod.productId === this.productId);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.productId = Math.random().toString();
        products.push(this);
        // Escreve o array products no formato json
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const prod = products.find((prods) => (prods.productId === id));
      cb(prod);
    });
  }
};
