import React, { useState, useCallback, useMemo } from 'react';

// React Native imports
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Third-party imports
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Local imports
import { AppText } from '../../components/AppText';
import { CollectibleItem } from '../../components/CollectibleItem';
import { MultichainBalanceCard } from '../../components/MultichainBalanceCard';
import { SectionCard } from '../../components/SectionCard';
import { TokenItem } from '../../components/TokenItem';
import { TransactionItem } from '../../components/TransactionItem';
import { UserHeader } from '../../components/UserHeader';
import { useUserData } from '../../hooks/useUserData';
import { COLORS } from '../../constants/config';
import { RootStackParamList } from '../types';

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export function UserDetail() {
  const route = useRoute<UserDetailRouteProp>();
  const { user } = route.params;
  const {
    tokens,
    collectibles,
    transactions,
    multichainBalance,
    isLoadingTokens,
    isLoadingCollectibles,
    isLoadingTransactions,
    refetchAll,
  } = useUserData(user.address);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchAll();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchAll]);

  const handleViewTokens = useCallback(() => {
    navigation.navigate('UserTokens', { userAddress: user.address });
  }, [navigation, user.address]);

  const handleViewNFTs = useCallback(() => {
    navigation.navigate('UserNFTs', { userAddress: user.address });
  }, [navigation, user.address]);

  const handleViewTransactions = useCallback(() => {
    navigation.navigate('UserTransactions', { userAddress: user.address });
  }, [navigation, user.address]);

  const handleExplorerPress = useCallback(
    (url: string, label: string) => {
      navigation.navigate('ModalBrowser', { url, title: label });
    },
    [navigation]
  );

  // Memoize filtered data to prevent unnecessary recalculations
  const nativeTokens = useMemo(
    () => tokens.filter((token) => token.native_token).slice(0, 3),
    [tokens]
  );

  const displayCollectibles = useMemo(() => collectibles.slice(0, 3), [collectibles]);

  const displayTransactions = useMemo(() => transactions.slice(0, 3), [transactions]);

  if (!user) {
    return (
      <View style={styles.container}>
        <AppText>{'User not found'}</AppText>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <UserHeader user={user} />

        <MultichainBalanceCard balance={multichainBalance} loading={isLoadingTokens} />

        <View style={styles.sectionsContainer}>
          <SectionCard
            title="Tokens"
            onViewMore={handleViewTokens}
            loading={isLoadingTokens}
            loadingText="Loading tokens..."
            emptyText="No tokens found"
            isEmpty={nativeTokens.length === 0}
          >
            {nativeTokens.map((token) => (
              <TokenItem key={`${token.chain_id}-${token.contract_address}`} item={token} />
            ))}
          </SectionCard>

          <SectionCard
            title="NFTs"
            onViewMore={handleViewNFTs}
            loading={isLoadingCollectibles}
            loadingText="Loading NFTs..."
            emptyText="No NFTs found"
            isEmpty={displayCollectibles.length === 0}
          >
            {displayCollectibles.map((collectible) => (
              <CollectibleItem key={collectible.uniqueId} item={collectible} variant="compact" />
            ))}
          </SectionCard>

          <SectionCard
            title="Recent Transactions"
            onViewMore={handleViewTransactions}
            loading={isLoadingTransactions}
            loadingText="Loading transactions..."
            emptyText="No transactions found"
            isEmpty={displayTransactions.length === 0}
          >
            {displayTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.hash}
                item={transaction}
                onPressExplorer={handleExplorerPress}
              />
            ))}
          </SectionCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundSecondary,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  sectionsContainer: {
    paddingBottom: 20,
  },
});
