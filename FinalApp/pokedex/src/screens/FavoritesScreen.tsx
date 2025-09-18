import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { PokemonCard } from '../components';
import { StorageService } from '../utils';
import { PokeAPIService } from '../api';
import { Pokemon, FavoritesStackParamList } from '../types';
import { colors, globalStyles } from '../styles';

type FavoritesScreenNavigationProp = StackNavigationProp<
  FavoritesStackParamList,
  'PokedexList'
>;

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async () => {
    try {
      const favoritePokemon = await StorageService.getFavorites();
      setFavorites(favoritePokemon);
    } catch (error) {
      console.error('Error loading favorites:', error);
      Alert.alert('Error', 'Failed to load favorite Pokémon');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadFavorites();
  };

  const handlePokemonPress = async (selectedPokemon: Pokemon) => {
    try {
      // Fetch detailed Pokemon data if not already available
      let detailedPokemon = selectedPokemon;
      if (!selectedPokemon.types || !selectedPokemon.abilities) {
        detailedPokemon = await PokeAPIService.getPokemonDetails(selectedPokemon.id);
      }
      
      navigation.navigate('PokemonDetail', { 
        pokemon: { ...selectedPokemon, ...detailedPokemon } 
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to load Pokémon details. Please try again.');
      console.error('Error loading Pokemon details:', err);
    }
  };

  const renderPokemonCard = ({ item, index }: { item: Pokemon; index: number }) => (
    <PokemonCard
      pokemon={item}
      onPress={handlePokemonPress}
      index={index}
    />
  );

  const renderEmpty = () => (
    <Animated.View entering={FadeIn.duration(600)} style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color={colors.gray} />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Add some Pokémon to your favorites by tapping the heart icon on their detail page
      </Text>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={favorites}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContainer,
          favorites.length === 0 && styles.emptyListContainer
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    paddingTop: 16,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray,
  },
});

export default FavoritesScreen;
