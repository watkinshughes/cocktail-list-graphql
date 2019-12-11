const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  name: String,
  category: String,
  glass: String,
  garnish: String,
  preparation: String,
  ingredients: String,
  published: Boolean
});

module.exports = mongoose.model("Cocktail", cocktailSchema);
