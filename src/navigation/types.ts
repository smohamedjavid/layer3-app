import type { User } from '../types/User';

/**
 * Navigation parameter types for the entire app
 * This centralizes all navigation-related type definitions
 */
export type RootStackParamList = {
  UsersList: undefined;
  UserDetail: { user: User };
  UserTokens: { userAddress: string };
  UserNFTs: { userAddress: string };
  UserTransactions: { userAddress: string };
  ModalBrowser: { url: string; title: string };
  NotFound: undefined;
};

/**
 * Helper type to get params for a specific screen
 */
export type ScreenParams<T extends keyof RootStackParamList> = RootStackParamList[T];

/**
 * Common navigation options that can be reused
 */
export const NavigationOptions = {
  defaultHeader: {
    headerTransparent: false,
    headerStyle: {
      backgroundColor: '#f9f9f9',
    },
    headerTintColor: '#11181C',
  },
} as const;
