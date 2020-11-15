const express = require('express');
const bodyParser = require('body-parser');
const routerHome = require('./routes/home.router');
const routerProduct = require('./routes/product.router');
// const routerUser = require('./routes/user.router');
const routerLogin = require('./routes/login.router');
const routerAdmin = require('./routes/admin.router');
const routerCart = require('./routes/cart.router');


const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.use('/', routerHome);
app.use('/product', routerProduct);
// app.use('/user', routerUser);
app.use('/login', routerLogin);
app.use('/admin', routerAdmin);
app.use('/cart', routerCart);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
});