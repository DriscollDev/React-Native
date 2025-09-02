import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Product, LegacyProduct } from '../types';

// Route parameters type definition
type ProductDetailRouteParams = {
  ProductDetail: {
    url: string;
  };
};

// Product Detail screen - displays detailed product information and handles favorites
export default function ProductDetailScreen() {
  const route = useRoute<RouteProp<ProductDetailRouteParams, 'ProductDetail'>>();
  const navigation = useNavigation();
  
  // State variables for product data and favorites
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const productUrl = route.params?.url;

  // Fetch product data and check favorite status on component mount
  useEffect(() => {
    if (productUrl) {
      fetchProduct();
      checkIfFavorite();
    }
  }, [productUrl]);

  // Fetch product details from the provided URL
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(productUrl);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      Alert.alert('Error', 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  // Check if current product is in favorites list
  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoritesArray = JSON.parse(favorites);
        const productId = extractProductIdFromUrl(productUrl);
        setIsFavorite(favoritesArray.some((fav: Product) => fav.id === productId));
      }
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  // Extract product ID from URL for favorite checking
  const extractProductIdFromUrl = (url: string): number => {
    const match = url.match(/\/products\/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Toggle product favorite status in AsyncStorage
  const toggleFavorite = async () => {
    if (!product) return;

    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        // Remove product from favorites
        favoritesArray = favoritesArray.filter((fav: Product) => fav.id !== product.id);
        setIsFavorite(false);
      } else {
        // Add product to favorites
        favoritesArray.push(product);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    } catch (error) {
      console.error('Error updating favorites:', error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  // Show loading indicator while fetching product data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load product</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#ff4757" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail || product.images[0] }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#ffc107" />
          <Text style={styles.rating}>
            {product.rating.toFixed(1)} ({product.reviews.length} reviews)
          </Text>
        </View>

        <Text style={styles.category}>Category: {product.category}</Text>
        
        {product.brand && (
          <Text style={styles.brand}>Brand: {product.brand}</Text>
        )}
        
        <View style={styles.stockContainer}>
          <Text style={[styles.stock, { color: product.stock > 0 ? '#27ae60' : '#e74c3c' }]}>
            {product.availabilityStatus} - {product.stock} in stock
          </Text>
        </View>
        
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        {product.reviews.length > 0 && (
          <>
            <Text style={styles.reviewsTitle}>Customer Reviews</Text>
            {product.reviews.slice(0, 3).map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                  <View style={styles.reviewRating}>
                    <Ionicons name="star" size={12} color="#ffc107" />
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 30,
    alignItems: 'center',
  },
  productImage: {
    width: 250,
    height: 250,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 30,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  category: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 10,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: '500',
  },
  stockContainer: {
    marginBottom: 20,
  },
  stock: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reviewItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    marginLeft: 3,
    fontSize: 12,
    color: '#666',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
