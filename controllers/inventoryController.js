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

// @desc Render the form for creating a new Inventory Item
// @route GET /inventory/createitem
// @access Private
exports.create_inventoryitem_get = asyncHandler(async (req, res, next) => {
  res.send("GET new Inventory Item not yet implemented");
});

// @desc Create a new Inventory Item
// @route POST /inventory/createitem
// @access Private
exports.create_inventoryitem_post = [
  body("itemName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Item Name must be specified"),
  body("itemCode")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Item Code must be specified"),
  body("itemCost").isNumeric().withMessage("Item cost must be a number"),
  body("itemDescription").optional().isString().trim().escape(),
  body("currentCount").optional().isNumeric(),
  body("tags").optional().isArray(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newItem = new InventoryItem(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }),
];
