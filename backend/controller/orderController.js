const DBConnect = require("../models/dbConnect");

class OrderController {
  static async addOrder(req, res) {
    const db = new DBConnect();
    try {
      // Parse request body
      const requestBody = JSON.parse(req.body.body);
      const { products, quantity, total, status } = requestBody;

      // Parse products and quantities
      const parsedProducts = JSON.parse(products);
      const parsedQuantities = JSON.parse(quantity);
      const parsedTotal = parseFloat(total);

      // Construct order data object
      const orderData = {
        products: parsedProducts,
        quantity: parsedQuantities,
        total: parsedTotal,
        status: status
      };

      // Insert order data into the database
      const orderInsertionResult = await db.insertData("orders", orderData);

      // Check if insertion was successful
      if (!orderInsertionResult || !orderInsertionResult.id) {
        return res.status(500).json({ success: false, message: "Failed to insert order data" });
      }

      // Fetch updated order list
      const updatedOrders = await db.getAllData("orders");

      // Close database connection
      db.closeConnection();

      // Send success response with updated order data
      res.status(201).json({
        success: true,
        message: "Order added successfully",
        data: updatedOrders,
      });
    } catch (error) {
      // Log and handle errors
      console.error("Error adding order:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getOrders(req, res) {
    const db = new DBConnect();
    try {
      // Fetch all orders from the database
      const orders = await db.getAllData("orders");
      // Send success response with orders data
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      // Log and handle errors
      console.error("Error getting orders:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
      // Close database connection
      db.closeConnection();
    }
  }

  static async updateOrderStatus(req, res) {
    const db = new DBConnect();
    try {
      const { orderId, newStatus } = req.body;
     // console.log('update'+ JSON.stringify(req.body))
  
      // Update order status in the database
      const query = `UPDATE orders SET status = $1 WHERE order_id = $2`;
      const values = [newStatus, orderId];
      await db.queryDb(query, values);
  
      res.status(200).json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
      db.closeConnection();
    }
  }
  
}

module.exports = OrderController;
