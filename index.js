const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./config/db");

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(bodyParser.json());

app.use("/api/v1", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});
