var mysql = require("mysql");
var inquirerResponse = require('inquirer');

// Connect to db
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Enkidu#1969",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});

// Query db and display products 
function displayProducts() {
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
    queryCustomer();
  });
}

// Prompt user for information
function queryCustomer()    {
    inquirerResponse.prompt([

        {
          type: "input",
          name: "productID",
          message: "Enter the product ID of the item you would like to purchase"
        },
        {
          type: "input",
          name: "quantity",
          message: "How many units would you like to purchase?"
        }
      ]).then(function (inquirerResponse) {
        var productID = inquirerResponse.productID;
        var quantity = inquirerResponse.quantity;
      });
      console.log(productID);
      console.log(quantity);

};
