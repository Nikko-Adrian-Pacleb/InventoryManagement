const asyncHandler = require("express-async-handler");

// @desc Get the overview of the inventory
// @route GET /inventory
// @access Private
exports.inventory_get = asyncHandler(async (req, res, next) => {
  res.send("Get Inventory not yet implemented");
});
