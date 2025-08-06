// components/Search.tsx
import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';


type SearchProps = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
};

const Search: React.FC<SearchProps> = ({ searchQuery, onSearchChange, placeholder = "Search" }) => {
  return (
    <View style={globalStyles.searchContainer}>
      <Ionicons name="search" size={20} style={globalStyles.searchIcon} />
      <TextInput
        style={globalStyles.searchInput}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

export default Search;
