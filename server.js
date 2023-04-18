const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const compression = require("compression");

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use("/", require("./routes/indexRoute"));
app.use("/inventory", require("./routes/inventoryRoute"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on PORT:${port}`));
