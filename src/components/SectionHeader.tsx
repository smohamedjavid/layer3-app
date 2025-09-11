import React from 'react';

// React Native imports
import { View, StyleSheet } from 'react-native';

// Local imports
import { AppText } from './AppText';
import { COLORS } from '../constants/config';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <AppText style={styles.sectionHeaderText}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
