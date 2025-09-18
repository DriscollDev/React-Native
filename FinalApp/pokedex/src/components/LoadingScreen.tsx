import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { colors, globalStyles } from '../styles';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <View style={globalStyles.loadingContainer}>
      <Animated.View 
        entering={FadeInUp.duration(600)} 
        style={styles.content}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Animated.Text 
          entering={FadeIn.delay(300).duration(600)} 
          style={styles.text}
        >
          {message}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
});

export default LoadingScreen;
