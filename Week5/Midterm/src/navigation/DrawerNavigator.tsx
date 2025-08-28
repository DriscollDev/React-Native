import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import QRScannerStackNavigator from './QRScannerStackNavigator';
import { QRScannerScreen } from '../screens';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right', // Right-side drawer as requested
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#f8f9fa',
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        drawerActiveTintColor: '#2196F3',
        drawerInactiveTintColor: '#666',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'QR Scanner App',
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{
          title: 'QR Scanner',
          drawerLabel: 'QR Code Scanner',
        }}
      />
    </Drawer.Navigator>
  );
}
