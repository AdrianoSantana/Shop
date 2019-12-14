
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecomplete', 'ans3', 'Adr679852', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;
