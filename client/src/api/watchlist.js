import api from "./axios";

export const getWatchlist = async () => {
  const res = await api.get("/watchlist");
  return res.data; // ✅ THIS IS THE KEY
};

export const addToWatchlist = async (movieId) => {
  const res = await api.post("/watchlist", { movieId });
  return res.data;
};

export const removeFromWatchlist = async (movieId) => {
  const res = await api.delete("/watchlist", {
    data: { movieId },
  });
  return res.data;
};