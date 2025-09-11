# Layer3 App - Multi-Chain Web3 Wallet Dashboard

A React Native app built with Expo that provides a comprehensive dashboard for Web3 users, displaying tokens, NFTs, and transactions across multiple blockchain networks.

## Features

- **Multi-Chain Support**: Ethereum, Optimism, Base, Arbitrum, and BNB Smart Chain
- **Token Balances**: Real-time token balances with USD values across all supported chains
- **NFT Gallery**: View NFTs from multiple chains with chain identification
- **Transaction History**: Grouped transaction history with date-based sections
- **Explorer Integration**: Direct links to blockchain explorers for transactions
- **Responsive Design**: Optimized for both mobile and web platforms

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

1. **Advanced Filtering & Search**
   - Add search functionality across tokens, NFTs, and transactions
   - Implement advanced filtering by chain, value, date ranges
   - Add sorting options for different data types

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

### Deployment Steps

#### Mobile App Stores

1. **iOS App Store**

   ```sh
   # Build production iOS app
   pnpm ios --production

   # Archive and upload to App Store Connect
   # Use Xcode or eas build for automated deployment
   ```

2. **Google Play Store**

   ```sh
   # Build production Android app
   pnpm android --production

   # Generate signed APK/AAB
   # Upload to Google Play Console
   ```

### Production Monitoring

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
   - Consider API gateway/proxy for better control over API keys

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

## Architecture

- **React Native + Expo**: Cross-platform mobile development
- **React Navigation**: Navigation and routing
- **TypeScript**: Type-safe development
- **FlashList**: High-performance list rendering
- **Context API**: State management for user data

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

---
