import { useMemo, useCallback } from 'react';

// React Native imports
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Third-party imports
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';

// Local imports
import { AppText } from '../../components/AppText';
import { SectionHeader } from '../../components/SectionHeader';
import { TransactionItem } from '../../components/TransactionItem';
import { useUserData } from '../../hooks/useUserData';
import { COLORS } from '../../constants/config';
import { RootStackParamList } from '../types';
import { Transaction as TransactionType } from '../../types/UserData';

type UserTransactionsRouteProp = RouteProp<RootStackParamList, 'UserTransactions'>;

interface ListItem {
  type: 'header' | 'transaction';
  title?: string;
  transaction?: TransactionType;
}

export function UserTransactions() {
  const route = useRoute<UserTransactionsRouteProp>();
  const { userAddress } = route.params;
  const { transactions, isLoadingTransactions, transactionsError } = useUserData(userAddress);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Group transactions by date and flatten into single array
  const flattenedTransactions = useMemo(() => {
    const groups: { [key: string]: TransactionType[] } = {};

    transactions.forEach((transaction) => {
      // Parse the ISO timestamp to get date
      const date = new Date(transaction.timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const dateKey = `${day} ${month} ${year}`;

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
    });

    // Sort transactions within each group by timestamp (newest first)
    Object.keys(groups).forEach((dateKey) => {
      groups[dateKey].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });

    // Flatten into single array with headers
    const flattened: ListItem[] = [];

    // Create a custom sorting function for DD mmm YYYY format
    const sortDateKeys = (a: string, b: string) => {
      const parseDateKey = (key: string) => {
        const [day, month, year] = key.split(' ');
        const monthMap: { [key: string]: number } = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        };
        return new Date(parseInt(year), monthMap[month], parseInt(day));
      };

      return parseDateKey(b).getTime() - parseDateKey(a).getTime();
    };

    Object.keys(groups)
      .sort(sortDateKeys)
      .forEach((dateKey) => {
        // Add section header
        flattened.push({
          type: 'header',
          title: dateKey,
        });
        // Add transactions for this date
        groups[dateKey].forEach((transaction) => {
          flattened.push({
            type: 'transaction',
            transaction,
          });
        });
      });

    return flattened;
  }, [transactions]);

  const handleExplorerPress = useCallback(
    (url: string, label: string) => {
      navigation.navigate('ModalBrowser', { url, title: label });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === 'header') {
        return <SectionHeader title={item.title || ''} />;
      } else if (item.type === 'transaction' && item.transaction) {
        return <TransactionItem item={item.transaction} onPressExplorer={handleExplorerPress} />;
      }
      return null;
    },
    [handleExplorerPress]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyText}>No transactions found</AppText>
      </View>
    ),
    []
  );

  if (isLoadingTransactions) {
    return (
      <View style={styles.emptyContainer}>
        <AppText>Loading transactions...</AppText>
      </View>
    );
  }

  if (transactionsError) {
    return (
      <View style={styles.emptyContainer}>
        <AppText>{transactionsError.message}</AppText>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.safeArea}>
      <FlashList
        data={flattenedTransactions}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.type === 'transaction' && item.transaction
            ? item.transaction.hash
            : `header-${index}`
        }
        contentContainerStyle={styles.transactionsContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  transactionsContainer: {
    padding: 16,
    backgroundColor: COLORS.backgroundSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
