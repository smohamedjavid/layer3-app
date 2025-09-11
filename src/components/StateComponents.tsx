import React from 'react';

// React Native imports
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

// Local imports
import { AppText } from './AppText';
import { COLORS, UI_CONSTANTS } from '../constants/config';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

interface LoadingStateProps {
  message?: string;
}

interface EmptyStateProps {
  message: string;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.unhappyFlowContainer}>
      <AppText style={styles.errorText}>{error}</AppText>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <AppText style={styles.retryText}>Retry</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.unhappyFlowContainer}>
      <ActivityIndicator size="large" color={COLORS.textSecondary} />
      <AppText style={styles.loadingText}>{message}</AppText>
    </View>
  );
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.unhappyFlowContainer}>
      <AppText style={styles.emptyText}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  unhappyFlowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: UI_CONSTANTS.PADDING,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: UI_CONSTANTS.MARGIN,
  },
  retryButton: {
    paddingHorizontal: UI_CONSTANTS.PADDING,
    paddingVertical: UI_CONSTANTS.MARGIN,
    backgroundColor: COLORS.primary,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS,
  },
  retryText: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: UI_CONSTANTS.MARGIN,
    color: COLORS.textSecondary,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
