const express = require("express");
const router = express.Router();
const diagnostic_center = require("../controllers/diagnostic_center");
const authenticateUser = require("../middleware/authenticate_user");
const diagnosticAuth = require("../middleware/diagnostic_auth");

router.post(
  "/test",
  authenticateUser,
  diagnosticAuth,
  diagnostic_center.create_Test
);

router.post(
  "/details",
  diagnostic_center.addDiagnosticCenter_details
);

module.exports = router;
