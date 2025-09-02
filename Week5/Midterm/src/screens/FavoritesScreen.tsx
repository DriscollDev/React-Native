import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Product, LegacyProduct } from '../types';

// Type guard to check if product uses new format vs legacy format
const isNewProduct = (product: Product | LegacyProduct): product is Product => {
  return 'thumbnail' in product || 'images' in product;
};

// Favorites screen - displays saved favorite products with navigation to details
export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<(Product | LegacyProduct)[]>([]);

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Reload favorites when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Navigate to product detail screen in the Scanner tab
  const navigateToProduct = (product: Product | LegacyProduct) => {
    // Navigate to the ProductDetail screen in the Scanner tab
    (navigation as any).navigate('ScannerStack', {
      screen: 'ProductDetail',
      params: { url: `https://dummyjson.com/products/${product.id}` }
    });
  };

  // Render individual favorite item in the list
  const renderFavoriteItem = ({ item }: { item: Product | LegacyProduct }) => {
    const imageUri = isNewProduct(item) 
      ? (item.thumbnail || item.images[0]) 
      : item.image;
    
    const ratingValue = isNewProduct(item) 
      ? item.rating 
      : item.rating.rate;
    
    const reviewCount = isNewProduct(item) 
      ? item.reviews.length 
      : item.rating.count;

    return (
      <TouchableOpacity
        style={styles.favoriteItem}
        onPress={() => navigateToProduct(item)}
      >
        <Image source={{ uri: imageUri }} style={styles.itemImage} resizeMode="contain" />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#ffc107" />
            <Text style={styles.rating}>
              {typeof ratingValue === 'number' ? ratingValue.toFixed(1) : ratingValue} ({reviewCount})
            </Text>
          </View>
        </View>
        <View style={styles.heartContainer}>
          <Ionicons name="heart" size={20} color="#ff4757" />
        </View>
      </TouchableOpacity>
    );
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Scan products and mark them as favorites to see them here
        </Text>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => (navigation as any).navigate('ScannerStack')}
        >
          <Text style={styles.scanButtonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      <Text style={styles.subtitle}>{favorites.length} favorite products</Text>
      
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 3,
    fontSize: 14,
    color: '#666',
  },
  heartContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  scanButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
