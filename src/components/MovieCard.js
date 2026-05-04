import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { getImageUrl } from '../services/api';
import { COLORS, SPACING } from '../styles/theme';

export const MovieCard = ({ movie, onPress }) => {
  const posterUrl = getImageUrl(movie.poster_path);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.posterContainer}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        ) : (
          <View style={styles.posterPlaceholder} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.rating}>
            ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.small,
    backgroundColor: '#111111',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    elevation: 5,
  },
  posterContainer: {
    aspectRatio: 2 / 3,
    backgroundColor: '#1C1C1C',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  posterPlaceholder: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  info: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    minHeight: 92,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.small,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 13,
    color: '#FFC857',
    fontWeight: '600',
  },
});

export default MovieCard;
