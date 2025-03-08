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

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
