import { useCallback, useState } from 'react';

// React Native imports
import { RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

// Third-party imports
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';

// Local imports
import { AppText } from '../../components/AppText';
import { COLORS } from '../../constants/config';
import { ErrorState, LoadingState } from '../../components/StateComponents';
import { useUsers } from '../../hooks/useUserData';
import { RootStackParamList } from '../types';
import { User } from '../../types/User';

export function UsersList() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: users, isLoading, error, refetch } = useUsers();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderUser = useCallback(
    ({ item }: { item: User }) => (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => navigation.navigate('UserDetail', { user: item })}
      >
        <AppText type="title" style={styles.rankText}>
          {item.rank}
        </AppText>
        <Image
          source={`https://ipfs.io/ipfs/${item.avatarCid}`}
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={styles.userInfo}>
          <AppText type="subtitle">{item.username}</AppText>
          <View style={styles.pillContainer}>
            <View style={[styles.pill, styles.xpPill]}>
              <AppText type="defaultSemiBold">XP: {item.xp}</AppText>
            </View>
            <View style={[styles.pill, styles.levelPill]}>
              <AppText type="defaultSemiBold">Level: {item.level}</AppText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  if (isLoading && !users) {
    return <LoadingState />;
  }

  if (error && !users) {
    return <ErrorState error={error.message} onRetry={() => refetch()} />;
  }

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.safeArea}>
      <FlashList
        data={users || []}
        keyExtractor={(item) => item.address}
        renderItem={renderUser}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#c8c8c855',
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(251, 251, 251, 0.99)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 16,
  },
  rankText: {
    minWidth: 40,
  },
  pillContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  pill: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  xpPill: {
    backgroundColor: 'rgba(173, 120, 102, 0.47)',
  },
  levelPill: {
    marginLeft: 8,
    backgroundColor: 'rgba(111, 173, 102, 0.47)',
  },
  userInfo: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.backgroundSecondary,
  },
});
