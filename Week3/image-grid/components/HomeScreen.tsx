// components/HomeScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import ImageGridWithSearch from './ImageGridWithSearch';
import { globalStyles } from '../styles/globalStyles';
import { defaultImageData } from '../data/imageData';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <ImageGridWithSearch 
        images={defaultImageData}
        numColumns={2}
      />
    </SafeAreaView>
  );
};


