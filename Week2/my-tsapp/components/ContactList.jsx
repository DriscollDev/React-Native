// components/ContactList.js
import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import ContactCard from './ContactCard';
import Search from './Search';
import { globalStyles } from '../styles/globalStyles';

const ContactList = ({ contacts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={globalStyles.container}>
      <Search 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search contacts"
      />
      <FlatList
        style={globalStyles.list}
        data={filteredContacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactCard name={item.name} image={item.image} />
        )}
      />
    </View>
  );
};

export default ContactList;