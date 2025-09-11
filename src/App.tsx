import * as React from 'react';

// Third-party imports
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Assets as NavigationAssets } from '@react-navigation/elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Local imports
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './navigation';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <ReactQueryProvider>
          <Navigation />
          <StatusBar style="dark" />
        </ReactQueryProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
