import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ScannerStackNavigator, { ScannerStackParamList } from './ScannerStackNavigator';
import FavoritesScreen from '../screens/FavoritesScreen';
import { NavigatorScreenParams } from '@react-navigation/native';

// Define the tab parameter list for type safety
export type TabParamList = {
  ScannerStack: NavigatorScreenParams<ScannerStackParamList>;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Main tab navigator component with QR Scanner and Favorites tabs
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure tab icons based on focused state
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          // Set appropriate icons for each tab
          if (route.name === 'ScannerStack') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      {/* Scanner Stack Tab - Contains QR Scanner and Product Detail screens */}
      <Tab.Screen
        name="ScannerStack"
        component={ScannerStackNavigator}
        options={{
          headerShown: false,
          title: 'Scanner',
          freezeOnBlur: true, 
          popToTopOnBlur: true, 
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent the default tab press action
            e.preventDefault();

            // Always navigate to the QR Scanner screen when tab is pressed
            navigation.navigate('ScannerStack', {
              screen: 'QRScanner',
            });
          },
        })}
      />
      {/* Favorites Tab - Shows saved favorite products */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'My Favorites',
        }}
      />
    </Tab.Navigator>
  );
}
