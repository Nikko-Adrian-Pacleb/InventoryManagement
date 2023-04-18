const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);
app.use(compression());

app.use("/", require("./routes/indexRoute"));
app.use("/inventory", require("./routes/inventoryRoute"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on PORT:${port}`));
