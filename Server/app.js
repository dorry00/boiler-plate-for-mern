const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cors());
const configuration = require("./config/key")
app.use(express.json());
app.use(cookieParser());
const userRoute = require("./routes/users");

mongoose
  .connect(configuration.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => console.log(err));

//api routes

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
