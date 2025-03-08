const dotenv = require("dotenv"); 
const express = require("express");
const mongoose = require("mongoose");
const CoffeeShops = require("./models/coffeeShops.js");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();
//config code
dotenv.config();

//middleware

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//morgan middleware
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.listen(3000, () => {
    console.log("Listening on port 3000");
});