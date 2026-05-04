import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../styles/theme';

export const Header = ({ title, subtitle, onBackPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {onBackPress ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.brandMark}>
            <Ionicons name="film-outline" size={18} color={COLORS.primary} />
          </View>
        )}
        <View style={styles.titleGroup}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <View style={styles.accentLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingTop: 16,
    paddingHorizontal: SPACING.medium,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  titleGroup: {
    flex: 1,
    marginLeft: SPACING.medium,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  accentLine: {
    marginTop: 12,
    height: 3,
    width: 72,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
});

export default Header;
