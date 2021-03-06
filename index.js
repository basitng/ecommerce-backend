const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();

// MIDDLEWARES
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
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
app.use(cors(corsOptions));
app.use(cookieParser());
app.set("view engine", "ejs");

dotenv.config();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.PORT || 5000;

const router = require("./Routes/API/auth");
const AllAPI = require("./Routes/API/endpoints");
app.use("/auth", router);
app.use("/api", AllAPI);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected  Successfully");
    app.listen(PORT, () =>
      console.log(`> ======= Server started at port ${PORT} 👌👌 =========<`)
    );
  })
  .catch((e) => console.log("Server Error", e));
