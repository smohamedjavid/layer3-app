import React from 'react';

// React Native imports
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

// Local imports
import { AppText } from './AppText';

interface SectionCardProps {
  title: string;
  onViewMore?: () => void;
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  children: React.ReactNode;
  isEmpty?: boolean;
}

export function SectionCard({
  title,
  onViewMore,
  loading = false,
  loadingText = 'Loading...',
  emptyText = 'No items found',
  children,
  isEmpty = false,
}: SectionCardProps) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <AppText type="subtitle" style={styles.sectionTitle}>
          {title}
        </AppText>
        {onViewMore && (
          <TouchableOpacity onPress={onViewMore}>
            <AppText style={styles.viewMoreText}>View More</AppText>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
          <AppText style={styles.loadingText}>{loadingText}</AppText>
        </View>
      ) : isEmpty ? (
        <AppText style={styles.emptyText}>{emptyText}</AppText>
      ) : (
        <View style={styles.itemsContainer}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    color: '#666',
    fontSize: 14,
    padding: 20,
    textAlign: 'center',
  },
  itemsContainer: {
    gap: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
  sectionCard: {
    backgroundColor: '#f9f9f9',
    borderColor: '#e0e0e0',
    borderRadius: 12,
    borderWidth: 1,
    margin: 16,
    padding: 16,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewMoreText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
});
