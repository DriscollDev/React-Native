import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTypeColor, formatPokemonName } from '../utils';
import { colors } from '../styles';

interface TypeBadgeProps {
  typeName: string;
  size?: 'small' | 'medium' | 'large';
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ typeName, size = 'medium' }) => {
  const typeColor = getTypeColor(typeName);
  
  const sizeStyles = {
    small: { paddingHorizontal: 8, paddingVertical: 4, fontSize: 12 },
    medium: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 14 },
    large: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 16 },
  };
  
  return (
    <View style={[styles.badge, { backgroundColor: typeColor }, sizeStyles[size]]}>
      <Text style={[styles.text, { fontSize: sizeStyles[size].fontSize }]}>
        {formatPokemonName(typeName)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default TypeBadge;
