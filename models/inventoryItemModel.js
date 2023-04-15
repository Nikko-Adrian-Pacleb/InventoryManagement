const mongoose = require("mongoose");

const InventoryItemSchema = mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemCode: { type: String, required: true },
    itemCost: { type: Number, required: true },
    itemDescription: { type: String, required: false },
    currentCount: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);
