const mongoose = require("mongoose");

// ItemTagSchema
const ItemTagSchema = mongoose.Schema(
  {
    tagName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Export Model
module.exports = mongoose.model("ItemTag", ItemTagSchema);
