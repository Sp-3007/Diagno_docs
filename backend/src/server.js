const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cred = require("./credential.json");
const creadentialRoutes = require("./routes/creadential");
const diagnostic_centerRoutes = require("./routes/diagnostic_center");
const Test_list = require("./routes/Test_list");
const admin = require("firebase-admin")

const app = express();
const port = 3001;

admin.initializeApp({
  credential: admin.credential.cert(cred),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/credential", creadentialRoutes); // Ensure this is the correct path
app.use("/diagnostic_center", diagnostic_centerRoutes);
app.use("/test_list", Test_list);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
