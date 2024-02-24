const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const db = require("./config/mongoose");


app.use("/", require("./routes/index"));

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});