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
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    marginBottom: UI_CONSTANTS.MARGIN,
    textAlign: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: UI_CONSTANTS.MARGIN,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS,
    paddingHorizontal: UI_CONSTANTS.PADDING,
    paddingVertical: UI_CONSTANTS.MARGIN,
  },
  retryText: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  unhappyFlowContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: UI_CONSTANTS.PADDING,
  },
});
