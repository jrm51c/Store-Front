# Store-Front
Amazon-like storefront that accepts orders from customers and depletes stock from the store's inventory.

# Customer Role
* Running the bamazonCustomer application will first display all the products contained in the products table
* Customer will be prompted with 2 messages:
* The first message asks customer to enter the ID of the product they would like to buy
* The second message asks customer how many units of the product they would like to buy
* Application checks to see if there is enough product inventory to fill order
* If enough inventory exists, order is processed and product stock quantity is updated
* If enough inventory does not exist, customer is informed order can not be processed

# Manager Role
* Running the bamazonManager application will first prompt the manager to determine what they want to do
  * List a set of menu options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
* If manager selects view products for sale the application displays all the products contained in the products table
* If manager selects view low inventory the application displays all products with an inventory count lower than five
* If manager selects add to inventory the application prompts manager to determine which product they want to "add more" of and updates the stock    quantity for that product in the db
* If manager selects add new product the application prompts manager for new product information and inserts the new product into the db
