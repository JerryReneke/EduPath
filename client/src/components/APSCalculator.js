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

    const handleChange = (e) => {
        setMarks({
            ...marks,
            [e.target.name]: e.target.value,
        });
    };

    const convertToAPS = (marks) => {
        const m = Number(marks);

        if (m >= 80) return 7;
        if (m >= 70) return 6;
        if (m >= 60) return 5;
        if (m >= 50) return 4;
        if (m >= 40) return 3;
        if (m >= 30) return 2;
        return 1;
    }

    const calculateAPS = () => {
        const total =
        convertToAPS(marks.math) +
        convertToAPS(marks.english) +
        convertToAPS(marks.subject3) +
        convertToAPS(marks.subject4) +
        convertToAPS(marks.subject5);

    setAps(total);              // for local display
    setApsScore(total);        // send to App.js
};

    return (
        <section className="aps" id="aps-calculator">
           
           <div className = "aps-card">

            <span className = "aps-badge">
                🎯 APS Calculator
            </span>

            <h2>Calculate Your APS Score</h2>

            <p>
                Enter your subject percentages below to calculate your Admission Point Score.
            </p>

            <div className = "aps-form">

                <input
                    type = "number"
                    name = "math"
                    placeholder = "Mathematics %"
                    onChange={handleChange}
                />

                <input
                    type = "number"
                    name = "english"
                    placeholder = "English %"
                    onChange={handleChange}    
                />

                <input
                    type = "number"
                    name = "subject3"
                    placeholder = "Subject 3 %"
                    onChange={handleChange} 
                />       


                <input
                    type = "number"
                    name = "subject4"
                    placeholder = "Subject 4 %"
                    onChange={handleChange} 
                />    


                <input
                    type = "number"
                    name = "subject5"
                    placeholder = "Subject 5 %"
                    onChange={handleChange} 
                />    

            </div>

            <button
                 className="aps-button"
                 onClick={calculateAPS}
            >
                🎯 Calculate APS
            </button>     

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