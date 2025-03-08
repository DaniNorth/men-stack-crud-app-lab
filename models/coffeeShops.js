// models/fruit.js

const mongoose = require('mongoose');

const coffeeShopSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  description: String,
  goodForStudying: Boolean,
});

const CoffeeShops = mongoose.model("CoffeeShop", coffeeShopSchema); 


module.exports = CoffeeShops;
