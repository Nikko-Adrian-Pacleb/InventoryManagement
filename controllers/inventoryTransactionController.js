const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const InventoryTransaction = require("../models/inventoryTransactionModel");
const InventoryItem = require("../models/inventoryItemModel");

// @desc Get all Inventory Transactions
// @route GET /inventory/inventorytransaction/
// @access Private
exports.inventorytransaction_all = asyncHandler(async (req, res, next) => {
  try {
    const inventoryTransactions = await InventoryTransaction.find();
    res.json(inventoryTransactions);
  } catch (error) {
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
      return res.status(404).json({ error: "Inventory item not found" });
    }
    res.json(inventoryTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const inventoryItem = await InventoryItem.findById(
        req.body.inventoryItem
      );
      if (!inventoryItem) {
        return res.status(404).json({ error: "Inventory item not found" });
      }

      const newInventoryTransaction = new InventoryTransaction(req.body);
      await newInventoryTransaction.save();
      res.status(201).json(newInventoryTransaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }),
];

// @desc Delete an Inventory Transaction
// @route GET /inventory/inventorytransaction/:id/delete
// @access Private
exports.delete_inventorytransaction_get = (req, res, next) => {
  res.send("Delete Inventory Transaction not yet implemented");
};

// @desc Delete an Inventory Transaction
// @route POST /inventory/inventorytransaction/:id/delete
// @access Private
exports.delete_inventorytransaction_post = (req, res, next) => {
  res.send("Delete Inventory Transaction not yet implemented");
};

// @desc Update an Inventory Transaction
// @route GET /inventory/inventorytransaction/:id/update
// @access Private
exports.update_inventorytransaction_get = (req, res, next) => {
  res.send("Update Inventory Transaction not yet implemented");
};

// @desc Update an Inventory Transaction
// @route POST /inventory/inventorytransaction/:id/update
// @access Private
exports.update_inventorytransaction_post = (req, res, next) => {
  res.send("Update Inventory Transaction not yet implemented");
};
