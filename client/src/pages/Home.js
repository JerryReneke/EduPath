import Universities from "../components/Universities";
import APSCalculator from "../components/APSCalculator";


function Home({ apsScore, setApsScore }) {
    return (
        <div className = "page">

            <section className = "hero">

                <div className = "hero-content">

                    <span className = "hero-brand">🎓 EduPath</span>

                    <h1>Your future starts here.</h1>

                    <p>
                        Dsicover South African universities, explore courses, 
                        calculate your APS score, and make confident decisions 
                        about your academic journey.
                    </p>

                    <div className = "hero-buttons">
                        <button className = "primary-btn">
                            🎯 Calculate APS
                        </button>


                        <button className = "secondary-btn">
                            🏫 Explore Universities
                        </button>
                    </div>

                    <div className = "hero-features">

                        <div className = "feature-item">
                            ✔ Live University Database
                        </div>

                        <div className = "feature-item">
                            ✔ APS Calculator
                        </div>

                        <div className = "feature-item">
                            ✔ Smart Recommendations
                        </div>

                        <div className = "feature-item">
                            ✔ Course Explorer
                        </div>
                        
                    </div>

                </div>

                <div className = "hero-graphic">

                    <div className = "hero-circle">
                        🎓
                    </div>

                    <div className = "floating-card card-one">
                        🏫
                        <p>Universities</p>
                    </div>

                    <div className = "floating-card card-two">
                        📚
                        <p>Courses</p>
                    </div>

                    <div className = "floating-card card-three">
                        📊
                        <p>APS Score</p>
                    </div>


                </div>

            </section>

            <APSCalculator setApsScore={setApsScore} />

            <Universities apsScore={apsScore} />


        </div>
    );
}

export default Home;