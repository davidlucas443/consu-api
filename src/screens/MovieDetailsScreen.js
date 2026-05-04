import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { getMovieDetails, getImageUrl } from '../services/api';
import { Header, LoadingSpinner } from '../components';
import { COLORS, SPACING } from '../styles/theme';

export const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    try {
      const res = await getMovieDetails(movieId);
      setMovie(res.data);
    } catch {
      Alert.alert('Erro', 'Falha ao carregar detalhes');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!movie) return null;

  const posterUrl = getImageUrl(movie.poster_path);
  const backdropUrl = getImageUrl(movie.backdrop_path);

  return (
    <View style={styles.container}>
      <Header
        title={movie.title}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView>
        {backdropUrl && (
          <Image
            source={{ uri: backdropUrl }}
            style={styles.backdrop}
          />
        )}

        <View style={styles.content}>
          {posterUrl && (
            <Image source={{ uri: posterUrl }} style={styles.poster} />
          )}

          <View style={styles.info}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}/10</Text>
            <Text style={styles.year}>
              {movie.release_date?.substring(0, 4)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.synopsis}>{movie.overview}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes</Text>
          <Text style={styles.detail}>
            Status: {movie.status || 'N/A'}
          </Text>
          <Text style={styles.detail}>
            Duração: {movie.runtime ? `${movie.runtime}min` : 'N/A'}
          </Text>
          <Text style={styles.detail}>
            Orçamento: ${movie.budget || 'N/A'}
          </Text>
          <Text style={styles.detail}>
            Receita: ${movie.revenue || 'N/A'}
          </Text>
        </View>

        {movie.genres && movie.genres.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gêneros</Text>
            <View style={styles.genresList}>
              {movie.genres.map(g => (
                <Text key={g.id} style={styles.genre}>{g.name}</Text>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backdrop: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.surface,
  },
  content: {
    flexDirection: 'row',
    padding: SPACING.medium,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: SPACING.medium,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.small,
  },
  rating: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.small,
  },
  year: {
    fontSize: 12,
    color: COLORS.muted,
  },
  section: {
    paddingHorizontal: SPACING.medium,
    marginVertical: SPACING.medium,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.small,
  },
  synopsis: {
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 20,
  },
  detail: {
    fontSize: 13,
    color: COLORS.white,
    marginBottom: SPACING.small,
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.small,
  },
  genre: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: 12,
    fontSize: 12,
    overflow: 'hidden',
  },
});

export default MovieDetailsScreen;
