
const ConnectDB = require("./db/Dbconfig");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

//database
mongoose.set('strictQuery', true)
ConnectDB();

//server port
const PORT = process.env.PORT || 8000;

//listen port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} `);
});
