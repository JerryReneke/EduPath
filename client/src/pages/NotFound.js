
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="page">
            <h1>404 - Page Not Found</h1>

            <p>
                Sorry, the page you're looking for doesn't exist.
            </p>

            <Link to="/">
                Return to Homepage
            </Link>
        </div>
    );
}

export default NotFound;
