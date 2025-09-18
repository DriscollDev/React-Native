import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '../types';

const FAVORITES_KEY = '@pokedex_favorites';

export class StorageService {
  static async getFavorites(): Promise<Pokemon[]> {
    try {
      const favoritesJSON = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJSON ? JSON.parse(favoritesJSON) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  static async addToFavorites(pokemon: Pokemon): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const isAlreadyFavorite = favorites.some(fav => fav.id === pokemon.id);
      
      if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, pokemon];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  static async removeFromFavorites(pokemonId: number): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter(fav => fav.id !== pokemonId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  static async isFavorite(pokemonId: number): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.id === pokemonId);
    } catch (error) {
      console.error('Error checking if favorite:', error);
      return false;
    }
  }
}
