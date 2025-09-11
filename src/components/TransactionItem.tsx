import React, { useCallback } from 'react';

// React Native imports
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

// Local imports
import { AppText } from './AppText';
import { COLORS, UI_CONSTANTS } from '../constants/config';
import { formatAddress, formatTimestamp } from '../utils/formatters';
import { Transaction } from '../types/UserData';

interface TransactionItemProps {
  item: Transaction;
  onPressExplorer: (url: string, label: string) => void;
}

export function TransactionItem({ item, onPressExplorer }: TransactionItemProps) {
  const handleExplorerPress = useCallback(() => {
    if (item.chain_explorer) {
      onPressExplorer(item.chain_explorer.url, item.chain_explorer.label);
    }
  }, [item.chain_explorer, onPressExplorer]);

  return (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={handleExplorerPress}
      activeOpacity={0.7}
    >
      {/* 1st Row: TX Type, Date, Chain */}
      <View style={styles.transactionRow}>
        <View style={styles.transactionTypeContainer}>
          <View
            style={[
              styles.transactionTypeIndicator,
              item.type === 'sent' ? styles.sentIndicator : styles.receivedIndicator,
            ]}
          />
          <AppText
            style={[
              styles.transactionType,
              item.type === 'sent' ? styles.sentText : styles.receivedText,
            ]}
          >
            {item.type === 'sent' ? 'Sent' : 'Received'}
          </AppText>
          <AppText style={styles.chainText}>on</AppText>
          <Image source={item.chain_logo_url} style={styles.chainLogo} contentFit="cover" />
          <AppText style={styles.chainText}>{item.chain_name}</AppText>
        </View>
        <AppText style={styles.transactionTimestamp} numberOfLines={1}>
          {formatTimestamp(item.timestamp)}
        </AppText>
      </View>

      {/* 2nd Row: Amount, From -> To */}
      <View style={styles.transactionRow}>
        <View style={styles.amountContainer}>
          <AppText style={styles.transactionValue}>{item.value} ETH</AppText>
        </View>
        <View style={styles.addressFlow}>
          <AppText style={styles.addressText}>{formatAddress(item.from)}</AppText>
          <AppText style={styles.arrow}>→</AppText>
          <AppText style={styles.addressText}>{formatAddress(item.to)}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    padding: UI_CONSTANTS.PADDING,
    marginBottom: UI_CONSTANTS.MARGIN,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS,
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: UI_CONSTANTS.SHADOW_OPACITY,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  transactionTypeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  sentIndicator: {
    backgroundColor: COLORS.error,
  },
  receivedIndicator: {
    backgroundColor: COLORS.success,
  },
  sentText: {
    color: COLORS.error,
  },
  receivedText: {
    color: COLORS.success,
  },
  chainText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  chainLogo: {
    width: 16,
    height: 16,
    marginLeft: 4,
    borderRadius: 8,
  },
  transactionTimestamp: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flexShrink: 0,
  },
  amountContainer: {
    minWidth: 80,
    marginRight: UI_CONSTANTS.MARGIN,
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addressFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: '60%',
  },
  addressText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.text,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: UI_CONSTANTS.MARGIN,
    paddingVertical: 2,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS,
    minWidth: 50,
    textAlign: 'center',
  },
  arrow: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
});
