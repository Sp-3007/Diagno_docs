const admin = require("firebase-admin");

const authenticateUser = async (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(idToken.replace("Bearer ", ""));
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateUser;
