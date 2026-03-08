import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToWatchlistApi,
  removeFromWatchlistApi,
  getWatchlist,
} from "../api/movies";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const list = await getWatchlist();
        const exists = list.find((m) => m._id === movie._id);
        setInWatchlist(!!exists);
      } catch (err) {
        console.error("Watchlist check failed", err);
      }
    };

    checkWatchlist();
  }, [movie._id]);

  const toggleWatchlist = async (e) => {
    e.preventDefault();

    try {
      if (inWatchlist) {
        await removeFromWatchlistApi(movie._id);
        setInWatchlist(false);
        toast.success("Removed from Watchlist");
      } else {
        await addToWatchlistApi(movie._id);
        setInWatchlist(true);
        toast.success("Added to Watchlist");
      }
    } catch (err) {
      console.error("Watchlist update failed", err);
      toast.error("Failed to update Watchlist");
    }
  };

  return (
    <Link
      to={`/movies/${movie._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="movie-card slide-up">
        <img src={movie.poster} alt={movie.title} />

        <div className="movie-overlay">
          <div className="overlay-top">
            <span className="heart-btn" onClick={toggleWatchlist}>
              {inWatchlist ? "❤️" : "🤍"}
            </span>
          </div>

          <div className="overlay-bottom">
            <h3>{movie.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;