// components/photo-gallery/components/ImageGrid.tsx
import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from '../../../styles/globalStyles';
import { ImageData } from '../../../data/imageData';
import { PhotoGalleryStackParamList } from '../../navigation/PhotoGalleryNavigator';

type ImageGridNavigationProp = StackNavigationProp<PhotoGalleryStackParamList, 'Home'>;

interface ImageGridProps {
  images: ImageData[];
  numColumns?: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({ 
  images, 
  numColumns = 2
}) => {
  const navigation = useNavigation<ImageGridNavigationProp>();

  const handleImagePress = (image: ImageData) => {
    navigation.navigate('ImageDetails', { image });
  };

  const renderImageItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity 
      style={globalStyles.gridItem}
      onPress={() => handleImagePress(item)}
    >
      <Image 
        source={{ uri: item.url }} 
        style={globalStyles.gridImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
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
