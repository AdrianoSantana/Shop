const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const app = express();
const controllerNotFound = require('./controllers/404');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');

app.set('view-engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(controllerNotFound.notFound);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize.sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Adriano', email: 'ans3@cin.ufpe.br' });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000, () => console.log('Server is running.'));
  })
  .catch((err) => console.log(err));
