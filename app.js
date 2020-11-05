const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
});