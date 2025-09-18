# Pokédex App

A comprehensive cross-platform mobile application built with React Native and Expo that displays Pokémon data from the PokeAPI. The app features a responsive design, smooth animations, and allows users to browse and favorite Pokémon.

## Features

### Core Features
- **Complete Pokédex**: Browse all 151 original Pokémon with detailed information
- **Search Functionality**: Search Pokémon by name or ID number
- **Favorites System**: Save your favorite Pokémon with local storage
- **Detailed Pokemon View**: View comprehensive information including:
  - High-quality official artwork
  - Types with color-coded badges
  - Physical attributes (height, weight)
  - Abilities (including hidden abilities)
  - Base stats with animated progress bars
  - Pokémon descriptions
- **External Links**: Open Bulbapedia pages for additional information

### User Interface
- **Tab Navigation**: Easy navigation between Pokédex and Favorites
- **Responsive Design**: Optimized for different screen sizes
- **Smooth Animations**: Enhanced user experience with React Native Reanimated
- **Pull-to-Refresh**: Refresh data with intuitive gestures
- **Loading States**: Proper loading indicators throughout the app
- **Error Handling**: Graceful error handling with retry options

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Local Storage**: Persistent favorites using AsyncStorage
- **API Integration**: Efficient data fetching from PokeAPI
- **Performance Optimized**: FlatList for smooth scrolling with large datasets
- **Cross-Platform**: Works on both iOS and Android

## Project Structure

```
src/
├── api/               # API services and HTTP requests
│   ├── pokeAPI.ts    # PokeAPI service functions
│   └── index.ts
├── components/        # Reusable UI components
│   ├── LoadingScreen.tsx
│   ├── PokemonCard.tsx
│   ├── SharedElement.tsx
│   ├── StatBar.tsx
│   ├── TypeBadge.tsx
│   └── index.ts
├── navigation/        # Navigation configuration
│   ├── AppNavigator.tsx
│   └── index.ts
├── screens/          # Screen components
│   ├── FavoritesScreen.tsx
│   ├── PokedexListScreen.tsx
│   ├── PokemonDetailScreen.tsx
│   └── index.ts
├── styles/           # Global styles and theme
│   ├── globalStyles.ts
│   └── index.ts
├── types/            # TypeScript type definitions
│   ├── pokemon.ts
│   └── index.ts
├── utils/            # Utility functions and helpers
│   ├── pokemon.ts
│   ├── storage.ts
│   └── index.ts
└── index.ts
```

## Dependencies

### Core Dependencies
- `expo`: Expo platform and tools
- `react`: React library
- `react-native`: React Native framework
- `@react-navigation/native`: Navigation framework
- `@react-navigation/bottom-tabs`: Tab navigation
- `@react-navigation/stack`: Stack navigation

### UI and Animation
- `react-native-reanimated`: Advanced animations
- `react-native-gesture-handler`: Gesture handling
- `react-native-screens`: Native screen optimization
- `react-native-safe-area-context`: Safe area handling
- `@expo/vector-icons`: Icon library

### Data and Storage
- `@react-native-async-storage/async-storage`: Local storage
- `expo-web-browser`: External link handling

### Additional
- `react-native-svg`: SVG support
- `@react-native-masked-view/masked-view`: Masked views

## API Reference

The app uses the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data:

- **Pokémon List**: `/pokemon?limit=151&offset=0`
- **Pokémon Details**: `/pokemon/{id}`
- **Pokémon Species**: `/pokemon-species/{id}`

## Component Documentation

### PokemonCard
A reusable card component for displaying Pokémon in lists.
- Animated entrance effects
- Touch feedback with scale animation
- Error handling for image loading

### TypeBadge
Displays Pokémon types with appropriate colors.
- Configurable sizes (small, medium, large)
- Color-coded based on type

### StatBar
Animated progress bar for displaying Pokémon stats.
- Smooth animation on mount
- Color-coded based on stat value
- Customizable maximum value

### LoadingScreen
Consistent loading screen with animation.
- Customizable message
- Smooth fade-in animation

## Screens

### PokedexListScreen
- Displays grid of Pokémon cards
- Search functionality
- Pull-to-refresh
- Staggered animations on load

### PokemonDetailScreen
- Comprehensive Pokémon information
- Favorite toggle with animation
- External link to Bulbapedia
- Share functionality
- Animated stats and smooth transitions

### FavoritesScreen
- Displays saved favorite Pokémon
- Empty state with helpful message
- Refreshable list

## Animations

The app features several types of animations:

1. **List Animations**: Staggered fade-in effects for Pokémon cards
2. **Touch Feedback**: Scale and opacity animations on press
3. **Screen Transitions**: Smooth navigation between screens
4. **Stat Bars**: Animated progress bars for Pokémon stats
5. **Favorite Toggle**: Heart animation with scale and rotation
6. **Loading States**: Smooth loading indicators


### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Package version conflicts**
   ```bash
   npx expo install --fix
   ```

3. **iOS simulator issues**
   ```bash
   npx expo run:ios
   ```

4. **Android emulator issues**
   ```bash
   npx expo run:android
   ```

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing comprehensive Pokémon data
- [Expo](https://expo.dev/) for the excellent development platform
- [React Navigation](https://reactnavigation.org/) for navigation framework
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) for animations
- [Claude Sonnet 4]() for Documentation (this readme and code comments), styling assistance, and formatting fixes for the bulbapedia weblink
