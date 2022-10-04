const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

const product = require("./routes/eventRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", eventsRoute);
app.use("/api/v1", userRoute);

app.use(errorMiddleware);

module.exports = app;