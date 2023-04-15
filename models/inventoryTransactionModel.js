const mongoose = require("mongoose");

const InventoryTransactionSchema = new mongoose.Schema({
  inventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
  },
  transactionType: { type: String, enum: ["add", "remove"], required: true },
  quantity: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now },
});

inventoryTransactionSchema.pre("save", async function (next) {
  try {
    const transaction = this;
    const inventoryItem = await InventoryItem.findById(
      transaction.inventoryItem
    );

    if (!inventoryItem) {
      throw new Error("Inventory item not found");
    }

    if (transaction.transactionType === "add") {
      inventoryItem.count += transaction.quantity;
    } else if (transaction.transactionType === "remove") {
      inventoryItem.count -= transaction.quantity;

      if (inventoryItem.count < 0) {
        throw new Error("Insufficient inventory");
      }
    }

    await inventoryItem.save();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model(
  "InventoryTransaction",
  InventoryTransactionSchema
);
