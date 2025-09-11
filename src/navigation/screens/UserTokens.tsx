import { useCallback } from 'react';

// React Native imports
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Third-party imports
import { useRoute, RouteProp } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

// Local imports
import { AppText } from '../../components/AppText';
import { TokenItem } from '../../components/TokenItem';
import { useUserData } from '../../hooks/useUserData';
import { RootStackParamList } from '../types';
import { Token } from '../../types/UserData';
import { COLORS } from '../../constants/config';

type UserTokensRouteProp = RouteProp<RootStackParamList, 'UserTokens'>;

export function UserTokens() {
  const route = useRoute<UserTokensRouteProp>();
  const { userAddress } = route.params;
  const { tokens, isLoadingTokens, tokensError } = useUserData(userAddress);

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyText}>No tokens found</AppText>
      </View>
    ),
    []
  );

  const renderTokenItem = useCallback(
    ({ item }: { item: Token }) => <TokenItem item={item} showChange={true} />,
    []
  );

  if (isLoadingTokens) {
    return (
      <View style={styles.container}>
        <AppText>Loading tokens...</AppText>
      </View>
    );
  }

  if (tokensError) {
    return (
      <View style={styles.container}>
        <AppText style={styles.errorText}>{tokensError.message}</AppText>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.safeArea}>
      <FlashList
        data={tokens}
        keyExtractor={(item) => `${item.chain_id}-${item.contract_address}`}
        contentContainerStyle={styles.tokensContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        renderItem={renderTokenItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundSecondary,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
  },
  tokensContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    padding: 16,
  },
});
