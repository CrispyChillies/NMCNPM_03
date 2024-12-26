export const validateSignUp = (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    citizenId,
    email,
    phoneNumber,
    userAddress,
  } = req.body;

  // Check if all required fields are present
  if (
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !citizenId ||
    !email ||
    !phoneNumber ||
    !userAddress
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Validate password strength (at least 8 characters)
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  // Validate phone number (basic format)
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number format",
    });
  }

  next();
};

export const validateSignIn = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  next();
};
