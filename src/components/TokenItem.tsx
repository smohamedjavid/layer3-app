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
  tokenBalance: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  tokenChain: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  tokenChainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tokenChainLogo: {
    borderRadius: 5,
    height: 10,
    marginRight: 4,
    width: 10,
  },
  tokenChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenItem: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 16,
  },
  tokenLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  tokenLogo: {
    borderRadius: 20,
    height: 40,
    marginRight: 12,
    width: 40,
  },
  tokenName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  tokenRight: {
    alignItems: 'flex-end',
  },
  tokenSymbol: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  tokenValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
