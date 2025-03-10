const dotenv = require("dotenv"); 
const express = require("express");
const mongoose = require("mongoose");
const CoffeeShops = require("./models/coffeeShops.js");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');
const app = express();

//config code
dotenv.config();

//middleware

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'css')));

//morgan middleware
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });


//path to a page with a form
app.get("/coffeeShops/new", (req, res) => {
    res.render("coffeeShops/new.ejs");
  });
  
// POST /fruits
app.post("/coffeeShops", async (req, res) => {
    if (req.body.goodForStudying === "on") {
        req.body.goodForStudying = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await CoffeeShops.create(req.body);
    res.redirect("/coffeeShops");
});


//index route, designed to show our list of fruits
app.get("/coffeeShops", async (req, res) => {
    const allCoffeeShops = await CoffeeShops.find({});
    //pass to render a context object, gives the page the information it needs
    res.render("coffeeShops/index.ejs", { coffeeShops: allCoffeeShops });
});

//show fruit for individual fruits
app.get("/coffeeShops/:coffeeShopId", async (req, res) => {
    const foundCoffeeShop = await CoffeeShops.findById(req.params.coffeeShopId);
    res.render("coffeeShops/show.ejs", { coffeeShop: foundCoffeeShop });
  });
  
app.delete("/coffeeShops/:coffeeShopId", async (req, res) => {
await CoffeeShops.findByIdAndDelete(req.params.coffeeShopId);
res.redirect("/coffeeShops");
});

app.get("/coffeeShops/:coffeeShopId/edit", async (req, res) => {
    const foundCoffeeShop = await CoffeeShops.findById(req.params.coffeeShopId);
    res.render("coffeeShops/edit.ejs", { coffeeShop: foundCoffeeShop });
  });
  
  //update route used to capture edit form submissions from the client and send updates to mongoDB
app.put("/coffeeShops/:coffeeShopId", async (req, res) => {
    if (req.body.goodForStudying == "on") {
      req.body.goodForStudying = true;
    } else {
      req.body.goodForStudying = false;
    }
    //update the fruit in the database
    await CoffeeShops.findByIdAndUpdate(req.params.coffeeShopId, req.body);
    res.redirect(`/coffeeShops/${req.params.coffeeShopId}`);
});
  

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
