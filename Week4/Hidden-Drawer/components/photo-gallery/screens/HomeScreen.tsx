// components/photo-gallery/screens/HomeScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { ImageGridWithSearch } from '../components';
import { globalStyles } from '../../../styles/globalStyles';
import { defaultImageData } from '../../../data/imageData';

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


