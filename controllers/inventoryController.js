const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const InventoryItem = require("../models/inventoryItemModel");

// @desc Get the overview of the inventory
// @route GET /inventory
// @access Private
exports.inventory_get = asyncHandler(async (req, res, next) => {
  const inventoryItems = await InventoryItem.find();
  res.status(200).json(inventoryItems);
});
