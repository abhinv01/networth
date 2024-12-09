const jwt = require("jsonwebtoken");

const jwtValidation = (req, res, next) => {
  const authKey = req.headers["authorization"];
  if (!authKey)
    return res
      .status(403)
      .json({ message: "unauthorised jwt token", success: false });

  try {
    const decodedData = jwt.verify(authKey, process.env.JWT_SECRET);
    console.log(decodedData);

    req.user = decodedData;
    next();
  } catch (error) {
    res.status(403).json({ message: "unauthorised jwt token", success: false });
  }
};

module.exports = { jwtValidation };
