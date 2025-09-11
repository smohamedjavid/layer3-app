// Third-party imports
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Local imports
import { apiService } from '../services/apiService';
import { Token, Collectible, Transaction } from '../types/UserData';
import { User } from '../types/User';

// Query keys for consistent caching
export const queryKeys = {
  users: () => ['users'] as const,
  tokens: (address: string) => ['tokens', address] as const,
  collectibles: (address: string) => ['collectibles', address] as const,
  transactions: (address: string) => ['transactions', address] as const,
  multichainBalance: (address: string) => ['multichainBalance', address] as const,
};

// Individual hooks for each data type
export function useTokens(address: string, options?: Partial<UseQueryOptions<Token[], Error>>) {
  return useQuery({
    queryKey: queryKeys.tokens(address),
    queryFn: () => apiService.fetchTokens(address),
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes - tokens change frequently
    ...options,
  });
}

export function useCollectibles(
  address: string,
  options?: Partial<UseQueryOptions<Collectible[], Error>>
) {
  return useQuery({
    queryKey: queryKeys.collectibles(address),
    queryFn: () => apiService.fetchCollectibles(address),
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes - NFTs don't change as frequently
    ...options,
  });
}

export function useTransactions(
  address: string,
  options?: Partial<UseQueryOptions<Transaction[], Error>>
) {
  return useQuery({
    queryKey: queryKeys.transactions(address),
    queryFn: () => apiService.fetchTransactions(address),
    enabled: !!address,
    staleTime: 1 * 60 * 1000, // 1 minute - transactions update frequently
    ...options,
  });
}

// Hook for multichain balance (computed from tokens)
export function useMultichainBalance(address: string) {
  const { data: tokens = [] } = useTokens(address);

  return useQuery({
    queryKey: queryKeys.multichainBalance(address),
    queryFn: () => apiService.calculateMultichainBalance(tokens),
    enabled: !!address && !!tokens.length,
    staleTime: 2 * 60 * 1000,
  });
}

// Hook for fetching the users list
export function useUsers(options?: Partial<UseQueryOptions<User[], Error>>) {
  return useQuery({
    queryKey: queryKeys.users(),
    queryFn: () => apiService.fetchUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes - users list doesn't change frequently
    ...options,
  });
}

// Combined hook for all user data
export function useUserData(address: string) {
  const tokensQuery = useTokens(address);
  const collectiblesQuery = useCollectibles(address);
  const transactionsQuery = useTransactions(address);
  const multichainBalanceQuery = useMultichainBalance(address);

  return {
    tokens: tokensQuery.data ?? [],
    collectibles: collectiblesQuery.data ?? [],
    transactions: transactionsQuery.data ?? [],
    multichainBalance: multichainBalanceQuery.data ?? null,

    // Loading states
    isLoadingTokens: tokensQuery.isLoading,
    isLoadingCollectibles: collectiblesQuery.isLoading,
    isLoadingTransactions: transactionsQuery.isLoading,
    isLoadingMultichainBalance: multichainBalanceQuery.isLoading,

    // Combined loading state
    isLoading: tokensQuery.isLoading || collectiblesQuery.isLoading || transactionsQuery.isLoading,

    // Error states
    tokensError: tokensQuery.error,
    collectiblesError: collectiblesQuery.error,
    transactionsError: transactionsQuery.error,
    multichainBalanceError: multichainBalanceQuery.error,

    // Combined error state
    error:
      tokensQuery.error ||
      collectiblesQuery.error ||
      transactionsQuery.error ||
      multichainBalanceQuery.error,

    // Refetch functions
    refetchTokens: tokensQuery.refetch,
    refetchCollectibles: collectiblesQuery.refetch,
    refetchTransactions: transactionsQuery.refetch,
    refetchAll: () => {
      tokensQuery.refetch();
      collectiblesQuery.refetch();
      transactionsQuery.refetch();
    },
  };
}
