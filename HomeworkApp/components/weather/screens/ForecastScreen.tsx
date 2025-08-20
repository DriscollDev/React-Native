// components/weather/screens/ForecastScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ForecastComponent } from '../components/ForecastComponent';

export const ForecastScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'3day' | '7day'>('3day');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === '3day' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('3day')}
        >
          <Text style={[
            styles.tabText,
            activeTab === '3day' && styles.activeTabText
          ]}>
            3-Day
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === '7day' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('7day')}
        >
          <Text style={[
            styles.tabText,
            activeTab === '7day' && styles.activeTabText
          ]}>
            7-Day
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <ForecastComponent days={activeTab === '3day' ? 3 : 7} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
});
