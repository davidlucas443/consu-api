import axios from 'axios';

const TMDB_API_KEY = '8ab3d44baa64f1461271172e9e1f0d7c';
const API_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export const getImageUrl = (path, width = 500) => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w${width}${path}`;
};

export const getPopularMovies = (page = 1) => {
  return api.get('/movie/popular', {
    params: { page, language: 'pt-BR' },
  });
};

export const searchMovies = (query, page = 1) => {
  return api.get('/search/movie', {
    params: { query, page, language: 'pt-BR' },
  });
};

export const getMovieDetails = (movieId) => {
  return api.get(`/movie/${movieId}`, {
    params: { language: 'pt-BR' },
  });
};

export default api;
