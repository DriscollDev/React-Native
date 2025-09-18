import { TypeColors } from '../types';

export const typeColors: TypeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const getTypeColor = (typeName: string): string => {
  return typeColors[typeName.toLowerCase()] || '#68A090';
};

export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const convertHeight = (height: number): string => {
  // Height in PokeAPI is in decimeters, convert to meters
  const meters = height / 10;
  return `${meters.toFixed(1)}m`;
};

export const convertWeight = (weight: number): string => {
  // Weight in PokeAPI is in hectograms, convert to kilograms
  const kg = weight / 10;
  return `${kg.toFixed(1)}kg`;
};

export const formatStatName = (statName: string): string => {
  const statNames: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    'speed': 'Speed',
  };
  return statNames[statName] || statName;
};
