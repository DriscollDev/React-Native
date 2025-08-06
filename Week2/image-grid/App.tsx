// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import ImageGridWithSearch from './components/ImageGridWithSearch';
import { globalStyles } from './styles/globalStyles';
import { defaultImageData } from './data/imageData';

const App = () => {
  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <ImageGridWithSearch 
        images={defaultImageData}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default App;