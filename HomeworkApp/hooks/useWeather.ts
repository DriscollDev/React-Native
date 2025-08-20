// hooks/useWeather.ts
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useCallback, useState } from 'react';
import Constants from 'expo-constants';
import { CurrentWeatherData, ForecastWeatherData } from '../types/weather';
import { getDayOfWeek } from '../utils/dateUtils';
import axios, { AxiosResponse } from 'axios';

// Use environment variable if available, otherwise fallback to a placeholder
const API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY || 'your_weather_api_key_here';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Mapping function for current weather data
const mapResponseToCurrentWeatherData = (
  response: AxiosResponse<any>
): CurrentWeatherData => {
  const { location, current } = response.data;
  return {
    location: {
      name: location.name,
      region: location.region,
    },
    current: {
      tempF: Math.round(current.temp_f),
      tempC: Math.round(current.temp_c),
      condition: current.condition,
      humidity: current.humidity,
      windMph: Math.round(current.wind_mph),
      feelsLikeF: Math.round(current.feelslike_f),
      feelsLikeC: Math.round(current.feelslike_c),
      lastUpdated: current.last_updated,
    },
  };
};

// Mapping function for forecast weather data
const mapResponseToForecastWeatherData = (
  response: AxiosResponse<any>
): ForecastWeatherData => {
  const { forecast, location } = response.data;
  return {
    forecast: {
      forecastDay: forecast.forecastday.map((forecastDay: any) => {
        return {
          date: getDayOfWeek(forecastDay.date),
          day: {
            condition: forecastDay.day.condition,
            maxTempF: Math.round(forecastDay.day.maxtemp_f),
            minTempF: Math.round(forecastDay.day.mintemp_f),
          },
        };
      }),
    },
    location: {
      name: location.name,
      region: location.region,
    },
  };
};

// Hook for current weather with state management
export const useCurrentWeather = () => {
  const [data, setData] = useState<CurrentWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${BASE_URL}/current.json?q=02893&key=${API_KEY}`
      );
      
      const mappedData = mapResponseToCurrentWeatherData(response);
      setData(mappedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentWeather();
  }, [fetchCurrentWeather]);

  return { data, loading, error, refetch: fetchCurrentWeather };
};

// Hook for forecast weather with state management
export const useForecastWeather = (location: string, days: number) => {
  const [data, setData] = useState<ForecastWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${BASE_URL}/forecast.json?q=${location}&days=${days}&key=${API_KEY}`
      );
      
      const mappedData = mapResponseToForecastWeatherData(response);
      setData(mappedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [location, days]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  return { data, loading, error, refetch: fetchForecast };
};
