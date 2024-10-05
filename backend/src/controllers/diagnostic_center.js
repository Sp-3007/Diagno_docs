const admin = require("firebase-admin");

const create_Test = async (req, res) => {
  res.send("This is the test creation page");
};

const addDiagnosticCenter_details = async (req, res) => {
  const {
    centerName,
    registrationNumber,
    contactPerson,
    address,
    city,
    insuranceAccepted,
    latitude,
    longitude,
  } = req.body;

  if (
    !centerName ||
    !registrationNumber ||
    !contactPerson ||
    !address ||
    !city ||
    !insuranceAccepted
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // const { uid } = req.decodedToken; // Get the UID from the decoded token

  try {
    const firestore = admin.firestore();
    const docRef = firestore
      .collection("Diagnostic_center")
      .doc("r7QrCUgMD8qzVJe5BDm2"); // Use UID as document ID
    await docRef.set({
      centerName,
      registrationNumber,
      contactPerson,
      address,
      city,
      insuranceAccepted,
      latitude,
      longitude,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(201).json({ message: "Data Added Successfully" });
  } catch (error) {
    console.error("Error adding document: ", error);
    return res.status(500).json({ message: "Error adding Data" });
  }
};

module.exports = { addDiagnosticCenter_details, create_Test };
