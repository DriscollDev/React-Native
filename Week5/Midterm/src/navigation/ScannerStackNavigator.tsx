import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QRScannerScreen from '../screens/QRScannerScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

// Define parameter types for the scanner stack screens
export type ScannerStackParamList = {
  QRScanner: undefined;
  ProductDetail: { url: string };
};

// Create stack navigator with typed parameters
const Stack = createStackNavigator<ScannerStackParamList>();

// Stack navigator for QR scanning flow - handles QR Scanner and Product Detail screens
export default function ScannerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Initial screen - QR Code Scanner */}
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
      />
      {/* Product details screen - shown after successful QR scan */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
}
