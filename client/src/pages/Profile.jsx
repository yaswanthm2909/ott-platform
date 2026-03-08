import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Profile() {
  const [watchlist, setWatchlist] = useState([]);
  const [recent, setRecent] = useState([]);
  const [continueList, setContinueList] = useState([]);

  const loadData = () => {
    const watchlistData =
      JSON.parse(localStorage.getItem("watchlist")) || [];

    const recentData =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    const continueData =
      JSON.parse(localStorage.getItem("continueWatching")) || [];

    setWatchlist(watchlistData);
    setRecent(recentData);
    setContinueList(continueData);
  };

  useEffect(() => {
    loadData();

    // refresh when page gains focus
    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
    };
  }, []);

  return (
    <div className="home">
      <h1>Your Profile</h1>

      {/* Watchlist */}
      <h2>❤️ Your Watchlist</h2>

      {watchlist.length === 0 ? (
        <p>No movies in watchlist</p>
      ) : (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

      {/* Continue Watching */}
      <h2>▶️ Continue Watching</h2>

      {continueList.length === 0 ? (
        <p>No movies in progress</p>
      ) : (
        <div className="movies-grid">
          {continueList.map((movie) => (
            <div key={movie._id}>
              <MovieCard movie={movie} />

              <div
                style={{
                  height: "5px",
                  background: "#333",
                  borderRadius: "4px",
                  marginTop: "5px"
                }}
              >
                <div
                  style={{
                    width: `${movie.progress || 0}%`,
                    height: "5px",
                    background: "#e50914",
                    borderRadius: "4px"
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recently Viewed */}
      <h2>👀 Recently Viewed</h2>

      {recent.length === 0 ? (
        <p>No recently viewed movies</p>
      ) : (
        <div className="movies-grid fade-in">
          {recent.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;