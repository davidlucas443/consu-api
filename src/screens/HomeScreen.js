import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getPopularMovies, searchMovies } from '../services/api';
import { Header, MovieCard, LoadingSpinner } from '../components';
import { COLORS, SPACING } from '../styles/theme';

export const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const res = await getPopularMovies(1);
      setMovies(res.data.results);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar filmes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setSearchText(text);
    if (!text.trim()) {
      loadMovies();
      return;
    }

    try {
      const res = await searchMovies(text);
      setMovies(res.data.results);
    } catch {
      Alert.alert('Erro', 'Falha na busca');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <Header title="Filmes" subtitle="Explore os destaques" />

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar filmes..."
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
        {searchText && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.medium,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: COLORS.white,
    fontSize: 16,
  },
  clearBtn: {
    fontSize: 18,
    color: COLORS.primary,
    padding: SPACING.small,
  },
  listContent: {
    paddingHorizontal: SPACING.small,
    paddingBottom: SPACING.large,
  },
});

export default HomeScreen;
