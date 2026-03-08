import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlistApi } from "../api/movies";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Watchlist() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWatchlist = async () => {
    try {
      const data = await getWatchlist();
      setList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const removeFromWatchlist = async (id) => {
    try {
      await removeFromWatchlistApi(id);
      setList((prev) => prev.filter((m) => m._id !== id));
      toast.success("Removed from Watchlist");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove movie");
    }
  };

  if (loading) return <p>Loading watchlist...</p>;

  if (list.length === 0) {
    return <p>Your watchlist is empty</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Your Watchlist</h2>

      <div className="movies-grid">
        {list.map((movie) => (
          <div key={movie._id} className="movie-card">
            <Link
              to={`/movies/${movie._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={movie.poster} alt={movie.title} />
              <h4>{movie.title}</h4>
            </Link>

            <button
              onClick={() => removeFromWatchlist(movie._id)}
              style={{
                marginTop: "8px",
                padding: "6px 10px",
                background: "#e50914",
                border: "none",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;