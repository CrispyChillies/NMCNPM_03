const pool = require("../config/database");
const jwtHelper = require("../helpers/jwtHelper");

const cartController = {
  getCartInfo: async (req, res) => {
    try {
      // Get user ID from JWT token
      const userId = req.user.id;

      // Query to get cart items with product details
      const query = `
        SELECT c.id, c.quantity, p.name, p.price, p.image_url 
        FROM Users u 
        JOIN Cart c ON u.CartId = Cart.CartId
        JOIN Product p ON c.productId = p.id
        WHERE c.user_id = ? AND c.status = 'active'
      `;

      const [cartItems] = await pool.execute(query, [userId]);

      // Calculate total
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return res.status(200).json({
        success: true,
        data: {
          items: cartItems,
          total: total,
        },
      });
    } catch (error) {
      console.error("Get cart error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

module.exports = {
  cartController,
};
