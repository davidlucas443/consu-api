import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header, MovieCard } from '../components';
import { getFavorites } from '../utils/storage';
import { COLORS } from '../styles/theme';

export const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs || []);
  };

  return (
    <View style={styles.container}>
      <Header title="Favoritos" />

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum filme favorito</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('Home', {
                screen: 'MovieDetails',
                params: { movieId: item.id },
              })}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.muted,
  },
});

export default FavoritesScreen;
