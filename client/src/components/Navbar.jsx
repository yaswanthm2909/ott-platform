import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link to="/" className="logo">
          StreamX
        </Link>
      </div>

      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <div className="nav-right">
        <button onClick={logout}>Logout</button>
      </div>

    </nav>
  );
}

export default Navbar;