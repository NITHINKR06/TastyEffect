const express = require("express");
const ConnectToMongo = require("./db");
const cors = require("cors");
const nodemailer = require('nodemailer');

ConnectToMongo();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./Routes/user_routes"));
app.use("/api/admin", require("./Routes/admin_routes"));

app.use("/api/recipe", require("./Routes/recipe_router"));
app.use("/uploads/recipe", express.static("./uploads/recipeImage"));

app.use("/uploads/user", express.static("./uploads/User"));
app.use("/uploads/admin", express.static("./uploads/Admin"));

app.use("/api/reviews", require("./Routes/reviews_router"));
app.use("/api/savedrecipe", require("./Routes/savedrecipe_routes"));
app.use("/api/userresponse", require("./Routes/Varificatiion_router"));

app.use("/api/recipeComments", require("./Routes/reviews_router"));
app.use("/api/feedback", require("./Routes/Feedback_router"));

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
