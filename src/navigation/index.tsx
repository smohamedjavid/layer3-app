// Third-party imports
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';

// Local imports
import { RootStackParamList, NavigationOptions } from './types';

// Screen imports
import { ModalBrowser } from './screens/ModalBrowser';
import { NotFound } from './screens/NotFound';
import { UserDetail } from './screens/UserDetail';
import { UserNFTs } from './screens/UserNFTs';
import { UserTokens } from './screens/UserTokens';
import { UserTransactions } from './screens/UserTransactions';
import { UsersList } from './screens/UsersList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer
      theme={DefaultTheme}
      linking={{
        enabled: true,
        prefixes: [createURL('/')],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <Stack.Navigator initialRouteName="UsersList">
        <Stack.Screen
          name="UsersList"
          component={UsersList}
          options={{
            title: 'Leaderboard',
            ...NavigationOptions.defaultHeader,
          }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={({ route }) => ({
            title: route.params?.user?.username || 'User Detail',
            ...NavigationOptions.defaultHeader,
          })}
        />
        <Stack.Screen
          name="UserTokens"
          component={UserTokens}
          options={{
            title: 'Tokens',
            ...NavigationOptions.defaultHeader,
          }}
        />
        <Stack.Screen
          name="UserNFTs"
          component={UserNFTs}
          options={{
            title: 'NFTs',
            ...NavigationOptions.defaultHeader,
          }}
        />
        <Stack.Screen
          name="UserTransactions"
          component={UserTransactions}
          options={{
            title: 'Transactions',
            ...NavigationOptions.defaultHeader,
          }}
        />
        <Stack.Screen
          name="ModalBrowser"
          component={ModalBrowser}
          options={({ route }) => ({
            title: route.params?.title || 'Explorer',
            ...NavigationOptions.defaultHeader,
          })}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{
            title: '404',
            ...NavigationOptions.defaultHeader,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
