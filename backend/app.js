require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const authRouter = require("./routes/auth");
const devicesRouter = require("./routes/devices");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api", [authRouter, devicesRouter]);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
