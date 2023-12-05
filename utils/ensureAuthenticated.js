const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "unauthorized plz login" });
  }

  try {
    const decoded = jwt.verify(
      req.headers["authorization"],
      process.env.SECRET
    );

    return next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Authorization token is expired  " });
  }
};

module.exports = ensureAuthenticated;
