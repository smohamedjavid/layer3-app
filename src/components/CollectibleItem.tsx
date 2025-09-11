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
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 4,
    padding: 8,
  },
  compactImage: {
    borderRadius: 6,
    height: 60,
    marginRight: 12,
    width: 60,
  },
  compactChain: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },

  // Detailed variant (for UserNFTs grid)
  detailedItem: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    margin: 8,
    overflow: 'hidden',
  },
  detailedImage: {
    height: 150,
    width: '100%',
  },
  detailedInfo: {
    padding: 12,
  },
  detailedName: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailedId: {
    color: '#666',
    fontSize: 12,
  },
  detailedChain: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  chainLogo: { borderRadius: 5, height: 10, width: 10 },
});
