// components/weather/components/ForecastComponent.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForecastWeather } from '../../../hooks/useWeather';
import { MappedForecastDay } from '../../../types/weather';

interface ForecastComponentProps {
  days: number;
}

interface ForecastItemProps {
  item: MappedForecastDay;
  index: number;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ item, index }) => {
  return (
    <View style={styles.forecastItem}>
      <View style={styles.dateSection}>
        <Text style={styles.dayName}>{item.date}</Text>
      </View>
      
      <Image
        source={{ uri: `https:${item.day.condition.icon}` }}
        style={styles.forecastIcon}
        resizeMode="contain"
      />
      
      <View style={styles.conditionSection}>
        <Text style={styles.conditionText} numberOfLines={2}>
          {item.day.condition.text}
        </Text>
      </View>
      
      <View style={styles.tempSection}>
        <Text style={styles.highTemp}>
          {item.day.maxTempF}°F
        </Text>
        <Text style={styles.lowTemp}>
          {item.day.minTempF}°F
        </Text>
      </View>
    </View>
  );
};

export const ForecastComponent: React.FC<ForecastComponentProps> = ({ days }) => {
  const { data: forecast, loading, error } = useForecastWeather('02893', days);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading {days}-day forecast...</Text>
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

  if (!forecast || !forecast.forecast.forecastDay.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>No forecast data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {days}-Day Forecast for {forecast.location.name}
        </Text>
        <Text style={styles.subtitle}>
          {forecast.location.region}
        </Text>
      </View>
      
      <FlatList
        data={forecast.forecast.forecastDay}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        renderItem={({ item, index }) => (
          <ForecastItem item={item} index={index} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  forecastItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateSection: {
    marginBottom: 12,
    alignItems: 'center',
  },
  dayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  conditionSection: {
    marginBottom: 12,
  },
  conditionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  tempSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  highTemp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  lowTemp: {
    fontSize: 20,
    color: '#666',
  },
});
