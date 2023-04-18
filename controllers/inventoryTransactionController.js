const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const InventoryTransaction = require("../models/inventoryTransactionModel");
const InventoryItem = require("../models/inventoryItemModel");

const debug = require("debug")("inventorytransaction");

// @desc Get all Inventory Transactions
// @route GET /inventory/inventorytransaction/
// @access Private
exports.inventorytransaction_all = asyncHandler(async (req, res, next) => {
  try {
    const inventoryTransactions = await InventoryTransaction.find();
    res.json(inventoryTransactions);
  } catch (error) {
    debug(error.message);
    res.status(400).json({ error: error.message });
  }
});

// @desc Get one Inventory Transaction and return the information
// @route GET /inventory/inventorytransaction/:id
// @access Private
exports.inventorytransaction_detail = asyncHandler(async (req, res, next) => {
  try {
    const inventoryTransaction = await InventoryTransaction.findById(
      req.params.id
    );
    if (!inventoryTransaction) {
      debug(`id not found on detail: ${req.params.id}`);
      return res.status(404).json({ error: "Inventory Transaction not found" });
    }
    res.json(inventoryTransaction);
  } catch (error) {
    debug(error.message);
    res.status(400).json({ error: error.message });
  }
});

/// !!! Not Yet implemented ///
// @desc Render the form for creating a new Inventory Transaction
// @route GET /inventory/inventorytransaction/create
// @access Private
exports.create_inventorytransaction_get = asyncHandler(
  async (req, res, next) => {
    res.send("GET new Inventory Transaction not yet implemented");
  }
);

// @desc Create a new Inventory Transaction
// @route POST /inventory/inventorytransaction/create
// @access Private
exports.create_inventorytransaction_post = [
  // Validate and Sanitize fields
  body("inventoryItem")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Iventory Item must be specified"),
  body("transactionType")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isIn(["add", "remove"])
    .withMessage("Transaction Type must be 'add' or 'remove'"),
  body("quantity")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("transactionDate").optional().isISO8601().toDate(),

  // Process request after validation and sanitazion
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      debug(errors.array);
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const inventoryItem = await InventoryItem.findById(
        req.body.inventoryItem
      );
      if (!inventoryItem) {
        // Inventory Item is not found
        debug(`id not found on create: ${req.params.id}`);
        return res.status(404).json({ error: "Inventory item not found" });
      }

      const newInventoryTransaction = new InventoryTransaction(req.body);
      await newInventoryTransaction.save();
      res.status(201).json(newInventoryTransaction);
    } catch (error) {
      debug(error.message);
      res.status(400).json({ error: error.message });
    }
  }),
];

/// !!! Not Yet implemented ///
// @desc Delete an Inventory Transaction
// @route GET /inventory/inventorytransaction/:id/delete
// @access Private
exports.delete_inventorytransaction_get = (req, res, next) => {
  res.send("Delete Inventory Transaction not yet implemented");
};

// @desc Delete an Inventory Transaction
// Inventory Transaction delete wont revert changes on Inventory Item
// @route POST /inventory/inventorytransaction/:id/delete
// @access Private
exports.delete_inventorytransaction_post = asyncHandler(
  async (req, res, next) => {
    try {
      const inventoryTransaction = await InventoryTransaction.findById(
        req.params.id
      );
      if (!inventoryTransaction) {
        // Inventory Transaction not found
        debug(`id not found on delete: ${req.params.id}`);
        return res.status(404).json({ error: "Inventory item not found" });
      }
      // Try to delete Inventory Transaction
      await InventoryTransaction.findByIdAndDelete(req.params.id);
      res.redirect("/inventory/inventorytransactions");
    } catch (error) {
      debug(error.message);
      res.status(400).json({ error: error.message });
    }
  }
);

/// !!! Not Yet implemented ///
// @desc Update an Inventory Transaction
// @route GET /inventory/inventorytransaction/:id/update
// @access Private
exports.update_inventorytransaction_get = (req, res, next) => {
  res.send("Update Inventory Transaction not yet implemented");
};

// @desc Update an Inventory Transaction
// Inventory Transaction delete wont revert changes on Inventory Item
// @route POST /inventory/inventorytransaction/:id/update
// @access Private
exports.update_inventorytransaction_post = [
  // Validate and Sanitize fields
  body("inventoryItem")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Iventory Item must be specified"),
  body("transactionType")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isIn(["add", "remove"])
    .withMessage("Transaction Type must be 'add' or 'remove'"),
  body("quantity")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("transactionDate").optional().isISO8601().toDate(),

  // Process request after validation and sanitazion
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      debug(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const inventoryItem = await InventoryItem.findById(
        req.body.inventoryItem
      );
      if (!inventoryItem) {
        // Inventory Item is not found
        debug(`id not found on update: ${req.params.id}`);
        return res.status(404).json({ error: "Inventory item not found" });
      }

      // Add the original id
      req.body._id = req.params.id;

      // Create new Inventory Transaction
      const updateInventoryTransaction = new InventoryTransaction(req.body);
      // Update Inventory Transaction
      await InventoryTransaction.findByIdAndUpdate(
        req.params.id,
        updateInventoryTransaction
      );
      res.redirect(`/inventory/inventorytransaction/${req.params.id}`);
    } catch (error) {
      debug(error.message);
      res.status(400).json({ error: error.message });
    }
  }),
];
