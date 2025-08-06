// components/ImageGrid.tsx
import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { ImageData } from '../data/imageData';

interface ImageGridProps {
  images: ImageData[];
  numColumns?: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({ 
  images, 
  numColumns = 2
}) => {
  const renderImageItem = ({ item }: { item: ImageData }) => (
    <View style={globalStyles.gridItem}>
      <Image 
        source={{ uri: item.url }} 
        style={globalStyles.gridImage}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={globalStyles.gridContainer}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? globalStyles.gridRow : undefined}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ImageGrid;
