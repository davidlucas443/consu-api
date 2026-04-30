import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addFavorite = async (movie) => {
  try {
    const favs = await getFavorites();
    if (favs.some(f => f.id === movie.id)) return;
    favs.push(movie);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (err) {
    console.error('Error adding favorite', err);
  }
};

export const removeFavorite = async (movieId) => {
  try {
    const favs = await getFavorites();
    const filtered = favs.filter(f => f.id !== movieId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error removing favorite', err);
  }
};

export default { getFavorites, addFavorite, removeFavorite };
