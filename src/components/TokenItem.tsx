import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { AppText } from './AppText';
import { Token } from '../types/UserData';
import { formatBalance } from '../utils/formatters';
import { COLORS } from '../constants/config';

interface TokenItemProps {
  item: Token;
  showChange?: boolean;
}

export function TokenItem({ item, showChange = false }: TokenItemProps) {
  return (
    <View style={styles.tokenItem}>
      <View style={styles.tokenLeft}>
        <Image
          source={item.logo_url}
          style={styles.tokenLogo}
          contentFit="cover"
          recyclingKey={`${item.chain_id}-${item.contract_address}`}
        />
        <View style={styles.tokenInfo}>
          <AppText type="defaultSemiBold" style={styles.tokenName}>
            {item.contract_name}
          </AppText>
          <AppText style={styles.tokenSymbol}>
            <AppText style={styles.tokenBalance}>
              {formatBalance(item.balance, item.contract_decimals)}
            </AppText>{' '}
            {item.contract_ticker_symbol}
          </AppText>
          <View style={styles.tokenChainContainer}>
            <Image source={item.chain_logo_url} style={styles.tokenChainLogo} contentFit="cover" />
            <AppText style={styles.tokenChain}>{item.chain_name}</AppText>
          </View>
        </View>
      </View>
      <View style={styles.tokenRight}>
        <AppText style={styles.tokenValue}>{item.pretty_quote}</AppText>
        {showChange && item.quote_24h !== null && item.quote_24h !== 0 && (
          <AppText
            style={[
              styles.tokenChange,
              { color: item.quote >= item.quote_24h ? COLORS.success : COLORS.error },
            ]}
          >
            {item.quote >= item.quote_24h ? '+' : ''}
            {(((item.quote - item.quote_24h) / item.quote_24h) * 100).toFixed(2)}%
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginBottom: 8,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  tokenSymbol: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  tokenChainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenChain: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  tokenChainLogo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  tokenRight: {
    alignItems: 'flex-end',
  },
  tokenBalance: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  tokenValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  tokenChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
