# Layer3 App - Multi-Chain Web3 Wallet Dashboard

A React Native app built with Expo that provides a comprehensive dashboard for Web3 users, displaying tokens, NFTs, and transactions across multiple blockchain networks.

## Features

- **Multi-Chain Support**: Ethereum, Optimism, Base, Arbitrum, and BNB Smart Chain
- **Token Balances**: Real-time token balances with USD values across all supported chains
- **NFT Gallery**: View NFTs from multiple chains with chain identification
- **Transaction History**: Grouped transaction history with date-based sections
- **Explorer Integration**: Direct links to blockchain explorers for transactions
- **Responsive Design**: Optimized for both mobile and web platforms

## Demo

📱 [View demo](https://drive.google.com/file/d/1kVHVgi4vds8vLvJephLxeo89qcERbHpC/view)

## Screenshots

|  |  |  |  |  |
|-------------|----------------|-----------------|-----------------|-----------------|
| ![Leaderboard](https://github.com/user-attachments/assets/3144f338-0cae-4881-8621-cc86ffe57f92) | ![Detail](https://github.com/user-attachments/assets/3b7d1189-b462-4c38-abbc-1f90e8f0a7ac) | ![Token](https://github.com/user-attachments/assets/5e086cb9-996f-46b9-b492-ee34984cea68) | ![NFT](https://github.com/user-attachments/assets/32f41530-fc4f-4afa-9abb-30f8f221bb36) | ![Transaction](https://github.com/user-attachments/assets/93593c44-8d65-46de-90d9-49daf3a0bea5) |

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm (recommended)](https://pnpm.io/) or npm/yarn
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)

### Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:smohamedjavid/layer3-app.git
   cd layer3-app
   ```

2. Install dependencies using pnpm:

   ```sh
   pnpm install
   ```

3. Edit the `src/constants/config.ts` file and add your API keys:

   ```env
   COVALENT_API_KEY: <COVALENT_API_KEY>
   ALCHEMY_API_KEY: <ALCHEMY_API_KEY>
   ```

> ⚠️ **NOTE**  
> Reason for not using environment variable is that these keys are injected as plain text in build time and it can be searched/extracted from the build. Better approach is to have a API proxy server to prevent clients to using the API keys directly.

### API Keys Setup

This app requires API keys from the following services:

- **Covalent API**: For multi-chain token balances and transaction data
  - Get your API key at: <https://goldrush.dev/>

- **Alchemy API**: For NFT data across multiple chains
  - Get your API key at: <https://www.alchemy.com/>

### Running the App

1. Start the development server:

   ```sh
   pnpm start
   ```

2. Using Expo Go (Physical device)

   - [Download iOS app](https://itunes.apple.com/app/apple-store/id982107779)
   - [Download Android app](https://play.google.com/store/apps/details?id=host.exp.exponent)

   **For iOS Devices:**

   a. Download the Expo Go app from the [App Store](https://itunes.apple.com/app/apple-store/id982107779) on your iOS device

   b. Make sure your iOS device and development machine are on the same Wi-Fi network

   c. After starting the development server, you'll see a QR code in the terminal

   d. Open the Expo Go app on your iOS device and scan the QR code displayed in the terminal

   e. The app will load and you can test it on your physical iOS device

   **For Android Devices:**

   a. Download the Expo Go app from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android device

   b. Make sure your Android device and development machine are on the same Wi-Fi network

   c. After starting the development server, you'll see a QR code in the terminal

   d. Open the Expo Go app on your Android device and scan the QR code displayed in the terminal

   e. The app will load and you can test it on your physical Android device

   **Troubleshooting:**

   - Once the QR code is shown, verify it shows `Using Expo Go` text under QR. If it says `Using development build`, press `s` in your keyboard to switch to Expo Go and try to scan the QR
   - If the QR code doesn't scan, try restarting the development server
   - Ensure both devices are on the same network and firewall isn't blocking connections
   - For iOS, you may need to allow local network access in device settings

3. Build and run development builds:

   ```sh
   pnpm ios      # iOS simulator
   pnpm android  # Android emulator
   ```

## Code Quality

### Linting

The project uses ESLint for code linting with TypeScript and React Native specific rules.

```sh
# Run linting
pnpm lint

# Run linting with auto-fix
pnpm lint:fix
```

### Git Hooks

The project uses Husky and lint-staged to run linting automatically on pre-commit:

- **Pre-commit hook**: Runs ESLint on staged files and automatically fixes issues
- **Configuration**: Located in `.husky/pre-commit` and `package.json` (lint-staged)

### Code Style Rules

- TypeScript strict mode enabled
- React Hooks rules enforced
- React Native specific linting rules
- Automatic style sorting for consistency
- Console statements allowed in development
- Test files have relaxed rules for development convenience

## Testing

### Running Tests

The project includes a comprehensive test suite using Jest and React Native Testing Library.

```sh
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

```text
tests/
├── components/         # Component unit tests
├── utils/              # Utility function tests
├── setup.ts            # Test configuration and mocks
└── __mocks__/          # Mock implementations
```

## Trade-offs Made

### Technical Decisions

1. **Expo vs Bare React Native**
   - **Choice**: Used Expo for faster development and easier deployment
   - **Trade-off**: Limited access to native modules, but gained development speed and cross-platform compatibility

2. **React Query vs Redux/Context**
   - **Choice**: Used React Query for server state management
   - **Trade-off**: Added complexity for simple state needs, but provided excellent caching and synchronization

3. **FlashList vs FlatList**
   - **Choice**: Used FlashList for better performance with large lists
   - **Trade-off**: Additional dependency, but significantly better performance for NFT galleries and transaction lists

### Performance Optimizations

1. **Memoization**: Used useMemo for expensive computations
2. **Virtualization**: FlashList automatically handles list virtualization
3. **Image Optimization**: Used Expo Image with proper contentFit and recyclingKey
4. **Bundle Splitting**: Expo handles code splitting automatically

## What I Would Do Differently With More Time

### Feature Enhancements

1. **Advanced Filtering & Search and Pagination**
   - Add search functionality across tokens, NFTs, and transactions
   - Implement advanced filtering by chain, value, date ranges
   - Add sorting options for different data types
   - Add paginated response for tokens, NFTs and TX history and load the data on scroll

2. **Portfolio Analytics**
   - Add portfolio performance charts and analytics
   - Implement price alerts and notifications
   - Add yield farming and DeFi position tracking

### Technical Improvements

1. **State Management**
   - Consider migrating to Zustand or Redux Toolkit for more complex state
   - Implement proper error boundaries and offline support
   - Add optimistic updates for better UX

2. **Testing & Quality**
   - Add integration tests with Detox
   - Implement visual regression testing
   - Add performance monitoring and error tracking

3. **Developer Experience**
   - Set up CI/CD pipeline with automated testing
   - Add Storybook for component development
   - Implement automated deployment to TestFlight and Play Store

### UI/UX Improvements

- Create a more comprehensive design system
- Add dark mode support
- Implement better loading states and skeletons

## Production Deployment

### EAS Build Setup

1. **Install EAS CLI**:

   ```sh
   npm install -g @expo/eas-cli
   ```

2. **Login to EAS**:

   ```sh
   eas login
   ```

3. **Configure EAS Build**:

   ```sh
   eas build:configure
   ```

### Building for Production

#### iOS App Store

1. **Build iOS Production App**:

   ```sh
   # Build for iOS
   eas build --platform ios --profile production

   # Or build and submit in one command
   eas build --platform ios --profile production --auto-submit
   ```

2. **Manual Submission to App Store Connect**:

   ```sh
   # If not using auto-submit
   eas submit --platform ios --profile production
   ```

3. **App Store Connect Steps**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com/)
   - Select your app
   - Go to "TestFlight" tab
   - Upload the build from EAS
   - Fill out app information, screenshots, and metadata
   - Submit for review

#### Android Google Play Store

1. **Build Android Production App**:

   ```sh
   # Build for Android
   eas build --platform android --profile production

   # Or build and submit in one command
   eas build --platform android --profile production --auto-submit
   ```

2. **Manual Submission to Google Play Console**:

   ```sh
   # If not using auto-submit
   eas submit --platform android --profile production
   ```

3. **Google Play Console Steps**:
   - Go to [Google Play Console](https://play.google.com/console/)
   - Select your app
   - Go to "Production" track
   - Upload the AAB file from EAS
   - Fill out store listing, screenshots, and metadata
   - Submit for review

### Environment Configuration

### Code Signing Setup

#### iOS Code Signing

1. **Create Apple Developer Account** and configure certificates
2. **EAS will handle provisioning profiles automatically**
3. **Or configure manually**:

   ```json
   {
     "ios": {
       "bundleIdentifier": "com.yourcompany.layer3app",
       "buildType": "app-store"
     }
   }
   ```

#### Android Code Signing

1. **Create upload key**:

   ```sh
   keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure in EAS**:

   ```sh
   eas build:configure
   # Follow prompts to upload your keystore
   ```

### Testing Production Builds

#### Internal Testing

1. **iOS TestFlight**:

   ```sh
   # Build for TestFlight
   eas build --platform ios --profile production
   # Upload to TestFlight through App Store Connect
   ```

2. **Android Internal Testing**:

   ```sh
   # Build for internal testing
   eas build --platform android --profile production
   # Upload to Google Play Console Internal Testing track
   ```

#### Build Verification

```sh
# Test production build locally
npx expo run:ios --configuration Release
npx expo run:android --configuration Release
```

### Monitoring and Maintenance

#### Post-Deployment Monitoring

1. **Error Tracking**: Implement Sentry or similar
2. **Analytics**: Set up app analytics (Firebase, Mixpanel, etc.)
3. **Crash Reporting**: Monitor crash reports and fix issues
4. **Performance**: Track app performance metrics

#### Update Process

1. **Version Management**:

   ```json
   // app.json
   {
     "version": "1.1.0",
     "ios": {
       "buildNumber": "1.1.0"
     },
     "android": {
       "versionCode": 2
     }
   }
   ```

2. **Build and Submit Updates**:

   ```sh
   # Build new version
   eas build --platform all --profile production

   # Submit to stores
   eas submit --platform ios --profile production
   eas submit --platform android --profile production
   ```

### Troubleshooting

#### Common Issues

1. **Build Failures**:
   - Check EAS build logs: `eas build:list`
   - Verify environment variables are set correctly
   - Ensure all dependencies are compatible with production builds

2. **Submission Issues**:
   - Verify app metadata is complete
   - Check screenshots meet store requirements
   - Ensure privacy policy and terms are linked

3. **Code Signing Problems**:
   - Regenerate certificates if expired
   - Verify bundle IDs match between code and store
   - Check that upload keys are properly configured

#### Getting Help

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [Expo Forums](https://forums.expo.dev/)
- [App Store Connect Help](https://developer.apple.com/support/app-store-connect/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)

### Future Improvements

1. **Error Tracking**
   - Implement Sentry or similar error monitoring
   - Set up alerts for critical errors
   - Monitor API rate limits and failures

2. **Performance Monitoring**
   - Add analytics tracking (user flows, feature usage)
   - Monitor app performance metrics
   - Track API response times and error rates

3. **User Feedback**
   - Implement in-app feedback system
   - Monitor app store reviews and ratings
   - Set up user support channels

### Scaling Considerations

1. **API Management**
   - Implement API rate limiting and caching
   - Set up API monitoring and alerting
   - Consider API gateway/proxy for better control over API keys (and RPC request)

2. **Database & Storage**
   - Implement proper data caching strategies
   - Set up CDN for static assets
   - Consider offline data synchronization

## Supported Chains

- Ethereum (Mainnet)
- Optimism
- Base
- Arbitrum
- BNB Smart Chain (NFTs coming soon)

## Project Structure

```text
src/
├── components/      # Reusable UI components
├── contexts/        # React Context for state management
├── navigation/      # Navigation configuration and screens
├── types/           # TypeScript type definitions
└── constants/       # App constants and configurations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
