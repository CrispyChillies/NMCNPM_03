const sql = require("mssql");
const { connectDB } = require("../config/database");

const submitSellerRequest = async (req, res) => {
  const {
    userId,
    email,
    phoneNumber,
    businessAddress,
    businessName,
    productDescription,
    address,
    date,
    status,
  } = req.body;

  try {
    await connectDB();

    // Check if user already has a pending request
    const existingRequest = await sql.query`
      SELECT requestId FROM BecomeSellerRequest 
      WHERE userId = ${userId} AND status = 'pending'
    `;

    if (existingRequest.recordset.length > 0) {
      return res
        .status(400)
        .json({ error: "You already have a pending request" });
    }

    // Insert new request
    const result = await sql.query`
      INSERT INTO BecomeSellerRequest (
        userId, email, phoneNumber, businessAddress, 
        businessName, productDescription, address, date, status
      )
      VALUES (
        ${userId}, ${email}, ${phoneNumber}, ${businessAddress},
        ${businessName}, ${productDescription}, ${address}, ${date}, ${status}
      )
    `;

    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Failed to submit seller request: ", err);
    if (err.message.includes("UNIQUE")) {
      res
        .status(400)
        .json({ error: "Email already registered for seller request" });
    } else {
      res.status(500).json({ error: "Failed to submit request" });
    }
  }
};

module.exports = {
  submitSellerRequest,
};
