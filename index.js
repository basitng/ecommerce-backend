const express = require("express");
const dotenv = require("dotenv");
const crypto = require("crypto");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const router = require("./Routes/API/auth");
const AllAPI = require("./Routes/API/endpoints");
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use("/auth", router);
app.use("/api", AllAPI);
app.set("view engine", "ejs");
app.use(cookieParser());
dotenv.config();

// CONFIGURATIONS
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    connectTimeoutMS: 50000,
  })
  .then(() => {
    console.log("Database Connected  Successfully");
    app.listen(PORT, () =>
      console.log(process.env.MONGO_URL, "Server started at port", PORT)
    );
  })
  .catch((e) => console.log("Server Error", e));
