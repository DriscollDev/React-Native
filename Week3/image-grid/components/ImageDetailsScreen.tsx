// components/ImageDetailsScreen.tsx
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../App';
import { globalStyles, Colors, Spacing, FontSizes } from '../styles/globalStyles';

type ImageDetailsScreenRouteProp = RouteProp<StackParamList, 'ImageDetails'>;
type ImageDetailsScreenNavigationProp = StackNavigationProp<StackParamList, 'ImageDetails'>;

export const ImageDetailsScreen: React.FC = () => {
  const route = useRoute<ImageDetailsScreenRouteProp>();
  const navigation = useNavigation<ImageDetailsScreenNavigationProp>();
  const { image } = route.params;

  const handleImagePress = () => {
    navigation.navigate('ImageModal', { image });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
        <Image 
          source={{ uri: image.url }} 
          style={styles.detailImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <View style={styles.infoContainer}>
        <Text style={styles.imageUrl}>{image.url}</Text>
        <Text style={styles.instructionText}>
          Tap the image to view it in full screen
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: Spacing.lg,
  },
  detailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageUrl: {
    fontSize: FontSizes.medium,
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    fontWeight: '500',
  },
  instructionText: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});


