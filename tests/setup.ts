// Setup for both utility and component tests
try {
  // Only import React Native testing library if available
  require('@testing-library/react-native/extend-expect');
} catch (e) {
  // React Native testing library not available, skip
}

// Suppress react-test-renderer deprecation warning
const originalWarn = console.warn;
const originalError = console.error;
console.warn = (...args) => {
  if (args[0]?.includes && args[0].includes('react-test-renderer is deprecated')) {
    return;
  }
  originalWarn.apply(console, args);
};
console.error = (...args) => {
  if (args[0]?.includes && args[0].includes('react-test-renderer is deprecated')) {
    return;
  }
  originalError.apply(console, args);
};

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: 'Image',
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock @shopify/flash-list
jest.mock('@shopify/flash-list', () => ({
  FlashList: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock expo modules
jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
}));

jest.mock('expo-system-ui', () => ({
  setStatusBarStyle: jest.fn(),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  }),
}));

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: () => 50,
}));

// Mock constants/config
jest.mock(
  '../src/constants/config',
  () => ({
    COLORS: {
      text: '#11181C',
      primary: '#0a7ea4',
      background: '#f9f9f9',
      surface: '#ffffff',
      textSecondary: '#666666',
      border: '#e0e0e0',
      error: '#ff6b6b',
      success: '#51cf66',
      warning: '#ffd43b',
    },
    API_CONFIG: {},
    API_ENDPOINTS: {},
    UI_CONSTANTS: {},
  }),
  { virtual: true }
);
