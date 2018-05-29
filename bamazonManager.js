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


  function viewProducts()   {

  };

  function viewLowInventory()   {

  };

  function addInventory()   {

  };

  function addNewProduct()  {

  };

  promptManager();