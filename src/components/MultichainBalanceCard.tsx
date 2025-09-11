import React from 'react';

// React Native imports
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

// Local imports
import { AppText } from './AppText';
import { MultichainBalance } from '../types/UserData';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface MultichainBalanceCardProps {
  balance: MultichainBalance | null;
  loading: boolean;
}

export function MultichainBalanceCard({ balance, loading }: MultichainBalanceCardProps) {
  if (loading) {
    return (
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <AppText type="subtitle" style={styles.balanceTitle}>
            Total Balance
          </AppText>
          <View style={styles.chainLogos}>
            <ActivityIndicator size="small" />
          </View>
        </View>

        <View style={styles.balanceContent}>
          <AppText style={styles.totalValue}>$0.00</AppText>
          <AppText style={[styles.changePercent, styles.loadingChangePercent]}>0.00%</AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceHeader}>
        <AppText type="subtitle" style={styles.balanceTitle}>
          Total Balance
        </AppText>
        <View style={styles.chainLogos}>
          {balance?.chains
            ?.slice(0, 5)
            .map((chain: { name: string; logo: string; value: number }, index: number) => (
              <Image
                key={chain.name}
                source={chain.logo}
                style={[styles.chainLogo, index > 0 && styles.chainLogoOverlap]}
                contentFit="cover"
              />
            ))}
        </View>
      </View>

      <View style={styles.balanceContent}>
        <AppText style={styles.totalValue}>{formatCurrency(balance?.totalValue || 0)}</AppText>
        <AppText
          style={[
            styles.changePercent,
            (balance?.changePercent || 0) >= 0 ? styles.positiveChange : styles.negativeChange,
          ]}
        >
          {formatPercent(balance?.changePercent || 0)} (24h)
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fcfcfcff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chainLogos: {
    flexDirection: 'row',
  },
  chainLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  balanceContent: {
    alignItems: 'center',
  },
  totalValue: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  changePercent: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingChangePercent: {
    color: '#666',
  },
  positiveChange: {
    color: '#51cf66',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  chainLogoOverlap: {
    marginLeft: -8,
  },
});
