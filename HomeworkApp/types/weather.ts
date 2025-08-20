// types/weather.ts

// Basic condition interface used across different weather data
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

// Simplified location interface
export interface WeatherLocation {
  name: string;
  region: string;
}

// Simplified current weather data (mapped from API response)
export interface CurrentWeatherData {
  location: WeatherLocation;
  current: {
    tempF: number;
    tempC: number;
    condition: WeatherCondition;
    humidity: number;
    windMph: number;
    feelsLikeF: number;
    feelsLikeC: number;
    lastUpdated: string;
  };
}

// Mapped forecast day data
export interface MappedForecastDay {
  date: string; // day of week (e.g., "Today", "Tomorrow", "Monday")
  day: {
    condition: WeatherCondition;
    maxTempF: number;
    minTempF: number;
  };
}

// Mapped forecast weather data
export interface ForecastWeatherData {
  forecast: {
    forecastDay: MappedForecastDay[];
  };
  location: WeatherLocation;
}

// Navigation types
export type WeatherNavigatorParamList = {
  CurrentWeather: undefined;
  Forecast: undefined;
};

export type ForecastTabParamList = {
  ThreeDay: { days: number };
  SevenDay: { days: number };
};
