const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// InventoryItemSchema
const InventoryItemSchema = new Schema(
  {
    itemName: { type: String, required: true },
    itemCode: { type: String, required: true },
    itemCost: { type: Number, required: true },
    itemDescription: { type: String, required: false },
    currentCount: { type: Number, default: 0 },
    tags: [{ type: Schema.Types.ObjectId, ref: "ItemTag" }],
  },
  {
    timestamps: true,
  }
);

// Export Model
module.exports = mongoose.model("InventoryItem", InventoryItemSchema);
