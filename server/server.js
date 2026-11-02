const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());


// Import routes
const coursesRoute = require("./routes/courses");
const apsRoute = require("./routes/aps");
const universitiesRoute = require("./routes/universities");


// Use routes
app.use("/courses", coursesRoute);
app.use("/aps", apsRoute);
app.use("/universities", universitiesRoute);


// Home route
app.get("/", (req, res) => {
    res.send("Student Platform API is running");
});


// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000")
})