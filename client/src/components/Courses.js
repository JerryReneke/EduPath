
import { useEffect, useState } from "react";
import { getCourses } from "../api";

function Courses({ apsScore }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showEligibleOnly, setShowEligibleOnly] = useState(false);

    // Load courses from the backend
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);

                setError(
                    error.message || "Unable to load courses. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    // Check whether the student has calculated an APS score
    const hasApsScore =
        apsScore !== null && apsScore !== undefined;

    // Search by course name, university name or university code
    const normalizedSearch = search.trim().toLowerCase();

    const filteredCourses = courses.filter((course) =>
        String(course.name || "").toLowerCase().includes(normalizedSearch) ||
        String(course.university_name || "").toLowerCase().includes(normalizedSearch) ||
        String(course.code || "").toLowerCase().includes(normalizedSearch)
    );

    // Filter courses based on the student's APS
    const eligibleCourses = filteredCourses.filter((course) => {
        const courseAps = Number(course.aps);

        return (
            hasApsScore &&
            Number.isFinite(courseAps) &&
            Number(apsScore) >= courseAps
        );
    });

    // Determine which courses should be displayed
    const displayedCourses =
        showEligibleOnly && hasApsScore
            ? eligibleCourses
            : filteredCourses;

    // Loading state
    if (loading) {
        return <p>Loading courses...</p>;
    }

    // Error state
    if (error) {
        return (
            <div role="alert">
                <h2>Unable to load courses</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>

            <h2>Courses</h2>

            {/* Course search */}
            <input
                type="text"
                placeholder="Search courses or universities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <p>Searching for: {search}</p>

            <p>Total courses loaded: {courses.length}</p>

            <p>Courses found: {filteredCourses.length}</p>

            {/* Filtering status */}
            <p>
                {showEligibleOnly && hasApsScore
                    ? "Showing only courses that meet your listed APS thresholds"
                    : "Showing all courses"}
            </p>

            {/* Eligibility checkbox */}
            <label style={{ display: "block", margin: "20px 0" }}>

                <input
                    type="checkbox"
                    checked={showEligibleOnly}
                    disabled={!hasApsScore}
                    onChange={(e) =>
                        setShowEligibleOnly(e.target.checked)
                    }
                />

                {" "}Show only courses I qualify for

            </label>

            {/* APS reminder */}
            {!hasApsScore && (
                <p>
                    Calculate your APS score to filter courses by eligibility.
                </p>
            )}

            {/* Course list */}
            {displayedCourses.length > 0 ? (

                <ul>
                    {displayedCourses.map((course) => (

                        <li key={course.id}>

                            <strong>{course.name}</strong>

                            <p>
                                University: {course.university_name} ({course.code})
                            </p>

                            <p>
                                APS Requirement: {course.aps}
                            </p>

                            {hasApsScore && (
                                <p>
                                    {Number(apsScore) >= Number(course.aps)
                                        ? "You meet the listed APS threshold"
                                        : "You do not meet the listed APS threshold"}
                                </p>
                            )}

                        </li>

                    ))}
                </ul>

            ) : (

                <p>
                    {showEligibleOnly && hasApsScore
                        ? "No courses in your current search meet the listed APS threshold."
                        : "No courses match your search."}
                </p>

            )}

            <p>
                Eligibility is based on APS comparisons only and does not
                guarantee admission. Other university requirements may apply.
            </p>

        </div>
    );
}

export default Courses;
