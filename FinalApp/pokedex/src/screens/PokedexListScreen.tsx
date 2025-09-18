import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { PokemonCard } from '../components';
import { PokeAPIService } from '../api';
import { Pokemon, PokedexStackParamList } from '../types';
import { colors, globalStyles } from '../styles';

type PokedexListScreenNavigationProp = StackNavigationProp<
  PokedexStackParamList,
  'PokedexList'
>;

interface Props {
  navigation: PokedexListScreenNavigationProp;
}

const PokedexListScreen: React.FC<Props> = ({ navigation }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadPokemon = useCallback(async () => {
    try {
      setError(null);
      const pokemonList = await PokeAPIService.getPokemonList(151, 0); // First 151 Pokemon
      setPokemon(pokemonList);
      setFilteredPokemon(pokemonList);
    } catch (err) {
      setError('Failed to load Pokémon. Please try again.');
      console.error('Error loading Pokemon:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPokemon(pokemon);
    } else {
      const filtered = pokemon.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toString().includes(searchQuery)
      );
      setFilteredPokemon(filtered);
    }
  }, [searchQuery, pokemon]);

  const handlePokemonPress = useCallback(async (selectedPokemon: Pokemon) => {
    try {
      // Fetch detailed Pokemon data before navigating
      const detailedPokemon = await PokeAPIService.getPokemonDetails(selectedPokemon.id);
      navigation.navigate('PokemonDetail', { 
        pokemon: { ...selectedPokemon, ...detailedPokemon } 
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to load Pokémon details. Please try again.');
      console.error('Error loading Pokemon details:', err);
    }
  }, [navigation]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadPokemon();
  };

  const renderPokemonCard = useCallback(({ item, index }: { item: Pokemon; index: number }) => (
    <PokemonCard
      pokemon={item}
      onPress={handlePokemonPress}
      index={index}
    />
  ), [handlePokemonPress]);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 140, // Approximate height of each item
    offset: 140 * Math.floor(index / 2), // Accounting for 2 columns
    index,
  }), []);

  const renderHeader = () => (
    <Animated.View entering={FadeIn.duration(600)} style={styles.searchContainer}>
      <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.gray}
      />
      {searchQuery.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color={colors.gray}
          style={styles.clearIcon}
          onPress={() => setSearchQuery('')}
        />
      )}
    </Animated.View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={64} color={colors.gray} />
      <Text style={styles.emptyText}>
        {searchQuery ? 'No Pokémon found' : 'No Pokémon available'}
      </Text>
      {searchQuery && (
        <Text style={styles.emptySubtext}>
          Try searching with a different name or number
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading Pokédex...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.errorContainer}>
        <Ionicons name="warning" size={64} color={colors.red} />
        <Text style={globalStyles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={loadPokemon}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={filteredPokemon}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => `pokemon-${item.id}`}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...globalStyles.shadow,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  clearIcon: {
    marginLeft: 12,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray,
  },
  retryText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
});

export default PokedexListScreen;
