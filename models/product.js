const Sequelize = require('sequelize'); // Deve se importar o Sequelize para obter os tipos de dados q ele aceita

const sequelize = require('../util/database'); // Importando o pool para a conexão com o database

const Product = sequelize.define('product', { // Usamos o pool de conexão para criar o modelo pro database
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
