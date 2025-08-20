// components/CustomDrawerContent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation, state } = props;
  
  const navigateToApp = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.drawerContent}>
        <Text style={styles.title}>Apps</Text>
        
        <DrawerItem
          label="Photo Gallery"
          onPress={() => navigateToApp('PhotoGallery')}
          labelStyle={[
            styles.drawerItemLabel,
            state.routeNames[state.index] === 'PhotoGallery' && styles.activeLabel
          ]}
          style={[
            styles.drawerItem,
            state.routeNames[state.index] === 'PhotoGallery' && styles.activeItem
          ]}
        />
        
        <DrawerItem
          label="Weather App"
          onPress={() => navigateToApp('Weather')}
          labelStyle={[
            styles.drawerItemLabel,
            state.routeNames[state.index] === 'Weather' && styles.activeLabel
          ]}
          style={[
            styles.drawerItem,
            state.routeNames[state.index] === 'Weather' && styles.activeItem
          ]}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingTop: 50,
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  drawerItem: {
    marginVertical: 5,
    borderRadius: 8,
  },
  activeItem: {
    backgroundColor: '#007AFF',
  },
  drawerItemLabel: {
    fontSize: 18,
    color: '#333',
    marginLeft: 0,
  },
  activeLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
