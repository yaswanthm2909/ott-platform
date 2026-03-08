import axios from "./axios";

export const getWatchlist = () => {
  return axios.get("/watchlist");
};

export const addToWatchlist = (movieId) => {
  return axios.post(`/watchlist/${movieId}`);
};

export const removeFromWatchlist = (movieId) => {
  return axios.delete(`/watchlist/${movieId}`);
};
