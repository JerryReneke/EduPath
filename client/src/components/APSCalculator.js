
import { useState } from "react";

function APSCalculator({ setApsScore }) {
    const [marks, setMarks] = useState({
        math: "",
        english: "",
        subject3: "",
        subject4: "",
        subject5: "",
    });

    const [aps, setAps] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMarks((previousMarks) => ({
            ...previousMarks,
            [name]: value,
        }));

        // Clear previous results when marks change
        setAps(null);
        setApsScore(null);
        setError("");
    };

    const convertToAPS = (mark) => {
        if (mark >= 80) return 7;
        if (mark >= 70) return 6;
        if (mark >= 60) return 5;
        if (mark >= 50) return 4;
        if (mark >= 40) return 3;
        if (mark >= 30) return 2;

        return 1;
    };

    const calculateAPS = () => {
        const markValues = Object.values(marks);

        // Check for empty fields
        if (markValues.some((mark) => mark.trim() === "")) {
            setError("Please enter marks for all five subjects.");
            setAps(null);
            setApsScore(null);
            return;
        }

        // Convert marks into numbers
        const numericMarks = markValues.map(Number);

        // Validate marks
        const invalidMarks = numericMarks.some(
            (mark) =>
                !Number.isFinite(mark) ||
                mark < 0 ||
                mark > 100
        );

        if (invalidMarks) {
            setError("All subject marks must be between 0 and 100.");
            setAps(null);
            setApsScore(null);
            return;
        }

        // Calculate APS using the existing provisional scoring system
        const total = numericMarks.reduce(
            (sum, mark) => sum + convertToAPS(mark),
            0
        );

        setError("");
        setAps(total);
        setApsScore(total);
    };

    return (
        <section className="aps" id="aps-calculator">

            <div className="aps-card">

                <span className="aps-badge">
                    🎯 APS Calculator
                </span>

                <h2>Calculate Your APS Score</h2>

                <p>
                    Enter your subject percentages below to calculate
                    your Admission Point Score.
                </p>

                <div className="aps-form">

                    <input
                        type="number"
                        name="math"
                        placeholder="Mathematics %"
                        min="0"
                        max="100"
                        step="any"
                        value={marks.math}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="english"
                        placeholder="English %"
                        min="0"
                        max="100"
                        step="any"
                        value={marks.english}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="subject3"
                        placeholder="Subject 3 %"
                        min="0"
                        max="100"
                        step="any"
                        value={marks.subject3}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="subject4"
                        placeholder="Subject 4 %"
                        min="0"
                        max="100"
                        step="any"
                        value={marks.subject4}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="subject5"
                        placeholder="Subject 5 %"
                        min="0"
                        max="100"
                        step="any"
                        value={marks.subject5}
                        onChange={handleChange}
                    />

                </div>

                <button
                    className="aps-button"
                    onClick={calculateAPS}
                >
                    🎯 Calculate APS
                </button>

                {error && (
                    <p className="aps-error" role="alert">
                        {error}
                    </p>
                )}

                {aps !== null && (
                    <div className="aps-result">

                        <h3>Your APS Score</h3>

                        <span>{aps}</span>

                    </div>
                )}

            </div>

        </section>
    );
}

export default APSCalculator;
