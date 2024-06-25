const express = require("express");
const cors = require("cors");
const data = require("./data/data");
const accountController = require("./controller/userController");
const productController = require("./controller/productController");
const orderController = require("./controller/orderController");
const DBConnect = require("./models/dbConnect"); // Change import statement
const Initialize = require("./models/initializeDb"); // Import initialize module

const app = express();
app.use(express.json());
app.use(cors());

const connection = new DBConnect(); // Instantiate DBConnect class

connection
  .connectToDb()
  .then(() => {
    console.log("Postgres Database is connected");
    Initialize.dbInitialization();
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

  app.post("/login/submit", async (req, res) => {
    try {
      const result = await accountController.loginUser(req.body.email, req.body.password);
      console.log(JSON.stringify(result)+ "result");
      res.send(result);
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send({ error: "Server error" });
    }
  });

app.post("/register/submit", async (req, res) => {
  try {
    const result = await accountController.registerUser(req.body);
    res.send(result);
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({ error: "Server error" });
  }
});

app.post("/add-product", async (req, res) => {
  try {
    await productController.addProduct(req, res);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ error: "Server error" });
  }
});

app.get("/delete-product/:id", async (req, res) => {
  try {
    await productController.deleteProduct(req, res);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ error: "Server error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    await productController.getProducts(req, res);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).send({ error: "Server error" });
  }
});

app.get("/get-orders", async (req, res) => {
  try {
    await orderController.getOrders(req, res);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).send({ error: "Server error" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    await orderController.addOrder(req, res);
  } catch (error) {
   // console.error("Error placing order:", error);
    //res.status(500).json({ error: "Server error" });
  }
});

app.post("/update-order", async (req, res) => {
  try {
    await orderController.updateOrderStatus(req, res);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send({ error: "Server error" });
  }
});


app.get("/login", (req, res) => {
  res.redirect(data.getFrontendUrl());
});

app.get("/register", (req, res) => {
  res.redirect(data.getFrontendUrl());
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
