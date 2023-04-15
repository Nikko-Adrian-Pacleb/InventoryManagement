const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/indexRoute"));
app.use("/inventory", require("./routes/inventoryRoute"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on PORT:${port}`));
