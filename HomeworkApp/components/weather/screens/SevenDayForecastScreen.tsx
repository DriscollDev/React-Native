// components/weather/screens/SevenDayForecastScreen.tsx
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ForecastComponent } from '../components/ForecastComponent';
import { ForecastTabParamList } from '../../../types/weather';

type SevenDayForecastScreenRouteProp = RouteProp<ForecastTabParamList, 'SevenDay'>;

interface SevenDayForecastScreenProps {
  route: SevenDayForecastScreenRouteProp;
}

export const SevenDayForecastScreen: React.FC<SevenDayForecastScreenProps> = ({ route }) => {
  const { days = 7 } = route.params || {};
  
  return <ForecastComponent days={days} />;
};
