import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} StreamX</p>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </footer>
  );
}

export default Footer;