import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { AppText } from './AppText';
import { Collectible } from '../types/UserData';
interface CollectibleItemProps {
  item: Collectible;
  variant?: 'compact' | 'detailed';
}

export function CollectibleItem({ item, variant = 'compact' }: CollectibleItemProps) {
  if (variant === 'detailed') {
    return (
      <View style={styles.detailedItem}>
        <Image
          source={item.image}
          recyclingKey={item.uniqueId}
          style={styles.detailedImage}
          contentFit="cover"
          autoplay={false}
        />
        <View style={styles.detailedInfo}>
          <AppText type="defaultSemiBold" style={styles.detailedName} numberOfLines={1}>
            {item.name}
          </AppText>
          <AppText style={styles.detailedId} numberOfLines={1}>
            Token ID: {item.tokenId}
          </AppText>
          <AppText style={styles.detailedChain} numberOfLines={1}>
            <Image source={item.chain_logo_url} style={styles.chainLogo} contentFit="cover" />{' '}
            {item.chain_name}
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.compactItem}>
      <Image source={item.image} style={styles.compactImage} autoplay={false} contentFit="cover" />
      <View style={{ flex: 1 }}>
        <AppText type="defaultSemiBold" numberOfLines={1}>
          {item.name}
        </AppText>
        <AppText style={styles.compactChain}>
          <Image source={item.chain_logo_url} style={styles.chainLogo} contentFit="cover" />{' '}
          {item.chain_name}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Compact variant (for UserDetail sections)
  compactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  compactImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  compactChain: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  // Detailed variant (for UserNFTs grid)
  detailedItem: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  detailedImage: {
    width: '100%',
    height: 150,
  },
  detailedInfo: {
    padding: 12,
  },
  detailedName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  detailedId: {
    fontSize: 12,
    color: '#666',
  },
  detailedChain: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  chainLogo: { width: 10, height: 10, borderRadius: 5 },
});
