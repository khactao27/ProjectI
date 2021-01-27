var mysql = require('mysql');
const { Db } = require('typeorm');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'phone_db'
})

connection.connect(function(err) {
  if (err) throw err;
  else console.log("Success!");
});
module.exports = connection;