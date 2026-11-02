const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("APS API is working");
});


// Calculate APS score for a course
router.post("/calculate", (req, res) => {
    const {marks} = req.body;

    if (!marks || !Array.isArray(marks)) {
        return res.status(400).json({message: "Marks must be an array"});
    }


    // Simple APS calculation (sum of marks / 10)
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const aps = Math.floor(total / marks.length / 10);

    res.json({
        apsScore: aps
    });
});

module.exports = router;