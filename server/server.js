const app = require("./app");

// Set the server port
const PORT = Number(process.env.PORT || 5000);

// Start the server
app.listen(PORT, () => {
    console.log(`EduPath API is running on port ${PORT}`);
});