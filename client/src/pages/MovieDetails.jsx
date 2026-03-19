import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMovieById,
  getWatchlist,
  addToWatchlistApi,
  removeFromWatchlistApi,
  getProgressList,
  updateProgressApi,
  getRatings,
  setRatingApi,
} from "../api/movies";
import toast from "react-hot-toast";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [inWatchlist, setInWatchlist] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);

  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMovieById(id);
        const data = res.movie || res;
        setMovie(data);

       
        try {
          const wl = await getWatchlist();
          const exists = wl.find((m) => m._id === data._id);
          setInWatchlist(!!exists);
        } catch {
          console.warn("Watchlist load failed");
        }

        
        try {
          const progressList = await getProgressList();
          const found = progressList.find(
            (item) => item.movie && item.movie._id === data._id
          );
          setProgress(found ? found.progress : 0);
        } catch {
          console.warn("Progress load failed");
        }

        
        try {
          const ratings = await getRatings();
          setRating(ratings[data._id] || 0);
        } catch {
          console.warn("Ratings load failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleWatchlist = async () => {
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
      console.error(err);
      toast.error("Watchlist update failed");
    }
  };

  const watchMore = async () => {
    try {
      const newProgress = Math.min(progress + 10, 100);
      await updateProgressApi(movie._id, newProgress);
      setProgress(newProgress);
      toast.success(`Watched ${newProgress}%`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update progress");
    }
  };

  const rateMovie = async (value) => {
    try {
      await setRatingApi(movie._id, value);
      setRating(value);
      toast.success(`Rated ${value} ⭐`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save rating");
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (!movie) return <p style={{ padding: "40px" }}>Movie not found</p>;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        display: "flex",
        gap: "40px",
        padding: "0 20px",
      }}
    >
      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: "320px", borderRadius: "10px" }}
      />

      {/* Movie Info */}
      <div style={{ flex: 1 }}>
        <h1>{movie.title}</h1>

        {/* Rating */}
        <div style={{ margin: "10px 0" }}>
          <span>Rating: </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => rateMovie(star)}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: star <= rating ? "#f5c518" : "#888",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <p>{movie.description}</p>
        <p>Genre: {movie.genre}</p>
        <p>Year: {movie.year}</p>

        {/* Watchlist */}
        <button onClick={toggleWatchlist}>
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>

        {/* Progress */}
        <div style={{ marginTop: "20px" }}>
          <p>Progress: {progress}%</p>
          <button onClick={watchMore}>Watch 10% more ▶</button>
        </div>

        {/* Trailer */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setShowTrailer(true)}>🎬 Watch Trailer</button>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ width: "800px", position: "relative" }}>
            <button
              onClick={() => setShowTrailer(false)}
              style={{
                position: "absolute",
                top: "-30px",
                right: "0",
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            <iframe
              width="100%"
              height="450"
              src={movie.trailer || "https://www.youtube.com/embed/YoHD9XEInc0"}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;