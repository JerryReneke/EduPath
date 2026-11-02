import { useEffect, useState } from "react";
import { getCourses } from "../api";

function Courses({ apsScore }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showEligibleOnly, setShowEligibleOnly] = useState(false);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    // Search courses
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
    );

    // Filter eligible courses
    const eligibleCourses = filteredCourses.filter((course) => {
        if (apsScore === null) return true;
        return apsScore >= course.aps;
    });

    console.log("Courses:", courses);

    if (loading) return <p>Loading courses...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Courses (From Backend API)</h2>

            <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <p>Searching for: {search}</p>
            <p>Total courses loaded: {courses.length}</p>
            <p>Courses found: {filteredCourses.length}</p>

            <p>
                {showEligibleOnly
                    ? "Showing only courses you qualify for"
                    : "Showing all courses"}
            </p>

            {/* Checkbox appears only once */}
            <label style={{ display: "block", margin: "20px 0" }}>
                <input
                    type="checkbox"
                    checked={showEligibleOnly}
                    onChange={(e) => setShowEligibleOnly(e.target.checked)}
                />
                {" "}Show only courses I qualify for
            </label>

            {/* Course list */}
            <ul>
                {(showEligibleOnly ? eligibleCourses : filteredCourses).map((course) => (
                    <li key={course.id}>
                        <strong>{course.name}</strong> - APS: {course.aps}

                        {apsScore !== null && (
                            <>
                                {" - "}
                                {apsScore >= course.aps
                                    ? "Eligible"
                                    : "Not Eligible"}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Courses;