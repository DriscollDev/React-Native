import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { PokedexListScreen, PokemonDetailScreen, FavoritesScreen } from '../screens';

import { MainTabParamList, PokedexStackParamList, FavoritesStackParamList } from '../types';
import { colors } from '../styles';

const Tab = createBottomTabNavigator<MainTabParamList>();
const PokedexStack = createStackNavigator<PokedexStackParamList>();
const FavoritesStack = createStackNavigator<FavoritesStackParamList>();

// Stack Navigator for Pokedex section
function PokedexStackNavigator() {
  return (
    <PokedexStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <PokedexStack.Screen 
        name="PokedexList" 
        component={PokedexListScreen}
        options={{
          title: 'Pokédex',
        }}
      />
      <PokedexStack.Screen 
        name="PokemonDetail" 
        component={PokemonDetailScreen}
        options={({ route }) => ({
          title: route.params.pokemon.name.charAt(0).toUpperCase() + route.params.pokemon.name.slice(1),
        })}
      />
    </PokedexStack.Navigator>
  );
}

// Stack Navigator for Favorites section
function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <FavoritesStack.Screen 
        name="PokedexList" 
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
        }}
      />
      <FavoritesStack.Screen 
        name="PokemonDetail" 
        component={PokemonDetailScreen}
        options={({ route }) => ({
          title: route.params.pokemon.name.charAt(0).toUpperCase() + route.params.pokemon.name.slice(1),
        })}
      />
    </FavoritesStack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Pokedex') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else {
            iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Pokedex" 
        component={PokedexStackNavigator}
        options={{
          title: 'Pokédex',
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesStackNavigator}
        options={{
          title: 'Favorites',
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigation Container
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
