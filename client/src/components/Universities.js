
import { useEffect, useState } from "react";
import { getUniversities } from "../api";
import UniversityCard from "./UniversityCard";

function Universities({ apsScore }) {
    const [search, setSearch] = useState("");
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Check whether a valid APS score exists
    const hasApsScore =
        apsScore !== null &&
        apsScore !== undefined &&
        String(apsScore).trim() !== "" &&
        Number.isFinite(Number(apsScore));

    const numericApsScore = hasApsScore
        ? Number(apsScore)
        : null;

    // Load universities from backend
    useEffect(() => {
        const loadUniversities = async () => {
            try {
                const data = await getUniversities();
                setUniversities(data);
            } catch (error) {
                console.error("Error fetching universities:", error);

                setError(
                    error.message ||
                    "Unable to load universities. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadUniversities();
    }, []);

    // Search universities by name or code
    const normalizedSearch = search.trim().toLowerCase();

    const filteredUniversities = universities.filter((uni) =>
        String(uni.name || "").toLowerCase().includes(normalizedSearch) ||
        String(uni.code || "").toLowerCase().includes(normalizedSearch)
    );

    // Calculate the difference between student APS and university APS
    const universitiesWithComparison = universities.map((uni) => {
        const requirement = Number(uni.aps);

        const hasRequirement =
            uni.aps !== null &&
            uni.aps !== undefined &&
            uni.aps !== "" &&
            Number.isFinite(requirement);

        const difference =
            hasApsScore && hasRequirement
                ? numericApsScore - requirement
                : null;

        return {
            ...uni,
            hasRequirement,
            apsDifference: difference,
        };
    });

    // Sort universities by their distance from the student's APS
    const sortedUniversities = [...universitiesWithComparison].sort(
        (a, b) => {
            if (!hasApsScore) {
                return String(a.name || "").localeCompare(
                    String(b.name || "")
                );
            }

            if (a.apsDifference === null) return 1;
            if (b.apsDifference === null) return -1;

            return (
                Math.abs(a.apsDifference) -
                Math.abs(b.apsDifference)
            );
        }
    );

    // Universities where the student meets the listed APS threshold
    const eligibleUniversities = universitiesWithComparison.filter(
        (uni) =>
            uni.apsDifference !== null &&
            uni.apsDifference >= 0
    );

    // Describe the APS comparison
    const getApsComparison = (uni) => {
        if (!hasApsScore) {
            return "Calculate your APS score first.";
        }

        if (uni.apsDifference === null) {
            return "APS requirement unavailable.";
        }

        if (uni.apsDifference > 0) {
            return `${uni.apsDifference} APS points above the listed threshold.`;
        }

        if (uni.apsDifference < 0) {
            return `${Math.abs(uni.apsDifference)} APS points below the listed threshold.`;
        }

        return "Your APS exactly meets the listed threshold.";
    };

    // Qualification message
    const getQualification = (uni) => {
        if (!hasApsScore) return "";

        if (uni.apsDifference === null) {
            return "APS requirement unavailable.";
        }

        return uni.apsDifference >= 0
            ? "You meet the listed APS threshold."
            : "You are below the listed APS threshold.";
    };

    // Loading state
    if (loading) {
        return <p>Loading universities...</p>;
    }

    // Error state
    if (error) {
        return (
            <div role="alert">
                <h2>Unable to load universities</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <section className="universities" id="universities">

            {/* Eligible universities */}
            <h2>Universities Where You Meet the Listed APS Threshold</h2>

            <div className="university-cards">

                {eligibleUniversities.length > 0 ? (
                    eligibleUniversities.map((uni) => (
                        <UniversityCard
                            key={uni.id ?? uni.code}
                            university={uni}
                        >
                            <p>
                                <strong>APS Requirement:</strong> {uni.aps}
                            </p>

                            <p>✅ You meet the listed APS threshold.</p>
                        </UniversityCard>
                    ))
                ) : (
                    <p>
                        {hasApsScore
                            ? "No universities currently meet the listed APS threshold for your score."
                            : "Calculate your APS score to see which universities meet their listed APS thresholds."
                        }
                    </p>
                )}

            </div>

            {/* APS comparisons */}
            <h2>APS Comparisons</h2>

            {hasApsScore ? (
                <div className="university-cards">

                    {sortedUniversities.map((uni) => (
                        <UniversityCard
                            key={uni.id ?? uni.code}
                            university={uni}
                        >
                            <p>
                                <strong>APS Requirement:</strong> {uni.aps}
                            </p>

                            <p>
                                <strong>Your APS comparison:</strong>{" "}
                                {getApsComparison(uni)}
                            </p>
                        </UniversityCard>
                    ))}

                </div>
            ) : (
                <p>
                    Calculate your APS score to compare it with university requirements.
                </p>
            )}

            {/* Featured universities */}
            <h2>Featured Universities</h2>

            <input
                type="text"
                placeholder="Search university..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="university-cards">

                {filteredUniversities.length > 0 ? (
                    filteredUniversities.map((uni) => (
                        <UniversityCard
                            key={uni.id ?? uni.code}
                            university={uni}
                            clickable={true}
                        >
                            <small>{uni.description}</small>

                            {hasApsScore && (
                                <p>{getQualification(
                                    universitiesWithComparison.find(
                                        (item) => item.id === uni.id
                                    ) || uni
                                )}</p>
                            )}

                        </UniversityCard>
                    ))
                ) : (
                    <p>No universities match your search.</p>
                )}

            </div>

            <p>
                Meeting a university's listed APS threshold does not
                guarantee admission. Additional subject and programme
                requirements may apply.
            </p>

        </section>
    );
}

export default Universities;
