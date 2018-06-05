var mysql = require("mysql");
var inquirerResponse = require("inquirer");

// Prompt manager for information
function promptManager() {
  inquirerResponse.prompt([{
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["view products for sale", "view low inventory", "add inventory", "add new product"]
  }]).then(function (inquirerResponse) {
    var action = inquirerResponse.action;

    if (action === "view products for sale") {
      viewProducts();
    } else if (action === "view low inventory") {
      viewLowInventory();
    } else if (action === "add inventory") {
      getCurrentInventory();
    } else if (action === "add new product") {
      addNewProduct();
    } else {
      console.log("invalid command");
    }
  });
};


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


function viewProducts() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });
  const queryString = "SELECT * FROM products";
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    connection.end();
    console.log(res);
  });

};

function viewLowInventory() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });
  const queryString = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    connection.end();
    console.log(res);
  });

};


function getCurrentInventory() {
  inquirerResponse.prompt([{
      type: "input",
      name: "itemID",
      message: "Enter item ID to update inventory:"
    },
    {
      type: "input",
      name: "units",
      message: "Enter number of units:"
    }
  ]).then(function (inquirerResponse) {
    var itemID = inquirerResponse.itemID;
    var units = parseInt(inquirerResponse.units);
    var currentUnits;

    //determine existing inventory
    connection.connect(function (err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
    });
    const queryString = `SELECT stock_quantity FROM products WHERE item_id=${itemID}`;
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      currentUnits = res[0].stock_quantity;
      currentUnits += units;
      addInventory(itemID, currentUnits);
    });
  });

};

function addInventory(itemID, currentUnits) {
  const queryString = `UPDATE products SET stock_quantity=${currentUnits} WHERE item_id=${itemID}`;
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    connection.end();
  });
};

function addNewProduct() {
  inquirerResponse.prompt([{
      type: "input",
      name: "product",
      message: "Enter product name:"
    },
    {
      type: "input",
      name: "department",
      message: "Enter department:"
    },
    {
      type: "input",
      name: "price",
      message: "Enter unit price:"
    },
    {
      type: "input",
      name: "quantity",
      message: "Enter quantity:"
    }
  ]).then(function (inquirerResponse) {
    var product = inquirerResponse.product;
    var department = inquirerResponse.department;
    var price = inquirerResponse.price;
    var quantity = inquirerResponse.quantity;
    const queryString = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${product}", "${department}", ${price}, ${quantity})`;
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      connection.end();
    });
  });
};

promptManager();