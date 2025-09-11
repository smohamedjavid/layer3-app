// React Native imports
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Third-party imports
import { Text, Button } from '@react-navigation/elements';

export function NotFound() {
  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.safeArea}>
      <View style={styles.container}>
        <Text>404</Text>
        <Button screen="UsersList" params={{}}>
          Go to Home
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
