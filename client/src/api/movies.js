import api from "./axios";

// ================= MOVIES =================

export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

// ================= WATCHLIST (BACKEND) =================

export const getWatchlist = async () => {
  const res = await api.get("/user/watchlist");
  return res.data;
};

export const addToWatchlistApi = async (movieId) => {
  const res = await api.post(`/user/watchlist/${movieId}`);
  return res.data;
};

export const removeFromWatchlistApi = async (movieId) => {
  const res = await api.delete(`/user/watchlist/${movieId}`);
  return res.data;
};

// ================= PROGRESS (BACKEND) =================

export const getProgressList = async () => {
  const res = await api.get("/user/progress");
  return res.data;
};

export const updateProgressApi = async (movieId, progress) => {
  const res = await api.post("/user/progress", { movieId, progress });
  return res.data;
};

// ================= RATINGS (BACKEND) =================

export const getRatings = async () => {
  const res = await api.get("/user/ratings");
  return res.data;
};

export const setRatingApi = async (movieId, rating) => {
  const res = await api.post("/user/ratings", { movieId, rating });
  return res.data;
};
