// components/navigation/PhotoGalleryNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageData } from '../../data/imageData';
import { HomeScreen, ImageDetailsScreen, ImageModalScreen } from '../photo-gallery/screens';

export type PhotoGalleryStackParamList = {
  Home: undefined;
  ImageDetails: { image: ImageData };
  ImageModal: { image: ImageData };
};

const PhotoGalleryStack = createStackNavigator<PhotoGalleryStackParamList>();

export const PhotoGalleryNavigator: React.FC = () => {
  return (
    <PhotoGalleryStack.Navigator screenOptions={{ headerShown: false }}>
      <PhotoGalleryStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true, headerTitle: 'Image Gallery' }}
      />
      <PhotoGalleryStack.Screen
        name="ImageDetails"
        component={ImageDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Image Details',
          headerBackTitle: 'Gallery',
        }}
      />
      <PhotoGalleryStack.Screen
        name="ImageModal"
        component={ImageModalScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </PhotoGalleryStack.Navigator>
  );
};
