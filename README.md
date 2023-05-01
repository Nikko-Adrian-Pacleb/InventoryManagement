# InventoryManagement
 Local Inventory Management created with express framwork and MongoDB<br/>

# How it's made
If you are interested in creating your own Local Inventory Management App, this part of the .md will guide you through my process of creating the app. 

## Object and Models
For simplicity, I used only 3 models with very non-detailed fields for each model <br/>
**Models:**<br/>
* InventoryItemModel
* InventoryTransactionModel
* InventoryTagModel

the code below are implemented with mongoose.

### InventoryItemModel
Inventory Item is the object containing the details of each item in the inventory. It also include the count we have for the current. <br/>

**NOTE:** If you want to separate the count from the item, you can also create a new model that acts as an instance of an item. By doing this, you can also track each instance of the item that you will have.<br/>
FIELDS:
```js
itemName: { type: String, required: true }, /// Item Name
itemCode: { type: String, required: true }, /// Item Code
itemCost: { type: Number, required: true }, /// If you want to add cost computations, I recommend adding a cost field
itemDescription: { type: String, required: false }, /// A short description for the item
currentCount: { type: Number, default: 0 }, /// Track the item count of the item
tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemTag" }], /// Tags are recommended if you have multiple item types
```
 ### InventoryTransactionModel
 Creating a separate model for an inventory transaction allows us to track the transactions made during a certain amount of time.<br/>
 FIELDS:
 ```js
 inventoryItem: { /// The ID of an item we want to make the transaction to
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
 },
 transactionType: { type: String, enum: ["add", "remove"], required: true }, /// Decides whether we want to add or remove items in the inventory
 quantity: { type: Number, required: true }, /// The count of the item we want to add or remove to the inventory item model
 transactionDate: { type: Date, default: Date.now }, /// Tracks when the transaction happened
 ```
 The model should also handle changing the value of the inventory item to simplify the code. This can be done by adding a pre save function
 ```js
 InventoryTransactionSchema.pre("save", async function (next) {
  try {
    // Check if the request is a creation of a new Transactio or an Update
    if (this.isNew) {
      const transaction = this;
      const inventoryItem = await InventoryItem.findById(
        transaction.inventoryItem
      );

      if (!inventoryItem) {
        // If Invenotry Item Doesnt Exist
        throw new Error("Inventory item not found");
      }

      // Check what transaction type is requested
      if (transaction.transactionType === "add") {
        inventoryItem.currentCount += transaction.quantity;
      } else if (transaction.transactionType === "remove") {
        inventoryItem.currentCount -= transaction.quantity;

        if (inventoryItem.currentCount < 0) {
          throw new Error("Insufficient inventory");
        }
      }
      await inventoryItem.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});
 ```
 **NOTE:** The pre save function wont run when we update an inventorytransaction object. So changes made to the inventory item wont be reverted or adjusted</br>
 
 ### InventoryTagModel
 A simple name field can be used to craete a sort and/or filter function for your app. Implementing a tag to the inventory item is very simple. <br/>
 FIELDS:
 ```js
 tagName: { type: String, required: true },
 ```
 Each tags are then saved as an array in the inventory item model.
 
# License 
MIT
