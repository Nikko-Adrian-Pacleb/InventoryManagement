const express = require("express");
const router = express.Router();

// Controllers
const inventoryController = require("../controllers/inventoryController");

// Inventory Router
router.get("/", inventoryController.inventory_get);

module.exports = router;
