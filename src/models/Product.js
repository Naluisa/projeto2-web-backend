const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    photo: String,
    model: String,
    price: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Product", ProductSchema);
