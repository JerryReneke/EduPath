import { useEffect, useState } from "react";
import { getUniversities } from "../api";
import UniversityCard from "./UniversityCard";


function Universities({ apsScore }) {

    const [search, setSearch] = useState("");
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const loadUniversities = async () => {
            try {
                const data = await getUniversities();
                setUniversities(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };

        loadUniversities();
    }, []);

    const filteredUniversities = universities.filter(uni =>
        uni.code.toLowerCase().includes(search.toLowerCase()) ||
        uni.name.toLowerCase().includes(search.toLowerCase())
    );

   
    const getQualification = (uni) => {
        if (apsScore === null) return "";

        return apsScore >= uni.aps
            ? "✅ You qualify"
            : "❌ You do not qualify";
    };


    const universitiesWithScore = universities.map((uni) => {
        const requirement = uni.aps;

        if (!apsScore || !requirement) {
            return { ...uni, match: 0 };
        }

        const match = (Number(apsScore) / requirement) * 100;

        return {
            ...uni,
            match: Math.min(Math.round(match), 100)
        };
    });


    const sortedUniversities = universitiesWithScore.sort(
        (a, b) => b.match - a.match
    );


    const eligibleUniversities = universities.filter((uni) => {
        const requirement = uni.aps;

        if (!apsScore || !requirement) return false;

        return apsScore >= requirement;
    });


    
    const getBadge = (uni) => {
        if (!apsScore) return "";


        const ratio = apsScore / uni.aps;

        if (ratio >= 1.2) return "Safety";
        if (ratio >= 1.0) return "Target";
        return "Reach";
    };


    return (
        
        <section className="universities">

            <h2>Universities You Can Apply To</h2>

            <div className="university-cards">
                {eligibleUniversities.length > 0 ? (
                    eligibleUniversities.map((uni) => (
                        <UniversityCard
                            key = {uni.card}
                            university={uni}
                        >
                            <p>
                                <strong>APS Requirement:</strong> {uni.aps}
                            </p>

                            <p>✅ You qualify</p>

                        </UniversityCard>    

                    ))
                ) : (
                    <p>No universities match your APS yet. Try increasing your score.</p>
                
                )}
            </div>


            <h2>Best Matches For You</h2>

            <div className="university-cards">
                {sortedUniversities.map((uni) => (
                    <UniversityCard
                        key={uni.code}
                        university={uni}
                    >
                        {apsScore !== null && (
                            <p>
                                <strong>Match:</strong> {uni.match}%
                            </p>
                        )}
                    </UniversityCard>
                ))}
            </div>



            <h2>Featured Universities</h2>

            <input
                type="text"
                placeholder="Search university...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="university-cards">
                {filteredUniversities.map((uni) => (
                    <UniversityCard
                        key={uni.code}
                        university={uni}
                        clickable={true}
                    >
                        <small>{uni.description}</small>

                        {apsScore !== null && (
                            <>
                                <p>{getQualification(uni)}</p>

                                <span className={`badge ${getBadge(uni).toLowerCase()}`}>
                                    {getBadge(uni)}
                                </span>

                            </>
                        )}
                    </UniversityCard>
                 ))}

                
            </div> 



        </section>      
    );
}

export default Universities;