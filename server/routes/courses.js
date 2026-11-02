const express = require("express");
const router = express.Router();
const db = require("../db");




// Get all courses
router.get("/", async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
                courses.id,
                courses.course_name,
                courses.aps_required,
                universities.code,
                universities.name AS university_name
            FROM courses
            JOIN universities
                ON courses.university_id = universities.id
            ORDER BY courses.id
      `);



        const courses = result.rows.map((course) => ({
            id: course.id,
            name: course.course_name,
            aps: course.aps_required,
            code: course.code,
            university_name: course.university_name,
        }));

        res.json(courses);

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});




// Get course by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(
            `
            SELECT
                courses.id,
                courses.course_name,
                courses.aps_required,
                universities.code,
                universities.name AS university_name
            FROM courses
            JOIN universities
                ON courses.university_id = universities.id
            WHERE courses.id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const course = {
            id: result.rows[0].id,
            name: result.rows[0].course_name,
            aps: result.rows[0].aps_required,
            code: result.rows[0].code,
            university_name: result.rows[0].university_name,
        };

        res.json(course);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;