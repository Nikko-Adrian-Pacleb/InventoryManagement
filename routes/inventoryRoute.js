const express = require("express");
const router = express.Router();

// Controllers
const inventoryController = require("../controllers/inventoryController");

/// INVENTORY ROUTER ///

// Get all the 'InventoryItems' inside the inventory
router.get("/", inventoryController.inventory_get);

/// INVENTORY ITEM ///

// Render the form for creating a new Inventory Item
router.get(
  "/inventoryitem/create",
  inventoryController.create_inventoryitem_get
);

// Create a new Inventory Item
router.post(
  "/inventoryitem/create",
  inventoryController.create_inventoryitem_post
);

module.exports = router;
