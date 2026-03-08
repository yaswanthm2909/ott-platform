import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../api/movies";
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [recent, setRecent] = useState([]);
  const [continueList, setContinueList] = useState([]);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("All");

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        const data = await getMovies();
        const movieList = data.movies || data;

        setMovies(movieList);

        // Random hero movie
        if (movieList.length > 0) {
          const random =
            movieList[Math.floor(Math.random() * movieList.length)];
          setHeroMovie(random);
        }

        const recentSaved =
          JSON.parse(localStorage.getItem("recentlyViewed")) || [];

        const contSaved =
          JSON.parse(localStorage.getItem("continueWatching")) || [];

        setRecent(recentSaved);
        setContinueList(contSaved);

      } catch (err) {
        console.error("Error fetching movies:", err);
      }

      finally {
        setLoading(false);
      }

    };

    fetchMovies();

  }, []);

  const genres = [
    "All",
    ...new Set(movies.map((m) => m.genre).filter(Boolean))
  ];

  const filteredMovies = movies.filter((movie) => {

    const matchesTitle =
      movie.title.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || movie.genre === genre;

    return matchesTitle && matchesGenre;

  });

  const suggestions =
    search.trim() === ""
      ? []
      : movies.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );

  const handleSelectSuggestion = (title) => {
    setSearch(title);
    setShowSuggestions(false);
  };

  return (
    <div className="home">

      {/* HERO BANNER */}

      {heroMovie && (
        <div
          className="hero-banner"
          style={{ backgroundImage: `url(${heroMovie.poster})` }}
        >
          <div className="hero-overlay">

            <h1>{heroMovie.title}</h1>

            <p>{heroMovie.description}</p>

            <div className="hero-buttons">

              <button
                onClick={() =>
                  navigate(`/movies/${heroMovie._id}`)
                }
              >
                ▶ Play
              </button>

              <button
                onClick={() =>
                  navigate(`/movies/${heroMovie._id}`)
                }
              >
                ℹ More Info
              </button>

            </div>

          </div>
        </div>
      )}

      <h1>Movies</h1>

      {/* SEARCH + GENRE */}

      <div className="search-bar">

        <div className="search-input">

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions">

              {suggestions.map((movie) => (
                <div
                  key={movie._id}
                  onClick={() =>
                    handleSelectSuggestion(movie.title)
                  }
                >
                  {movie.title}
                </div>
              ))}

            </div>
          )}

        </div>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

      </div>

      {/* CONTINUE WATCHING */}

      {continueList.length > 0 && (
        <>
          <h2>Continue Watching</h2>

          <div className="movie-row">

            {continueList.map((movie) => (
              <div key={movie._id}>

                <MovieCard movie={movie} />

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${movie.progress || 0}%`
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        </>
      )}

      {/* RECENTLY VIEWED */}

      {recent.length > 0 && (
        <>
          <h2>Recently Viewed</h2>

          <div className="movie-row">

            {recent.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
              />
            ))}

          </div>
        </>
      )}

      {/* ALL MOVIES */}

      <h2>Browse Movies</h2>

      <div className="movie-row">

        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="skeleton-card"
              >
                <div className="skeleton-img"></div>
                <div className="skeleton-text"></div>
              </div>
            ))
          : filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
              />
            ))}

      </div>

    </div>
  );
};

export default Home;