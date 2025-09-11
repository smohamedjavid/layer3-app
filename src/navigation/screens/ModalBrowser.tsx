// React Native imports
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// Third-party imports
import { useRoute, RouteProp } from '@react-navigation/native';

// Local imports
import { RootStackParamList } from '../types';

type ModalBrowserRouteProp = RouteProp<RootStackParamList, 'ModalBrowser'>;

export function ModalBrowser() {
  const route = useRoute<ModalBrowserRouteProp>();
  const { url } = route.params;

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.modalContainer}>
      <WebView source={{ uri: url }} style={styles.webView} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webView: {
    flex: 1,
  },
});
