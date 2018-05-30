var mysql = require("mysql");
var inquirerResponse = require('inquirer');

// Prompt manager for information
function promptManager() {
    inquirerResponse.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you lie to do?",
        choices: ["view products for sale", "view low inventory", "add to inventory", "add new product"]
      }
    ]).then(function (inquirerResponse) {
      var action = inquirerResponse.action;

      if (action === "view products for sale") {
        viewProducts();
      } else if (action === "view low inventory") {
        viewLowInventory();
      } else if (action === "add to inventory")  {
        addInventory();
      } else if (action === "add new product")  {
        addNewProduct();
      } else    {
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


  function viewProducts()   {
    connection.connect(function (err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
    });
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      connection.end();
      console.log(res);
    });

  };

  function viewLowInventory()   {
    connection.connect(function (err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
    });
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
      if (err) throw err;
      connection.end();
      console.log(res);
    });

  };

  function addInventory()   {

  };

  function addNewProduct()  {

  };

  promptManager();