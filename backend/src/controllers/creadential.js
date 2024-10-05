const express = require("express");
const admin = require("firebase-admin");

module.exports.user_Login = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.decodedToken.uid);
    const customClaims = userRecord.customClaims;
    console.log(customClaims)
    if (customClaims && customClaims.role) {
      console.log(
        `User with UID '${req.decodedToken.uid}' has role '${customClaims.role}'`
      );
      res.status(200).json({ status: "success", role: customClaims.role });
    } else {
      console.log(
        `User with UID '${req.decodedToken.uid}' does not have any roles assigned`
      );
      res.status(200).json({ status: "success", role:"user" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(400)
      .json({ status: "error", message: "Failed to fetch user data" });
  }
};

module.exports.user_Register = async (req, res) => {
  let customClaims = {};
  const decodedToken = req.decodedToken;
  const { mobileNumber, userType } = req.body;
  console.log(userType);
  if (userType === "diagnosticCenter") {
    customClaims = { role: "diagnostic_center" };
  } else if (userType === "user") {
    customClaims = { role: "normal_user" };
  }
  await admin.auth().setCustomUserClaims(decodedToken.uid, customClaims);
  console.log(
    `User with UID '${decodedToken.uid}' has assigned a role of ${userType}`
  );

  await admin.firestore().collection("User_numbers").doc(decodedToken.uid).set({
    mobileNumber: mobileNumber,
  });
  console.log("Number saved successfully");

  res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
};
