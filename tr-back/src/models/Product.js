const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    nameFR: { type: String, required: false, default: "" },
    nameEN: { type: String, required: false, default: "" },
    nameAR: { type: String, required: false, default: "" },
    pictures: [{ type: String, required: false, default: "" }],
    video: { type: String, required: false, default: "" },
    category: {
      main: { type: String, required: false, default: "Cosmetics" },
      sub: { type: String, required: false, default: "Hair" },
    },
    brand: { type: String, required: false, default: "" },
    price: { type: Number, required: false, default: 0 },
    currency: { type: String, required: false, default: "MAD" },
    oldPrice: { type: Number, required: false, default: 0 },
    stars: { type: Number, required: false, default: 0 },
    sales: { type: Number, required: false, default: 0 },
    discount: { type: Number, required: false, default: 0 },
    genders: [{ type: String, required: false, default: "female" }],
    quantity: { type: Number, required: false, default: 0 },
    descriptionFR: { type: String, required: false, default: "" },
    descriptionEN: { type: String, required: false, default: "" },
    descriptionAR: { type: String, required: false, default: "" },
    bestSeller: { type: String, required: false, default: "false" },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
  }
);


module.exports = mongoose.model("Product", Product);
