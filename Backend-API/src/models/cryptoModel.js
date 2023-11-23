const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    exchange_id: { type: String, require: true },
    website: { type: String },
    volume_1hrs_usd: { type: Number },
    volume_1day_usd: { type: Number },
    volume_1mth_usd: { type: Number },
    icon_url: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("crypto", cryptoSchema);
