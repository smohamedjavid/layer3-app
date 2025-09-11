import React, { Component, ReactNode } from 'react';

// React Native imports
import { View, StyleSheet } from 'react-native';

// Local imports
import { AppText } from './AppText';
import { COLORS, UI_CONSTANTS } from '../constants/config';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <AppText style={styles.title}>Something went wrong</AppText>
          <AppText style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </AppText>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
    padding: UI_CONSTANTS.PADDING,
  },
  message: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    color: COLORS.error,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: UI_CONSTANTS.MARGIN,
  },
});
