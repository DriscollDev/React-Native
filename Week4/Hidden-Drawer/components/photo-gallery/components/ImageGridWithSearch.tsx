// components/photo-gallery/components/ImageGridWithSearch.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import ImageGrid from './ImageGrid';
import Search from './Search';
import { globalStyles } from '../../../styles/globalStyles';
import { ImageData } from '../../../data/imageData';

interface ImageGridWithSearchProps {
  images: ImageData[];
  numColumns?: number;
}

const ImageGridWithSearch: React.FC<ImageGridWithSearchProps> = ({ 
  images, 
  numColumns = 2
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = images.filter(image =>
    image.id.toString().includes(searchQuery)
  );

  return (
    <View style={globalStyles.container}>
      <Search 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search by image ID"
      />
      <ImageGrid 
        images={filteredImages}
        numColumns={numColumns}
      />
    </View>
  );
};

export default ImageGridWithSearch;
