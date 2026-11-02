import { Link } from "react-router-dom";

function UniversityCard({
    university,
    children,
    clickable = false
}) {

    const card = (

        <div className="card">

            <div className="card-header">

                <div className="university-code">
                    🏫 {university.code}
                </div>

                <h3>{university.name}</h3>

            </div>

            <div className="card-content">

                {children}

            </div>

            {clickable && (

                <div className="card-footer">

                    <span>
                        View Details →
                    </span>

                </div>

            )}

        </div>

    );

    if (clickable) {
        return (
            <Link
                to={`/university/${university.code}`}
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }}
            >
                {card}
            </Link>
        );
    }

    return card;
}

export default UniversityCard;