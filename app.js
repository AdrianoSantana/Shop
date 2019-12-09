const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const controllerNotFound = require('./controllers/404');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.set('view-engine','ejs'); //Diz ao express para usar engine de renderização dinâmica de template 
app.set('views','views');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRouter);

app.use(controllerNotFound.notFound);

app.listen(3000, () => console.log('running.'));