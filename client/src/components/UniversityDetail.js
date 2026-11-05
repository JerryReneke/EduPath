
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUniversityByCode } from "../api";

function UniversityDetail({ apsScore }) {
    const { code } = useParams();

    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadUniversity = async () => {
            setLoading(true);
            setError("");
            setUniversity(null);

            try {
                const data = await getUniversityByCode(code);

                if (!cancelled) {
                    setUniversity(data);
                }
            } catch (error) {
                if (!cancelled) {
                    setError(error.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadUniversity();

        return () => {
            cancelled = true;
        };
    }, [code]);

    // Display loading state
    if (loading) {
        return <p>Loading university details...</p>;
    }

    // Display API error
    if (error) {
        return (
            <div role="alert">
                <h2>Unable to load university</h2>
                <p>{error}</p>
            </div>
        );
    }

    // Handle missing university
    if (!university) {
        return <h2>University not found</h2>;
    }

    const courses = Array.isArray(university.courses)
        ? university.courses
        : [];

    const hasAps = apsScore !== null && apsScore !== undefined;

    const recommended = hasAps
        ? courses.filter(
            (course) => Number(apsScore) >= Number(course.aps)
        )
        : [];

    const notEligible = hasAps
        ? courses.filter(
            (course) => Number(apsScore) < Number(course.aps)
        )
        : courses;

    const getEligibility = (courseAps) => {
        if (!hasAps) return "Calculate APS first";

        return Number(apsScore) >= Number(courseAps)
            ? "You meet the listed APS threshold"
            : "You do not meet the listed APS threshold";
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>{university.name}</h1>

            <p>
                <strong>APS Requirement:</strong> {university.aps}
            </p>

            <h3>Recommended for you</h3>

            {recommended.length > 0 ? (
                <ul>
                    {recommended.map((course) => (
                        <li key={course.id}>
                            <strong>{course.name}</strong>
                            {" "} (APS: {course.aps}) {" "}
                            {getEligibility(course.aps)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    {hasAps
                        ? "No courses currently meet your APS score."
                        : "Calculate your APS to see course recommendations."}
                </p>
            )}

            <h3>{hasAps ? "Not yet eligible" : "Courses offered"}</h3>

            <ul>
                {notEligible.map((course) => (
                    <li key={course.id}>
                        <strong>{course.name}</strong>
                        {" "} (APS: {course.aps}) {" "}
                        {getEligibility(course.aps)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UniversityDetail;
