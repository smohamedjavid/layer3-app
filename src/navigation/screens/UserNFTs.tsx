import { useCallback } from 'react';

// React Native imports
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Third-party imports
import { useRoute, RouteProp } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

// Local imports
import { AppText } from '../../components/AppText';
import { CollectibleItem } from '../../components/CollectibleItem';
import { useUserData } from '../../hooks/useUserData';
import { RootStackParamList } from '../types';
import { Collectible } from '../../types/UserData';
import { COLORS } from '../../constants/config';

type UserNFTsRouteProp = RouteProp<RootStackParamList, 'UserNFTs'>;

export function UserNFTs() {
  const route = useRoute<UserNFTsRouteProp>();
  const { userAddress } = route.params;
  const { collectibles, isLoadingCollectibles, collectiblesError } = useUserData(userAddress);

  const renderCollectibleItem = useCallback(
    ({ item }: { item: Collectible }) => <CollectibleItem item={item} variant="detailed" />,
    []
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyText}>No NFTs found</AppText>
      </View>
    ),
    []
  );

  if (isLoadingCollectibles) {
    return (
      <View style={styles.container}>
        <AppText>Loading NFTs...</AppText>
      </View>
    );
  }

  if (collectiblesError) {
    return (
      <View style={styles.container}>
        <AppText>{collectiblesError.message}</AppText>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.safeArea}>
      <FlashList
        data={collectibles}
        renderItem={renderCollectibleItem}
        keyExtractor={(item) => item.uniqueId}
        contentContainerStyle={styles.nftsContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        numColumns={2}
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
  nftsContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    padding: 16,
  },
  safeArea: {
    flex: 1,
  },
});
