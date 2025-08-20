// components/weather/screens/ThreeDayForecastScreen.tsx
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ForecastComponent } from '../components/ForecastComponent';
import { ForecastTabParamList } from '../../../types/weather';

type ThreeDayForecastScreenRouteProp = RouteProp<ForecastTabParamList, 'ThreeDay'>;

interface ThreeDayForecastScreenProps {
  route: ThreeDayForecastScreenRouteProp;
}

export const ThreeDayForecastScreen: React.FC<ThreeDayForecastScreenProps> = ({ route }) => {
  const { days = 3 } = route.params || {};
  
  return <ForecastComponent days={days} />;
};
