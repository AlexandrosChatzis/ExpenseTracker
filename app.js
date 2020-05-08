const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv/config");
const app = express();

//use public folder
// app.use(express.static("public"));

//Body Parser AKA CRSF
const bodyParser = require("body-parser");
//cors connects domains for access
app.use(cors());
//Import Routes
const expensesRoute = require("./routes/expenses");

const usersRoute = require("./routes/users");

//Middlewares

//cors connects domains for access

//API JSON PARSER
app.use(bodyParser.json());

//ROUTES

app.use("/", usersRoute);

app.use("/expenses", expensesRoute);

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("connection granted");
  }
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
//listening
app.listen(port);
