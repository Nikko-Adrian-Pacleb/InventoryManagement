const express = require("express");
const router = express.Router();

// Controllers
const inventoryController = require("../controllers/inventoryController");
const inventoryItemController = require("../controllers/inventoryItemController");
const itemTagController = require("../controllers/itemTagController");
const inventoryTransactionController = require("../controllers/inventoryTransactionController");

/// INVENTORY ROUTER ///

// Get all the Models inside the inventory
router.get("/", inventoryController.inventory_get);

/// INVENTORY ITEM ///

// GET request to create InventoryItem
// Render the form for creating a new Inventory Item
router.get(
  "/inventoryitem/create",
  inventoryItemController.create_inventoryitem_get
);

// POST request to crete InventoryItem
// Create a new Inventory Item
router.post(
  "/inventoryitem/create",
  inventoryItemController.create_inventoryitem_post
);

// GET request to delete InventoryItem
router.get(
  "/inventoryitem/:id/delete",
  inventoryItemController.delete_inventoryitem_get
);

// POST request to delete InventoryItem
router.post(
  "/inventoryitem/:id/delete",
  inventoryItemController.delete_inventoryitem_post
);

// GET request to udpate InventoryItem
router.get(
  "/inventoryitem/:id/update",
  inventoryItemController.update_inventoryitem_get
);

// POST request to update InventoryItem
router.post(
  "/inventoryitem/:id/update",
  inventoryItemController.update_inventoryitem_post
);

// GET request to get an InventoryItem
router.get("/inventoryitem/:id", inventoryItemController.inventoryitem_detail);

// GET request to get all the item in the inventory
router.get("/inventoryitems", inventoryItemController.inventoryitem_all);

/// ITEM TAG ///

// GET request for creating Tag
router.get("/itemtag/create", itemTagController.create_itemtag_get);

// POST request for creating Tag.
router.post("/itemtag/create", itemTagController.create_itemtag_post);

// GET request to delete Tag.
router.get("/itemtag/:id/delete", itemTagController.delete_itemtag_get);

// POST request to delete Tag.
router.post("/itemtag/:id/delete", itemTagController.delete_itemtag_post);

// GET request to update Tag.
router.get("/itemtag/:id/update", itemTagController.update_itemtag_get);

// POST request to update Tag.
router.post("/itemtag/:id/update", itemTagController.update_itemtag_post);

// GET request for one Tag.
router.get("/itemtag/:id", itemTagController.itemtag_detail);

// GET request for list of all Tags.
router.get("/itemtags", itemTagController.itemtag_all);

/// INVENTORY TRANSACTION ///

// GET request for creating Inventory Transaction
router.get(
  "/inventorytransaction/create",
  inventoryTransactionController.create_inventorytransaction_get
);

// POST request for creating Inventory Transaction.
router.post(
  "/inventorytransaction/create",
  inventoryTransactionController.create_inventorytransaction_post
);

// GET request to delete Inventory Transaction.
router.get(
  "/inventorytransaction/:id/delete",
  inventoryTransactionController.delete_inventorytransaction_get
);

// POST request to delete Inventory Transaction.
router.post(
  "/inventorytransaction/:id/delete",
  inventoryTransactionController.delete_inventorytransaction_post
);

// GET request to update Inventory Transaction.
router.get(
  "/inventorytransaction/:id/update",
  inventoryTransactionController.update_inventorytransaction_get
);

// POST request to update Inventory Transaction.
router.post(
  "/inventorytransaction/:id/update",
  inventoryTransactionController.update_inventorytransaction_post
);

// GET request for one Inventory Transaction.
router.get(
  "/inventorytransaction/:id",
  inventoryTransactionController.inventorytransaction_detail
);

// GET request for list of all Inventory Transactions.
router.get(
  "/inventorytransactions",
  inventoryTransactionController.inventorytransaction_all
);

module.exports = router;
