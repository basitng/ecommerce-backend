const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
var cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./Routes/API/auth");
const AllAPI = require("./Routes/API/endpoints");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.MONGO_URL],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/auth", router);
app.use("/api", AllAPI);

dotenv.config();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected  Successfully");
    app.listen(PORT, () =>
      console.log(`> ======= Server started at port ${PORT} =========<`)
    );
  })
  .catch((e) => console.log("Server Error", e));
