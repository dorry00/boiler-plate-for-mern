const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cors());

app.use(cookieParser());
const authRoute = require("./routes/auth");
app.use(express.json());
// mongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => console.log(err));

//api routes

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
