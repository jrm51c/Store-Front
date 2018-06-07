var mysql = require("mysql");
var inquirerResponse = require("inquirer");
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
  const queryString = "SELECT item_id, product_name, price FROM products";
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.log(res);
    var productsArray = [];
   for (i=0; i < res.length; i++)  {
     var prod = {
       name: res[i].product_name,
       value: res[i].item_id
     };
     productsArray.push(prod);
    }
    promptCustomer(productsArray);
  });
};

// Prompt customer for information
function promptCustomer(productsArray) {
  inquirerResponse.prompt([/*{
      type: "input",
      name: "itemID",
      message: "Enter the ID of the item you would like to purchase:"
    },*/
    {
      type: "list",
      name: "ID",
      message: "Enter the ID of the item you would like to purchase:",
      choices: productsArray
    },
    {
      type: "input",
      name: "quantity",
      message: "How many units would you like to purchase?"
    }
  ]).then(function (inquirerResponse) {
    itemID = inquirerResponse.ID;
    quantityOrdered = inquirerResponse.quantity;
    determineStock();
  });
};


// Query db to determine numer of units in stock 
function determineStock() {
  const queryString = `SELECT stock_quantity FROM products WHERE item_id=${itemID}`;
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    numberInStock = res[0].stock_quantity;
    console.log("stock " + numberInStock);
    processOrder();
  });
};

function processOrder() {
  if (quantityOrdered > numberInStock) {
    console.log("Sorry, but we are unable to process your order at this time due to insufficient inventory.");
    connection.end();
  } else {
    console.log("Your order has been processed");
    numberInStock -= quantityOrdered;
    const queryString = `UPDATE products SET stock_quantity=${numberInStock} WHERE item_id=${itemID}`;
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      connection.end();
    });
  }
};

/*function selectAll() {
	connection.query("select * from products", function(err, results) {
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);

		}
  });
};*/

displayProducts();
