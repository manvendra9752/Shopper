const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { error } = require("console");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

// Serve images statically
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Image upload route
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Product schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

// Add product route
app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const newProduct = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await newProduct.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Remove product route
app.post("/removeproduct", async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ id: req.body.id });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      name: req.body.name,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all products route
app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      data: user,
      token,
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.password !== req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);

    res
      .status(200)
      .json({ success: true, token, data: user, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//new collection product
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("New collection fetched", newCollection);
  res.send({ success: true, newCollection });
});

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularInWomen = products.slice(0, 4);
  console.log("Popular in women fetched", popularInWomen);
  res.send({ success: true, popularInWomen });
});

// app.get("/products/:id", async (req, res) => {
//   try {
//     const id = req.params.id;

//     const product = await Product.findById(id);
//     if (!product) {
//       return res
//         .status(404)
//         .send({ success: false, message: "Product not found" });
//     }

//     const category = product.category;
//     let relatedProducts = await Product.find({ category });
//     relatedProducts = relatedProducts.filter((p) => p.id.toString() !== id);
//     relatedProducts = relatedProducts.slice(0, 6);

//     console.log("Related products fetched", relatedProducts);
//     res.send({ success: true, relatedProducts });
//   } catch (error) {
//     console.error("Error fetching related products:", error);
//     res.status(500).send({ success: false, message: "Server error" });
//   }
// });

// Middleware to authenticate user
const fetchUser = (req, res, next) => {
  console.log("Fetching user");
  const token = req.header("token");
  console.log("Authenticating", token);
  if (!token) {
    return res.status(401).send({
      errors: "Please authenticate using a valid token",
    });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log("data", data);
    req.user = data.id;
    console.log("lksdjfas", req.user);
    next();
  } catch (error) {
    return res.status(403).send({ errors: "Access denied" });
  }
};

// Creating endpoint for adding product to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Addtocart", req.body);
  // console.log(req.headers.token);
  try {
    // console.log(req.body.itemId);
    //this id comes from token which are stored in req.user == id of user at login time
    // console.log(req.user);
    const user = await User.findOne({ _id: req.user });
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const { itemId } = req.body;

    // Ensure cartData is initialized
    if (!user.cartData) {
      user.cartData = {};
    }
    // Increment the cart item count or initialize it
    user.cartData[itemId] = (user.cartData[itemId] || 0) + 1;
    await User.findOneAndUpdate({ _id: req.user }, { cartData: user.cartData });
    console.log("User saved");
    res.send({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

//creating endpoint to remove product from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removing product from cart");
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    return res.status(404).send({ success: false, message: "User not found" });
  }
  const { itemId } = req.body;
  if (user.cartData && user.cartData[itemId] > 0) {
    user.cartData[itemId]--;
    if (user.cartData[itemId] === 0) {
      delete user.cartData[itemId];
    }
    await User.findOneAndUpdate({ _id: req.user }, { cartData: user.cartData });
    res.send({ success: true, message: "Product removed from cart" });
  }
});

//get cart data
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await User.findOne({ _id: req.user });
  res.send({ success: true, cartData: userData.cartData });
});
// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(`Error: ${error}`);
  }
});
