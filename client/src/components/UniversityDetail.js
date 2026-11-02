import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUniversityByCode } from "../api";

function UniversityDetail({ apsScore }) {
  const { code } = useParams();

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUniversity = async () => {
      try {
        const data = await getUniversityByCode(code);
        setUniversity(data);
      } catch (error) {
        console.error("Error loading university:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUniversity();
  }, [code]);

  // 🛑 SAFETY CHECK (VERY IMPORTANT)
  if (!university) {
    return <h2>University not found</h2>;
  }

  const getEligibility = (courseAps) => {
    if (!apsScore) return "⚠ Calculate APS first";

    return apsScore >= courseAps
      ? "✅ You qualify"
      : "❌ You do not qualify";
  };

  // ✅ FIXED FILTERS
  const recommended = university.courses.filter(
    (course) => apsScore && apsScore >= course.aps
  );

  const notEligible = university.courses.filter(
    (course) => !apsScore || apsScore < course.aps
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>{university.name}</h1>

      <p><strong>APS Requirement:</strong> {university.aps}</p>

      <h3>Recommended for you</h3>
      <ul>
        {recommended.map((course, index) => (
          <li key={index}>
            <strong>{course.name}</strong> (APS: {course.aps}) {getEligibility(course.aps)}
          </li>
        ))}
      </ul>

      <h3>Not yet eligible</h3>
      <ul>
        {notEligible.map((course, index) => (
          <li key={index}>
            <strong>{course.name}</strong> (APS: {course.aps}) {getEligibility(course.aps)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UniversityDetail;