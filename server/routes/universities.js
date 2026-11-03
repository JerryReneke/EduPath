const express = require("express");
const router = express.Router();
const db = require("../db");


// Get all universities
router.get("/", async(req, res, next) => {
    try {
        const result = await db.query("SELECT * FROM universities ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});




//Get one university by code
router.get("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;

        const result = await db.query(
            "SELECT * FROM universities WHERE code = $1",
            [code]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "University not found"
            });
        }

        const university = result.rows[0];

        const coursesResult = await db.query(
            `SELECT id, course_name, aps_required
            FROM courses
            WHERE university_id = $1
            ORDER BY course_name`,
            [university.id]
        );


        university.courses = coursesResult.rows.map((course) => ({
            id: course.id,
            name: course.course_name,
            aps: course.aps_required,
        }));

        res.json(university);

    } catch (err) {
        next(err);
    }
});


module.exports = router;