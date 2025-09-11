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
  addressFlow: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: '60%',
  },
  addressText: {
    backgroundColor: '#f0f0f0',
    borderRadius: UI_CONSTANTS.BORDER_RADIUS,
    color: COLORS.text,
    fontFamily: 'monospace',
    fontSize: 11,
    minWidth: 50,
    paddingHorizontal: UI_CONSTANTS.MARGIN,
    paddingVertical: 2,
    textAlign: 'center',
  },
  amountContainer: {
    marginRight: UI_CONSTANTS.MARGIN,
    minWidth: 80,
  },
  arrow: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  chainLogo: {
    borderRadius: 8,
    height: 16,
    marginLeft: 4,
    width: 16,
  },
  chainText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 4,
  },
  receivedIndicator: {
    backgroundColor: COLORS.success,
  },
  receivedText: {
    color: COLORS.success,
  },
  sentIndicator: {
    backgroundColor: COLORS.error,
  },
  sentText: {
    color: COLORS.error,
  },
  transactionItem: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS,
    borderWidth: 1,
    elevation: 2,
    marginBottom: UI_CONSTANTS.MARGIN,
    padding: UI_CONSTANTS.PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: UI_CONSTANTS.SHADOW_OPACITY,
    shadowRadius: 2,
  },
  transactionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionTimestamp: {
    color: COLORS.textSecondary,
    flexShrink: 0,
    fontSize: 12,
  },
  transactionType: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  transactionTypeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
  },
  transactionTypeIndicator: {
    borderRadius: 4,
    height: 8,
    marginRight: 8,
    width: 8,
  },
  transactionValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
