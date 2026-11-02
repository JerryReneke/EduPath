import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Student Platform</h2>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/universities">Universities</Link></li>
                <li><Link to="/aps">APS Calculator</Link></li>
                <li><Link to="/courses">Courses</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;