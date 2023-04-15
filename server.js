const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use("/", require("./routes/indexRoute"));
app.use("/inventory", require("./routes/inventoryRoute"));

app.listen(port, () => console.log(`Server Started on PORT:${port}`));
