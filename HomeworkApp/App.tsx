// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { PhotoGalleryNavigator, CustomDrawerContent, WeatherNavigator } from './components';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          swipeEnabled: true,
          drawerType: 'back',
          overlayColor: 'transparent',
          drawerStyle: {
            width: 250,
          },
        }}
        initialRouteName="PhotoGallery"
      >
        <Drawer.Screen
          name="PhotoGallery"
          component={PhotoGalleryNavigator}
          options={{
            drawerLabel: 'Photo Gallery',
            swipeEnabled: true,
          }}
        />
        <Drawer.Screen
          name="Weather"
          component={WeatherNavigator}
          options={{
            drawerLabel: 'Weather App',
            swipeEnabled: true,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;