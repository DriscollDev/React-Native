// components/weather/navigation/WeatherNavigator.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WeatherNavigatorParamList } from '../../../types/weather';
import { CurrentWeatherScreen } from '../screens/CurrentWeatherScreen';
import { ForecastScreen } from '../screens/ForecastScreen';

const Drawer = createDrawerNavigator<WeatherNavigatorParamList>();

export const WeatherNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerPosition: 'left',
        swipeEnabled: true,
        drawerType: 'front',
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#666',
        drawerStyle: {
          backgroundColor: '#f8f9fa',
          width: 250,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
      }}
      initialRouteName="CurrentWeather"
    >
      <Drawer.Screen
        name="CurrentWeather"
        component={CurrentWeatherScreen}
        options={{
          drawerLabel: 'Current Weather',
          title: 'Current Weather',
        }}
      />
      <Drawer.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{
          drawerLabel: 'Forecast',
          title: 'Weather Forecast',
        }}
      />
    </Drawer.Navigator>
  );
};
