export const validateSignUp = (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      error: true,
      message: "Username, password and email are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 6 characters long",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: true,
      message: "Please provide a valid email address",
    });
  }

  next();
};

export const validateSignIn = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: "Username and password are required",
    });
  }

  next();
};
