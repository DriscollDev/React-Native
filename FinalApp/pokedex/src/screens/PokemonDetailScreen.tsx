import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { TypeBadge, StatBar } from '../components';
import { PokeAPIService } from '../api';
import { StorageService } from '../utils';
import { Pokemon, PokedexStackParamList, PokemonSpecies } from '../types';
import { 
  formatPokemonName, 
  formatPokemonId, 
  convertHeight, 
  convertWeight,
  getTypeColor 
} from '../utils';
import { colors, globalStyles } from '../styles';

type PokemonDetailScreenNavigationProp = StackNavigationProp<
  PokedexStackParamList,
  'PokemonDetail'
>;

type PokemonDetailScreenRouteProp = RouteProp<
  PokedexStackParamList,
  'PokemonDetail'
>;

interface Props {
  navigation: PokemonDetailScreenNavigationProp;
  route: PokemonDetailScreenRouteProp;
}

const PokemonDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { pokemon: initialPokemon } = route.params;
  const [pokemon, setPokemon] = useState<Pokemon>(initialPokemon);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const favoriteScale = useSharedValue(1);
  const favoriteRotation = useSharedValue(0);

  const favoriteAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: favoriteScale.value },
        { rotate: `${favoriteRotation.value}deg` },
      ],
    };
  });

  useEffect(() => {
    loadPokemonData();
    checkFavoriteStatus();
  }, []);

  const loadPokemonData = async () => {
    try {
      if (!pokemon.types || !pokemon.abilities) {
        const detailedPokemon = await PokeAPIService.getPokemonDetails(pokemon.id);
        setPokemon(detailedPokemon);
      }
      
      const speciesData = await PokeAPIService.getPokemonSpecies(pokemon.id);
      setSpecies(speciesData);
    } catch (error) {
      console.error('Error loading Pokemon data:', error);
      Alert.alert('Error', 'Failed to load Pokémon details');
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    const favorite = await StorageService.isFavorite(pokemon.id);
    setIsFavorite(favorite);
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await StorageService.removeFromFavorites(pokemon.id);
        setIsFavorite(false);
      } else {
        await StorageService.addToFavorites(pokemon);
        setIsFavorite(true);
      }
      
      // Animate the heart
      favoriteScale.value = withSpring(1.3, {}, () => {
        favoriteScale.value = withSpring(1);
      });
      favoriteRotation.value = withSpring(isFavorite ? 0 : 360, {}, () => {
        favoriteRotation.value = 0;
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const openBulbapedia = async () => {
    console.log('openBulbapedia function called!');
    
    const url = PokeAPIService.getBulbapediaUrl(pokemon.name);
    console.log('Pokemon name:', pokemon.name);
    console.log('Generated Bulbapedia URL:', url);
    
    try {
      // Use WebBrowser for in-app browsing only
      console.log('Attempting to open with WebBrowser...');
      const result = await WebBrowser.openBrowserAsync(url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
        controlsColor: colors.primary,
        toolbarColor: colors.primary,
        showTitle: true,
      });
      
      console.log('WebBrowser result:', result);
      
      // The user can use the Safari button in the WebBrowser if they want external browser
      return;
      
    } catch (webBrowserError) {
      console.log('WebBrowser failed:', webBrowserError);
    }
  };

  const getFlavorText = (): string => {
    if (!species?.flavor_text_entries) return '';
    
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    
    return englishEntry?.flavor_text.replace(/\f|\n/g, ' ') || '';
  };

  const primaryType = pokemon.types?.[0]?.type.name || 'normal';
  const typeColor = getTypeColor(primaryType);
  const imageUrl = PokeAPIService.getPokemonImageUrl(pokemon.id);

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Pokemon Image */}
      <Animated.View 
        entering={FadeInUp.duration(800)}
        style={[styles.header, { backgroundColor: typeColor }]}
      >
        <View style={styles.headerActions}>
          <View>
            <Animated.View style={favoriteAnimatedStyle}>
              <TouchableOpacity onPress={toggleFavorite} style={styles.actionButton}>
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={24} 
                  color={colors.white} 
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator size="large" color={colors.white} style={styles.imageLoader} />
          )}
          <Image
            source={{ uri: imageUrl }}
            style={styles.pokemonImage}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </View>

        <Text style={styles.pokemonId}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.pokemonName}>{formatPokemonName(pokemon.name)}</Text>
      </Animated.View>

      {/* Content */}
      <Animated.View entering={SlideInDown.delay(400).duration(800)} style={styles.content}>
        {/* Types */}
        {pokemon.types && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Types</Text>
            <View style={styles.typesContainer}>
              {pokemon.types.map((type, index) => (
                <TypeBadge key={index} typeName={type.type.name} size="large" />
              ))}
            </View>
          </View>
        )}

        {/* Basic Info */}
        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Attributes</Text>
          <View style={styles.attributesContainer}>
            <View style={styles.attribute}>
              <Text style={styles.attributeLabel}>Height</Text>
              <Text style={styles.attributeValue}>
                {pokemon.height ? convertHeight(pokemon.height) : 'Unknown'}
              </Text>
            </View>
            <View style={styles.attribute}>
              <Text style={styles.attributeLabel}>Weight</Text>
              <Text style={styles.attributeValue}>
                {pokemon.weight ? convertWeight(pokemon.weight) : 'Unknown'}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Description */}
        {!loading && species && (
          <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{getFlavorText()}</Text>
          </Animated.View>
        )}

        {/* Abilities */}
        {pokemon.abilities && (
          <Animated.View entering={FadeInDown.delay(1000).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Abilities</Text>
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((ability, index) => (
                <View key={index} style={styles.abilityItem}>
                  <Text style={styles.abilityName}>
                    {formatPokemonName(ability.ability.name)}
                  </Text>
                  {ability.is_hidden && (
                    <Text style={styles.hiddenAbilityText}>(Hidden)</Text>
                  )}
                </View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Stats */}
        {pokemon.stats && (
          <Animated.View entering={FadeInDown.delay(1200).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            <View style={styles.statsContainer}>
              {pokemon.stats.map((stat, index) => (
                <StatBar
                  key={index}
                  statName={stat.stat.name}
                  statValue={stat.base_stat}
                />
              ))}
            </View>
          </Animated.View>
        )}
      </Animated.View>

      {/* External Link - Moved outside content container to avoid touch interference */}
      <Animated.View 
        entering={FadeInDown.delay(1400).duration(600)} 
        style={[styles.section, { paddingHorizontal: 20, paddingBottom: 20, backgroundColor: colors.background }]}
      >
        <TouchableOpacity 
          style={styles.bulbapediaButton} 
          onPress={openBulbapedia}
          activeOpacity={0.7}
        >
          <Ionicons name="globe-outline" size={20} color={colors.white} />
          <Text style={styles.bulbapediaText}>View on Bulbapedia</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  headerActions: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  actionButton: {
    padding: 8,
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageLoader: {
    position: 'absolute',
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  pokemonId: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    opacity: 0.8,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 40,
    overflow: 'visible', // Ensure nothing is clipped
    zIndex: 1, // Add explicit z-index
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  attributesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    ...globalStyles.shadow,
  },
  attribute: {
    alignItems: 'center',
  },
  attributeLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  attributeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  abilitiesContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  abilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  hiddenAbilityText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  statsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  bulbapediaButton: {
    ...globalStyles.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  bulbapediaText: {
    ...globalStyles.buttonText,
    marginLeft: 8,
  },
});

export default PokemonDetailScreen;
