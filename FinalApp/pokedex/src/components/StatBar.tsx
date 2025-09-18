import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { formatStatName } from '../utils';
import { colors } from '../styles';

interface StatBarProps {
  statName: string;
  statValue: number;
  maxValue?: number;
}

const StatBar: React.FC<StatBarProps> = ({ statName, statValue, maxValue = 255 }) => {
  const progress = useSharedValue(0);
  
  React.useEffect(() => {
    progress.value = withTiming(statValue / maxValue, { duration: 1000 });
  }, [statValue, maxValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const getStatColor = (value: number) => {
    if (value >= 100) return colors.green;
    if (value >= 70) return '#FFA500'; // Orange
    if (value >= 50) return '#FFD700'; // Gold
    return colors.red;
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.statName}>{formatStatName(statName)}</Text>
        <Text style={styles.statValue}>{statValue}</Text>
      </View>
      <View style={styles.barContainer}>
        <Animated.View 
          style={[
            styles.bar, 
            { backgroundColor: getStatColor(statValue) },
            animatedStyle
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statName: {
    fontSize: 14,
    color: colors.darkGray,
    fontWeight: '500',
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'right',
  },
  barContainer: {
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
});

export default StatBar;
