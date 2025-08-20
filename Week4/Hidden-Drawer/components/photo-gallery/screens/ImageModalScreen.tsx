// components/photo-gallery/screens/ImageModalScreen.tsx
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { PhotoGalleryStackParamList } from '../../navigation/PhotoGalleryNavigator';
import { Colors } from '../../../styles/globalStyles';

type ImageModalScreenRouteProp = RouteProp<PhotoGalleryStackParamList, 'ImageModal'>;
type ImageModalScreenNavigationProp = StackNavigationProp<PhotoGalleryStackParamList, 'ImageModal'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ImageModalScreen: React.FC = () => {
  const route = useRoute<ImageModalScreenRouteProp>();
  const navigation = useNavigation<ImageModalScreenNavigationProp>();
  const { image } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.overlay} 
        onPress={handleClose}
        activeOpacity={1}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image.url }} 
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleClose}
        >
          <Ionicons name="close" size={30} color={Colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


