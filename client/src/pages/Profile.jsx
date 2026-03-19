import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getWatchlist } from "../api/watchlist";

function Profile() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (error) {
        console.log("Error loading profile:", error);
      }
    };

    loadData();
  }, []);
  console.log("WATCHLIST 👉", watchlist);
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
      <p>No movies in progress</p>

      {/* Recently Viewed */}
      <h2>👀 Recently Viewed</h2>
      <p>No recently viewed movies</p>
    </div>
  );
}

export default Profile;