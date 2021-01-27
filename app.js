const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const routerHome = require('./routes/home.router');
const routerProduct = require('./routes/product.router');
// const routerUser = require('./routes/user.router');
const routerAuth = require('./routes/auth.router');
const routerAdmin = require('./routes/admin.router');
const routerCart = require('./routes/cart.router');
const authMidleware = require('./middleware/auth.middleware');


const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser());

app.use('/', routerHome);
app.use('/products', routerProduct);
app.use('/auth', routerAuth);
app.use('/admin', routerAdmin);
app.use('/cart',authMidleware.requireAuth, routerCart);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
});