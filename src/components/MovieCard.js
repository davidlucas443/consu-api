import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { getImageUrl } from '../services/api';
import { COLORS, SPACING } from '../styles/theme';

export const MovieCard = ({ movie, onPress }) => {
  const posterUrl = getImageUrl(movie.poster_path);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {posterUrl && (
        <Image source={{ uri: posterUrl }} style={styles.poster} />
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <Text style={styles.rating}>
          ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}/10
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SPACING.small,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  poster: {
    width: '100%',
    height: 240,
    backgroundColor: COLORS.lightGray,
  },
  info: {
    padding: SPACING.medium,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  rating: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default MovieCard;
