// components/weather/screens/CurrentWeatherScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Image, 
  ScrollView,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentWeather } from '../../../hooks/useWeather';

export const CurrentWeatherScreen: React.FC = () => {
  const { data: weather, loading, error } = useCurrentWeather();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.errorSubtext}>
            Please check your API key in the .env file
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!weather) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>No weather data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.location}>
            {weather.location.name}, {weather.location.region}
          </Text>
          <Text style={styles.lastUpdated}>
            Last updated: {new Date(weather.current.lastUpdated).toLocaleTimeString()}
          </Text>
        </View>

        <View style={styles.weatherMain}>
          <Image
            source={{ uri: `https:${weather.current.condition.icon}` }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <Text style={styles.temperature}>
            {weather.current.tempF}°F
          </Text>
          <Text style={styles.temperatureCelsius}>
            ({weather.current.tempC}°C)
          </Text>
          <Text style={styles.condition}>
            {weather.current.condition.text}
          </Text>
          <Text style={styles.feelsLike}>
            Feels like {weather.current.feelsLikeF}°F ({weather.current.feelsLikeC}°C)
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weather.current.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wind Speed</Text>
              <Text style={styles.detailValue}>
                {weather.current.windMph} mph
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  location: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  weatherMain: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  temperatureCelsius: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  condition: {
    fontSize: 20,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  feelsLike: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  details: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
