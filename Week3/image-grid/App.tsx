// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ImageData } from './data/imageData';
import { HomeScreen } from './components/HomeScreen';
import { ImageDetailsScreen } from './components/ImageDetailsScreen';
import { ImageModalScreen } from './components/ImageModalScreen';

export type StackParamList = {
  Home: undefined;
  ImageDetails: { image: ImageData };
  ImageModal: { image: ImageData };
};

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true, headerTitle: 'Image Gallery' }}
        />
        <Stack.Screen
          name="ImageDetails"
          component={ImageDetailsScreen}
          options={{
            headerShown: true,
            headerTitle: 'Image Details',
            headerBackTitle: 'Gallery',
          }}
        />
        <Stack.Screen
          name="ImageModal"
          component={ImageModalScreen}
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;