import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';

import { Pokemon } from '../types';
import { PokeAPIService } from '../api';
import { formatPokemonName, formatPokemonId, getTypeColor } from '../utils';
import { colors, globalStyles } from '../styles';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress, index }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePress = () => {
    onPress(pokemon);
  };

  const imageUrl = PokeAPIService.getPokemonThumbnailUrl(pokemon.id);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 30).duration(300)}
      style={styles.cardContainer}
    >
      <Animated.View style={[styles.pressableContainer, animatedStyle]}>
        <TouchableOpacity
          style={styles.card}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1} // Disable built-in opacity since we handle it with animations
        >
          <View style={styles.imageContainer}>
            {imageLoading && !imageError && (
              <ActivityIndicator 
                size="small" 
                color={colors.primary} 
                style={styles.loadingIndicator}
              />
            )}
            {!imageError ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            ) : (
              <View style={[styles.image, styles.errorImage]}>
                <Text style={styles.errorText}>?</Text>
              </View>
            )}
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
            <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 8,
  },
  pressableContainer: {
    flex: 1,
  },
  card: {
    ...globalStyles.card,
    alignItems: 'center',
    minHeight: 120,
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  errorImage: {
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    color: colors.gray,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    position: 'absolute',
  },
  infoContainer: {
    alignItems: 'center',
  },
  id: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
  },
});

export default PokemonCard;
