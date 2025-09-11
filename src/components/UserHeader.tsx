import React from 'react';

// React Native imports
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

// Local imports
import { AppText } from './AppText';
import { User } from '../types/User';
import { formatAddress } from '../utils/formatters';

interface UserHeaderProps {
  user: User;
}

export function UserHeader({ user }: UserHeaderProps) {
  return (
    <>
      <View style={styles.header}>
        <Image
          source={`https://ipfs.io/ipfs/${user.avatarCid}`}
          style={styles.avatar}
          contentFit="cover"
        />
        <AppText type="title">{user.username}</AppText>
        <AppText type="defaultSemiBold" style={[styles.pill, styles.address]}>
          {formatAddress(user.address, 6, 4)}
        </AppText>
      </View>
      <View style={styles.details}>
        <AppText type="defaultSemiBold" style={[styles.pill, styles.xp]}>
          XP: {user.xp}
        </AppText>
        <AppText type="defaultSemiBold" style={[styles.pill, styles.level]}>
          Level: {user.level}
        </AppText>
        <AppText type="defaultSemiBold" style={[styles.pill, styles.streak]}>
          GM Streak: {user.gmStreak}
        </AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  address: {
    backgroundColor: 'rgba(200, 200, 200, 0.47)',
    marginTop: 4,
  },
  avatar: {
    borderRadius: 40,
    height: 80,
    marginBottom: 10,
    width: 80,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
  level: {
    backgroundColor: 'rgba(111, 173, 102, 0.47)',
  },
  pill: {
    borderRadius: 12,
    paddingBottom: 4,
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  streak: {
    backgroundColor: 'rgba(102, 116, 173, 0.47)',
  },
  xp: {
    backgroundColor: 'rgba(173, 120, 102, 0.47)',
  },
});
