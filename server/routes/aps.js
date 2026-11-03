
const express = require("express");
const router = express.Router();

// APS API homepage
router.get("/", (req, res) => {
    res.send("APS API is working");
});

// Calculate APS score for a course
router.post("/calculate", (req, res) => {
    const { marks } = req.body || {};

    // Validate marks array
    if (!Array.isArray(marks) || marks.length === 0) {
        return res.status(400).json({
            message: "Marks must be a non-empty array"
        });
    }

    // Validate individual marks
    const invalidMarks = marks.some(
        (mark) =>
            typeof mark !== "number" ||
            !Number.isFinite(mark) ||
            mark < 0 ||
            mark > 100
    );

    if (invalidMarks) {
        return res.status(400).json({
            message: "All marks must be numbers between 0 and 100"
        });
    }

    // TEMPORARY calculation formula.
    // This will be replaced by the university-specific APS engine.
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const aps = Math.floor(total / marks.length / 10);

    res.json({
        apsScore: aps
    });
});

module.exports = router;
