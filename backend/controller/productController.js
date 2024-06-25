const { json } = require("express");
const dbConnect = require("../models/dbConnect");
const multer = require("multer");

class ProductController {
  static async addProduct(req, res) {
    const db = new dbConnect();
    try {
      const imgNames = [];


      const fileStorageEngine = multer.diskStorage({
        destination: "./uploads", // Ensure the directory exists
        filename: (req, file, cb) => {
          const newFileName = new Date().getTime().toString() + "_" + file.originalname;
          imgNames.push(newFileName); // Store the filenames for product images
          cb(null, newFileName);
        },
      });

      const upload = multer({ storage: fileStorageEngine }).fields([
        { name: "file", maxCount: 1 },
        { name: "files", maxCount: 10 },
      ]);

      upload(req, res, async function (err) {
        if (err) {
          console.error("Error uploading files:", err);
          return res.status(400).json({ success: false, message: "File upload failed" });
        }

        // Extract product data from request body
        const { title, price, previous_price, quantity, description } = req.body;
        console.log("-----"+ imgNames+"------" + JSON.stringify(req.body))

        // Insert product data into the database
        const productData = {
          title,
          price,
          previous_price,
          quantity,
          description
        };
        console.log("productdata --- "+ JSON.stringify(productData));
        const productInsertionResult = await db.insertData('products', productData);
       
       // const productInsertionResult = await db.insertData('products', productData);

        // Insert product images into the database
        for (const imgName of imgNames) {
          await db.queryDb("INSERT INTO products_images SET ?", {
            product_id: productInsertionResult.insertId,
            image: imgName,
          });
        }

        // Fetch updated product list
        const updatedProducts = await db.getAllData("products");

        

        db.closeConnection();

        res.status(201).json({ success: true, message: "Product added successfully", data: updatedProducts });
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getProducts(req, res) {
    const db = new dbConnect();
    try {
        const products = await db.getAllData('products');
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
        db.closeConnection();
    }
  }

  static async deleteProduct(req, res) {
    const db = new dbConnect();
    try {
      const productId = req.params.id;
      // Delete the product from the database
      await db.queryDb(`DELETE FROM products WHERE id = ${productId}`);

      // Fetch updated product list
      const updatedProducts = await db.getAllData("products");

      db.closeConnection();

      res.status(200).json({ success: true, message: "Product deleted successfully", data: updatedProducts });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  // Implement other methods as required
}

module.exports = ProductController;
