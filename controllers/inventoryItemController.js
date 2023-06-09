const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const InventoryItem = require("../models/inventoryItemModel");

const debug = require("debug")("iteminventory");

// @desc Get all Inventory Item
// @route GET /inventory/inventoryitems/
// @access Private
exports.inventoryitem_all = asyncHandler(async (req, res, next) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (error) {
    debug(`catch called error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// @desc Get one Item and return the information
// @route GET /inventory/inventoryitem/:id
// @access Private
exports.inventoryitem_detail = asyncHandler(async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.id).populate(
      "tags"
    );
    if (!inventoryItem) {
      debug(`id not found on detail: ${req.params.id}`);
      return res.status(404).json({ error: "Inventory item not found" });
    }
    res.json(inventoryItem);
  } catch (error) {
    debug(`catch called error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

/// !!! Not Yet implemented ///
// @desc Render the form for creating a new Inventory Item
// @route GET /inventory/inventoryitem/create
// @access Private
exports.create_inventoryitem_get = asyncHandler(async (req, res, next) => {
  res.send("GET new Inventory Item not yet implemented");
});

// @desc Create a new Inventory Item
// @route POST /inventory/inventoryitem/create
// @access Private
exports.create_inventoryitem_post = [
  // Validate and Sanitize fields
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
  body("itemCost")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Item cost must be a number"),
  body("itemDescription").optional().isString().trim().escape(),
  body("currentCount").optional().isNumeric(),
  body("tags").optional().isArray(),

  // Process request after validation and sanitazion
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      debug(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new Inventory Object with the escaped and trimmed data
      const newItem = new InventoryItem(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      debug(error.message);
      res.status(400).json({ error: error.message });
    }
  }),
];

/// !!! Not Yet implemented ///
// @desc Delete an Inventory Item
// @route GET /inventory/inventoryitem/:id/delete
// @access Private
exports.delete_inventoryitem_get = (req, res, next) => {
  res.send("Delete Inventory Item not yet implemented");
};

// @desc Delete an Inventory Item
// @route POST /inventory/inventoryitem/:id/delete
// @access Private
exports.delete_inventoryitem_post = asyncHandler(async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.id);
    if (!inventoryItem) {
      // Inventory Item doesnt exist
      debug(`Id not found on delete: ${req.params.id}`);
      res.status(404).json({ error: "Inventory Item not found" });
    }
    // When Inventory Item exist DELETE
    await InventoryItem.findByIdAndDelete(req.params.id);
    res.redirect("/inventory/inventoryitems");
  } catch (error) {
    debuf(error.message);
    res.status(400).json({ error: error.message });
  }
});

/// !!! Not Yet implemented ///
// @desc Update an Inventory Item
// @route GET /inventory/inventoryitem/:id/update
// @access Private
exports.update_inventoryitem_get = (req, res, next) => {
  res.send("Update Inventory Item not yet implemented");
};

/// !!! Not Yet implemented ///
// @desc Update an Inventory Item
// @route POST /inventory/inventoryitem/:id/update
// @access Private
exports.update_inventoryitem_post = [
  // Validate and Sanitize fields
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
  body("itemCost")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Item cost must be a number"),
  body("itemDescription").optional().isString().trim().escape(),
  body("currentCount").optional().isNumeric(),
  body("tags").optional().isArray(),

  // Process request after validation and sanitazion
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      debug(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new Inventory Object with the escaped and trimmed data
      // Add ID
      req.body._id = req.params.id;
      const updateItem = new InventoryItem(req.body);
      await InventoryItem.findByIdAndUpdate(req.params.id, updateItem);
      res.redirect(`/inventory/inventoryitem/${req.params.id}`);
    } catch (error) {
      debug(error.message);
      res.status(400).json({ error: error.message });
    }
  }),
];
