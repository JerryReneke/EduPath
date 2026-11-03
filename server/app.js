require("./config/env");

const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import API routes
const coursesRoute = require("./routes/courses");
const apsRoute = require("./routes/aps");
const universitiesRoute = require("./routes/universities");

// Register API routes
app.use("/courses", coursesRoute);
app.use("/aps", apsRoute);
app.use("/universities", universitiesRoute);

// Home route
app.get("/", (req, res) => {
    res.send("EduPath API is running");

// Central error handler
app.use(errorHandler);
});

module.exports = app;
