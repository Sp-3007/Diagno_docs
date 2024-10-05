const admin = require("firebase-admin");

const diagnosticAuth = async (req, res, next) => {
  try {
    const userRecord = await admin.auth().getUser(req.decodedToken.uid);
    const customClaims = userRecord.customClaims;

    if (customClaims && customClaims.role === "diagnostic_center") {
      console.log(
        `User with UID '${req.decodedToken.uid}' has role '${customClaims.role}' and has access to this resource`
      );
      next();
    } else {
      console.log(
        `User with UID '${req.decodedToken.uid}' does not have access to this resource`
      );
      res.status(403).json({ error: "You Can not access this resource" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(400).json({ error: "Bad Request" });
  }
};

module.exports = diagnosticAuth;
