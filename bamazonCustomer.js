var mysql = require("mysql");
var inquirerResponse = require('inquirer');
var itemID;
var quantityOrdered;
var numberInStock;

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

// Query db and display products 
function displayProducts() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });
  connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    promptCustomer();
  });
};

// Prompt customer for information
function promptCustomer() {
  inquirerResponse.prompt([
    {
      type: "input",
      name: "itemID",
      message: "Enter the ID of the item you would like to purchase:"
    },
    {
      type: "input",
      name: "quantity",
      message: "How many units would you like to purchase?"
    }
  ]).then(function (inquirerResponse) {
    itemID = inquirerResponse.itemID;
    quantityOrdered = inquirerResponse.quantity;
    determineStock();
  });
};


// Query db to determine numer of units in stock 
function determineStock() {
  //var numberInStock;

  connection.query("SELECT stock_quantity FROM products WHERE item_id =" + itemID, function (err, res) {
    if (err) throw err;
    numberInStock = res[0].stock_quantity;
    //processOrder(numberInStock);
    processOrder();
  });
};

function processOrder() {
  //this.itemID = itemID;
  //this.quantityOrdered = quantityOrdered;
  //this.numberInStock = numberInStock;

  if (quantityOrdered > numberInStock) {
    console.log("Sorry, but we are unable to process your order at this time due to insufficient inventory.");
    connection.end();
  } else {
    numberInStock -= quantityOrdered;
    console.log(itemID);
    console.log(quantityOrdered);
    console.log(numberInStock);
    connection.query("UPDATE products SET stock_quantity =" + numberInStock + "WHERE item_id =" + itemID, function (err, res) {
      if (err) throw err;
      connection.end();
    });
  }
};

displayProducts();
